"""SQLite database manager with thread-safe connections."""

import sqlite3
import os
import threading
from utils.config import DB_PATH, DATA_DIR
from utils.logger import log


class DatabaseManager:
    """Thread-safe SQLite database manager for face data."""

    def __init__(self, db_path=None):
        self.db_path = db_path or DB_PATH
        self._local = threading.local()
        self._init_db()

    @property
    def _conn(self):
        """Get thread-local database connection."""
        if not hasattr(self._local, "conn") or self._local.conn is None:
            self._local.conn = sqlite3.connect(self.db_path)
            self._local.conn.row_factory = sqlite3.Row
            self._local.conn.execute("PRAGMA foreign_keys = ON")
            self._local.conn.execute("PRAGMA journal_mode = WAL")
        return self._local.conn

    def _init_db(self):
        """Initialize database with schema."""
        schema_path = os.path.join(os.path.dirname(__file__), "schema.sql")
        with open(schema_path, "r") as f:
            schema = f.read()
        self._conn.executescript(schema)
        self._conn.commit()
        log.info(f"Database initialized at {self.db_path}")

    # ── Person CRUD ──────────────────────────────────────────

    def add_person(self, name, notes=""):
        """Add a new person and return their ID."""
        cursor = self._conn.execute(
            "INSERT INTO persons (name, notes) VALUES (?, ?)",
            (name, notes)
        )
        self._conn.commit()
        person_id = cursor.lastrowid
        log.info(f"Added person: {name} (ID: {person_id})")
        return person_id

    def get_person(self, person_id):
        """Get a person by ID."""
        row = self._conn.execute(
            "SELECT * FROM persons WHERE id = ?", (person_id,)
        ).fetchone()
        return dict(row) if row else None

    def get_all_persons(self):
        """Get all registered persons."""
        rows = self._conn.execute(
            "SELECT * FROM persons ORDER BY name"
        ).fetchall()
        return [dict(r) for r in rows]

    def update_person(self, person_id, name=None, notes=None):
        """Update person details."""
        updates = []
        values = []
        if name is not None:
            updates.append("name = ?")
            values.append(name)
        if notes is not None:
            updates.append("notes = ?")
            values.append(notes)
        if not updates:
            return False

        updates.append("updated_at = CURRENT_TIMESTAMP")
        values.append(person_id)

        self._conn.execute(
            f"UPDATE persons SET {', '.join(updates)} WHERE id = ?",
            values
        )
        self._conn.commit()
        return True

    def delete_person(self, person_id):
        """Delete a person and all their data."""
        self._conn.execute("DELETE FROM persons WHERE id = ?", (person_id,))
        self._conn.commit()
        log.info(f"Deleted person ID: {person_id}")

    def search_persons(self, query):
        """Search persons by name."""
        rows = self._conn.execute(
            "SELECT * FROM persons WHERE name LIKE ? ORDER BY name",
            (f"%{query}%",)
        ).fetchall()
        return [dict(r) for r in rows]

    # ── Face Encoding Operations ─────────────────────────────

    def add_encoding(self, person_id, encoding_bytes, image_path=None):
        """Store a face encoding for a person."""
        self._conn.execute(
            "INSERT INTO face_encodings (person_id, encoding, image_path) VALUES (?, ?, ?)",
            (person_id, encoding_bytes, image_path)
        )
        self._conn.commit()

    def get_encodings_for_person(self, person_id):
        """Get all face encodings for a person."""
        rows = self._conn.execute(
            "SELECT * FROM face_encodings WHERE person_id = ?", (person_id,)
        ).fetchall()
        return [dict(r) for r in rows]

    def get_all_encodings(self):
        """Get all face encodings with person names."""
        rows = self._conn.execute(
            """SELECT fe.id, fe.person_id, fe.encoding, fe.image_path,
                      p.name as person_name
               FROM face_encodings fe
               JOIN persons p ON fe.person_id = p.id"""
        ).fetchall()
        return [dict(r) for r in rows]

    def delete_encoding(self, encoding_id):
        """Delete a specific face encoding."""
        self._conn.execute(
            "DELETE FROM face_encodings WHERE id = ?", (encoding_id,)
        )
        self._conn.commit()

    # ── Recognition Logging ──────────────────────────────────

    def log_recognition(self, person_id, confidence, emotion=None,
                        age_range=None, gender=None):
        """Log a recognition event."""
        self._conn.execute(
            """INSERT INTO recognition_logs
               (person_id, confidence, emotion, age_range, gender)
               VALUES (?, ?, ?, ?, ?)""",
            (person_id, confidence, emotion, age_range, gender)
        )
        self._conn.commit()

    def get_recognition_count(self, person_id):
        """Get total recognition count for a person."""
        row = self._conn.execute(
            "SELECT COUNT(*) as count FROM recognition_logs WHERE person_id = ?",
            (person_id,)
        ).fetchone()
        return row["count"] if row else 0

    def get_recent_logs(self, limit=50):
        """Get recent recognition logs."""
        rows = self._conn.execute(
            """SELECT rl.*, p.name as person_name
               FROM recognition_logs rl
               LEFT JOIN persons p ON rl.person_id = p.id
               ORDER BY rl.timestamp DESC LIMIT ?""",
            (limit,)
        ).fetchall()
        return [dict(r) for r in rows]

    def get_person_count(self):
        """Get total number of registered persons."""
        row = self._conn.execute("SELECT COUNT(*) as count FROM persons").fetchone()
        return row["count"] if row else 0

    def get_total_recognitions(self):
        """Get total number of recognition events."""
        row = self._conn.execute(
            "SELECT COUNT(*) as count FROM recognition_logs"
        ).fetchone()
        return row["count"] if row else 0

    def close(self):
        """Close the thread-local connection."""
        if hasattr(self._local, "conn") and self._local.conn:
            self._local.conn.close()
            self._local.conn = None
