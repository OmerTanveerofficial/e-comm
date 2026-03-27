"""Age and gender estimation using OpenCV DNN (Caffe models)."""

import cv2
import numpy as np
from dataclasses import dataclass
from utils.config import AGE_BUCKETS, GENDER_LIST, MODEL_FILES
from utils.logger import log


@dataclass
class AgeGenderResult:
    """Result of age and gender estimation."""
    age_range: str
    gender: str
    age_confidence: float
    gender_confidence: float


class AgeGenderEstimator:
    """Estimates age range and gender using pre-trained Caffe models."""

    def __init__(self):
        self._age_net = None
        self._gender_net = None
        self._initialized = False
        self._init_models()

    def _init_models(self):
        """Load age and gender Caffe models."""
        try:
            self._age_net = cv2.dnn.readNet(
                MODEL_FILES["age_model"],
                MODEL_FILES["age_prototxt"]
            )
            self._gender_net = cv2.dnn.readNet(
                MODEL_FILES["gender_model"],
                MODEL_FILES["gender_prototxt"]
            )
            self._initialized = True
            log.info("Age/gender estimator initialized")
        except Exception as e:
            log.warning(f"Age/gender estimator not available: {e}")

    def estimate(self, face_roi):
        """Estimate age and gender from a face ROI.

        Args:
            face_roi: BGR face image (any size)

        Returns:
            AgeGenderResult or None if estimation fails
        """
        if not self._initialized or face_roi is None or face_roi.size == 0:
            return None

        try:
            # Create blob for the models
            blob = cv2.dnn.blobFromImage(
                face_roi, 1.0, (227, 227),
                (78.4263377603, 87.7689143744, 114.895847746),
                swapRB=False
            )

            # Gender prediction
            self._gender_net.setInput(blob)
            gender_preds = self._gender_net.forward()
            gender_idx = gender_preds[0].argmax()
            gender = GENDER_LIST[gender_idx]
            gender_confidence = float(gender_preds[0][gender_idx])

            # Age prediction
            self._age_net.setInput(blob)
            age_preds = self._age_net.forward()
            age_idx = age_preds[0].argmax()
            age_range = AGE_BUCKETS[age_idx]
            age_confidence = float(age_preds[0][age_idx])

            return AgeGenderResult(
                age_range=age_range,
                gender=gender,
                age_confidence=age_confidence,
                gender_confidence=gender_confidence
            )

        except Exception as e:
            log.error(f"Age/gender estimation failed: {e}")
            return None

    @property
    def is_ready(self):
        return self._initialized
