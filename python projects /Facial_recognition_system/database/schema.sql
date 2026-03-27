-- FaceVision Pro Database Schema

CREATE TABLE IF NOT EXISTS persons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    notes TEXT DEFAULT '',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS face_encodings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    person_id INTEGER NOT NULL,
    encoding BLOB NOT NULL,
    image_path TEXT,
    captured_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (person_id) REFERENCES persons(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS recognition_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    person_id INTEGER,
    confidence REAL,
    emotion TEXT,
    age_range TEXT,
    gender TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (person_id) REFERENCES persons(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_face_encodings_person ON face_encodings(person_id);
CREATE INDEX IF NOT EXISTS idx_recognition_logs_person ON recognition_logs(person_id);
CREATE INDEX IF NOT EXISTS idx_recognition_logs_timestamp ON recognition_logs(timestamp);
