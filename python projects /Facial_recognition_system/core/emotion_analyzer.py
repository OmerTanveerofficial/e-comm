"""Emotion detection using a lightweight Keras CNN."""

import cv2
import numpy as np
from dataclasses import dataclass
from utils.config import EMOTION_LABELS, EMOTION_EMOJIS, MODEL_FILES
from utils.logger import log


@dataclass
class EmotionResult:
    """Result of emotion analysis."""
    dominant_emotion: str
    confidence: float
    all_emotions: dict
    emoji: str


class EmotionAnalyzer:
    """Detects facial emotions using a CNN trained on FER-2013."""

    def __init__(self):
        self._model = None
        self._initialized = False
        self._init_model()

    def _init_model(self):
        """Load the emotion detection model."""
        try:
            from tensorflow.keras.models import load_model
            model_path = MODEL_FILES.get("emotion_model")
            self._model = load_model(model_path, compile=False)
            self._initialized = True
            log.info("Emotion analyzer initialized")
        except Exception as e:
            log.warning(f"Emotion analyzer not available: {e}")

    def analyze(self, face_roi):
        """Analyze emotion from a face ROI.

        Args:
            face_roi: BGR face image (any size)

        Returns:
            EmotionResult or None if analysis fails
        """
        if not self._initialized or face_roi is None or face_roi.size == 0:
            return None

        try:
            # Preprocess: grayscale, resize to 48x48, normalize
            gray = cv2.cvtColor(face_roi, cv2.COLOR_BGR2GRAY) if len(face_roi.shape) == 3 else face_roi
            resized = cv2.resize(gray, (48, 48))
            normalized = resized.astype("float32") / 255.0
            input_data = np.expand_dims(np.expand_dims(normalized, axis=-1), axis=0)

            # Predict
            predictions = self._model.predict(input_data, verbose=0)[0]

            # Map predictions to labels
            all_emotions = {
                label: float(conf)
                for label, conf in zip(EMOTION_LABELS, predictions)
            }

            dominant_idx = np.argmax(predictions)
            dominant_emotion = EMOTION_LABELS[dominant_idx]
            confidence = float(predictions[dominant_idx])
            emoji = EMOTION_EMOJIS.get(dominant_emotion, "")

            return EmotionResult(
                dominant_emotion=dominant_emotion,
                confidence=confidence,
                all_emotions=all_emotions,
                emoji=emoji
            )

        except Exception as e:
            log.error(f"Emotion analysis failed: {e}")
            return None

    @property
    def is_ready(self):
        return self._initialized
