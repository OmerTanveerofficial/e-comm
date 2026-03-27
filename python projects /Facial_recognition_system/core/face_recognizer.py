"""Face recognition using the face_recognition library (dlib ResNet)."""

import numpy as np
from dataclasses import dataclass
from utils.config import RECOGNITION_TOLERANCE, RECOGNITION_MODEL
from utils.logger import log

try:
    import face_recognition
    import face_recognition.api as _fr_api
    FACE_RECOGNITION_AVAILABLE = True

    # Patch for dlib 20.0 compatibility on Apple Silicon:
    # Ensure image is contiguous C-order uint8 and use num_jitters=0 for stability
    def _patched_face_encodings(face_image, known_face_locations=None, num_jitters=0, model="small"):
        # Ensure image is contiguous uint8 (dlib 20 is strict about this)
        if not face_image.flags['C_CONTIGUOUS']:
            face_image = np.ascontiguousarray(face_image)
        face_image = face_image.astype(np.uint8)

        raw_landmarks = _fr_api._raw_face_landmarks(face_image, known_face_locations, model)
        results = []
        for raw_landmark_set in raw_landmarks:
            try:
                desc = _fr_api.face_encoder.compute_face_descriptor(face_image, raw_landmark_set, num_jitters)
                results.append(np.array(desc))
            except TypeError:
                # Fallback: try without num_jitters
                desc = _fr_api.face_encoder.compute_face_descriptor(face_image, raw_landmark_set)
                results.append(np.array(desc))
        return results

    face_recognition.face_encodings = _patched_face_encodings
    _fr_api.face_encodings = _patched_face_encodings

except ImportError:
    FACE_RECOGNITION_AVAILABLE = False
    log.warning("face_recognition not installed — recognition disabled")


@dataclass
class RecognitionResult:
    """Result of a face recognition attempt."""
    name: str
    person_id: int
    confidence: float
    is_known: bool


class FaceRecognizer:
    """Recognizes faces by comparing encodings against registered faces."""

    def __init__(self, face_store, tolerance=None):
        self.face_store = face_store
        self.tolerance = tolerance or RECOGNITION_TOLERANCE
        self.model = RECOGNITION_MODEL
        self._known_encodings = []
        self._known_names = []
        self._known_ids = []

    def load_registered_faces(self):
        """Load all registered faces from the database into memory."""
        encodings, names, ids = self.face_store.load_all_faces()
        self._known_encodings = encodings
        self._known_names = names
        self._known_ids = ids
        log.info(f"Loaded {len(encodings)} encodings for recognition")

    def recognize(self, frame, face_locations):
        """Recognize faces at given locations in the frame.

        Args:
            frame: BGR image (numpy array)
            face_locations: List of (top, right, bottom, left) tuples

        Returns:
            List of RecognitionResult objects
        """
        if not FACE_RECOGNITION_AVAILABLE or not face_locations:
            return [RecognitionResult("Unknown", -1, 0.0, False)
                    for _ in face_locations]

        # Convert BGR to RGB for face_recognition
        rgb_frame = frame[:, :, ::-1]

        # Get encodings for detected faces
        try:
            face_encodings = face_recognition.face_encodings(
                rgb_frame, face_locations, model=self.model
            )
        except Exception as e:
            log.error(f"Encoding error: {e}")
            return [RecognitionResult("Unknown", -1, 0.0, False)
                    for _ in face_locations]

        results = []
        for encoding in face_encodings:
            result = self._match_encoding(encoding)
            results.append(result)

        return results

    def _match_encoding(self, encoding):
        """Match a face encoding against known faces."""
        if not self._known_encodings:
            return RecognitionResult("Unknown", -1, 0.0, False)

        # Calculate distances to all known faces
        distances = face_recognition.face_distance(
            self._known_encodings, encoding
        )

        if len(distances) == 0:
            return RecognitionResult("Unknown", -1, 0.0, False)

        # Find best match
        best_idx = np.argmin(distances)
        best_distance = distances[best_idx]

        # Convert distance to confidence (0-1, higher is better)
        confidence = max(0.0, 1.0 - best_distance)

        if best_distance <= self.tolerance:
            return RecognitionResult(
                name=self._known_names[best_idx],
                person_id=self._known_ids[best_idx],
                confidence=confidence,
                is_known=True
            )

        return RecognitionResult("Unknown", -1, confidence, False)

    def get_encoding(self, frame, face_location=None):
        """Get face encoding(s) from a frame.

        Args:
            frame: BGR image
            face_location: Optional specific (top, right, bottom, left) location

        Returns:
            List of 128-d numpy arrays
        """
        if not FACE_RECOGNITION_AVAILABLE:
            return []

        rgb_frame = frame[:, :, ::-1]
        locations = [face_location] if face_location else None

        try:
            encodings = face_recognition.face_encodings(
                rgb_frame, locations, model=self.model
            )
            return encodings
        except Exception as e:
            log.error(f"Failed to get encoding: {e}")
            return []

    def set_tolerance(self, tolerance):
        """Update recognition tolerance."""
        self.tolerance = max(0.1, min(1.0, tolerance))

    def reload(self):
        """Reload registered faces from database."""
        self.face_store.invalidate_cache()
        self.load_registered_faces()

    @property
    def registered_count(self):
        return len(set(self._known_names))

    @property
    def is_available(self):
        return FACE_RECOGNITION_AVAILABLE
