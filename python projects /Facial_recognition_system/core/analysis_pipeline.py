"""Unified analysis pipeline that orchestrates all face analysis components."""

import time
import threading
from dataclasses import dataclass, field
from typing import Optional
from core.face_detector import FaceDetector, FaceRegion
from core.face_recognizer import FaceRecognizer, RecognitionResult
from core.emotion_analyzer import EmotionAnalyzer, EmotionResult
from core.age_gender_estimator import AgeGenderEstimator, AgeGenderResult
from utils.config import ANALYSIS_INTERVAL, MAX_FACES
from utils.logger import log


@dataclass
class FaceResult:
    """Complete analysis result for a single detected face."""
    face_region: FaceRegion
    recognition: Optional[RecognitionResult] = None
    emotion: Optional[EmotionResult] = None
    age_gender: Optional[AgeGenderResult] = None
    timestamp: float = field(default_factory=time.time)

    @property
    def display_name(self):
        if self.recognition and self.recognition.is_known:
            return self.recognition.name
        return "Unknown"

    @property
    def is_known(self):
        return self.recognition is not None and self.recognition.is_known

    @property
    def info_lines(self):
        """Get formatted info lines for overlay display."""
        lines = [self.display_name]

        if self.recognition:
            conf_pct = int(self.recognition.confidence * 100)
            lines.append(f"Match: {conf_pct}%")

        if self.emotion:
            lines.append(f"{self.emotion.emoji} {self.emotion.dominant_emotion}")

        if self.age_gender:
            lines.append(f"{self.age_gender.gender}, {self.age_gender.age_range}")

        return lines


class AnalysisPipeline:
    """Orchestrates face detection, recognition, emotion, and age/gender analysis.

    Uses frame-skipping to maintain high FPS: full analysis runs every N frames,
    while intermediate frames reuse the last results with tracked bounding boxes.
    """

    def __init__(self, face_store, enable_emotion=True, enable_age_gender=True):
        self.detector = FaceDetector()
        self.recognizer = FaceRecognizer(face_store)
        self.emotion_analyzer = EmotionAnalyzer() if enable_emotion else None
        self.age_gender_estimator = AgeGenderEstimator() if enable_age_gender else None

        self.analysis_interval = ANALYSIS_INTERVAL
        self.max_faces = MAX_FACES

        self._frame_count = 0
        self._last_results = []
        self._fps = 0.0
        self._last_fps_time = time.time()
        self._fps_frame_count = 0
        self._lock = threading.Lock()

        # Load registered faces
        self.recognizer.load_registered_faces()
        log.info("Analysis pipeline initialized")

    def analyze_frame(self, frame):
        """Analyze a video frame for faces and their attributes.

        Args:
            frame: BGR image (numpy array)

        Returns:
            List of FaceResult objects
        """
        self._update_fps()
        self._frame_count += 1

        # Full analysis at interval, or if no previous results
        if self._frame_count % self.analysis_interval == 0 or not self._last_results:
            results = self._full_analysis(frame)
            self._last_results = results
            return results

        # On intermediate frames, just re-detect faces and map to last results
        return self._quick_update(frame)

    def _full_analysis(self, frame):
        """Run complete analysis pipeline on a frame."""
        with self._lock:
            try:
                return self._run_analysis(frame)
            except Exception as e:
                log.error(f"Analysis error: {e}")
                return []

    def _run_analysis(self, frame):
        """Internal analysis — called under lock."""
        # Step 1: Detect faces
        face_regions = self.detector.detect(frame)[:self.max_faces]

        if not face_regions:
            return []

        # Step 2: Recognition (protected — dlib is not thread-safe)
        recognition_results = []
        try:
            face_locations = [fr.to_location() for fr in face_regions]
            recognition_results = self.recognizer.recognize(frame, face_locations)
        except Exception as e:
            log.warning(f"Recognition failed: {e}")
            recognition_results = [RecognitionResult("Unknown", -1, 0.0, False)
                                   for _ in face_regions]

        # Step 3: Build results with emotion and age/gender
        results = []
        for i, face_region in enumerate(face_regions):
            face_roi = face_region.get_padded_roi(frame)

            # Recognition
            rec_result = recognition_results[i] if i < len(recognition_results) else None

            # Emotion
            emo_result = None
            if self.emotion_analyzer and self.emotion_analyzer.is_ready:
                try:
                    emo_result = self.emotion_analyzer.analyze(face_roi)
                except Exception:
                    pass

            # Age/Gender
            ag_result = None
            if self.age_gender_estimator and self.age_gender_estimator.is_ready:
                try:
                    ag_result = self.age_gender_estimator.estimate(face_roi)
                except Exception:
                    pass

            results.append(FaceResult(
                face_region=face_region,
                recognition=rec_result,
                emotion=emo_result,
                age_gender=ag_result,
            ))

        return results

    def _quick_update(self, frame):
        """Quick face detection only, reusing analysis from last full frame."""
        face_regions = self.detector.detect(frame)[:self.max_faces]

        if not face_regions:
            return []

        # Try to match new detections to previous results by proximity
        results = []
        used_prev = set()

        for face_region in face_regions:
            best_match = None
            best_dist = float("inf")

            for j, prev in enumerate(self._last_results):
                if j in used_prev:
                    continue
                # Compare centers
                cx, cy = face_region.center
                px, py = prev.face_region.center
                dist = ((cx - px) ** 2 + (cy - py) ** 2) ** 0.5

                if dist < best_dist and dist < 100:  # Max 100px movement
                    best_dist = dist
                    best_match = j

            if best_match is not None:
                used_prev.add(best_match)
                prev = self._last_results[best_match]
                results.append(FaceResult(
                    face_region=face_region,
                    recognition=prev.recognition,
                    emotion=prev.emotion,
                    age_gender=prev.age_gender,
                ))
            else:
                results.append(FaceResult(face_region=face_region))

        return results

    def _update_fps(self):
        """Calculate rolling FPS."""
        self._fps_frame_count += 1
        now = time.time()
        elapsed = now - self._last_fps_time
        if elapsed >= 1.0:
            self._fps = self._fps_frame_count / elapsed
            self._fps_frame_count = 0
            self._last_fps_time = now

    @property
    def fps(self):
        return self._fps

    def reload_faces(self):
        """Reload registered faces from database."""
        self.recognizer.reload()

    def set_detection_confidence(self, threshold):
        self.detector.set_confidence(threshold)

    def set_recognition_tolerance(self, tolerance):
        self.recognizer.set_tolerance(tolerance)

    def set_analysis_interval(self, interval):
        self.analysis_interval = max(1, min(10, interval))

    def toggle_emotion(self, enabled):
        if enabled and self.emotion_analyzer is None:
            self.emotion_analyzer = EmotionAnalyzer()
        elif not enabled:
            self.emotion_analyzer = None

    def toggle_age_gender(self, enabled):
        if enabled and self.age_gender_estimator is None:
            self.age_gender_estimator = AgeGenderEstimator()
        elif not enabled:
            self.age_gender_estimator = None

    @property
    def status(self):
        """Get pipeline component status."""
        return {
            "detector": self.detector.is_ready,
            "recognizer": self.recognizer.is_available,
            "emotion": self.emotion_analyzer.is_ready if self.emotion_analyzer else False,
            "age_gender": self.age_gender_estimator.is_ready if self.age_gender_estimator else False,
            "registered_faces": self.recognizer.registered_count,
        }
