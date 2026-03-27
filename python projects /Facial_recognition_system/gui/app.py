"""Main application window — orchestrates sidebar, panels, and status bar."""

import sys
import os

# Add project root to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import customtkinter as ctk
from gui.theme import Colors, Fonts, Spacing
from gui.sidebar import Sidebar
from gui.components.status_bar import StatusBar
from gui.components.toast_notification import ToastManager
from gui.dashboard_panel import DashboardPanel
from gui.registration_panel import RegistrationPanel
from gui.gallery_panel import GalleryPanel
from gui.settings_panel import SettingsPanel
from core.analysis_pipeline import AnalysisPipeline
from database.db_manager import DatabaseManager
from database.face_store import FaceStore
from utils.config import APP_TITLE, APP_MIN_WIDTH, APP_MIN_HEIGHT
from utils.logger import log


class FaceVisionApp(ctk.CTk):
    """Main application window for FaceVision Pro."""

    def __init__(self):
        super().__init__()

        # Window configuration
        self.title(APP_TITLE)
        self.geometry(f"{APP_MIN_WIDTH}x{APP_MIN_HEIGHT}")
        self.minsize(APP_MIN_WIDTH, APP_MIN_HEIGHT)

        # Dark theme
        ctk.set_appearance_mode("dark")
        ctk.set_default_color_theme("blue")
        self.configure(fg_color=Colors.BG_PRIMARY)

        # Initialize backend
        self._init_backend()

        # Build UI
        self._build_ui()

        # Keyboard shortcuts
        self.bind("<F11>", lambda e: self._toggle_fullscreen())
        self.bind("<Escape>", lambda e: self.attributes("-fullscreen", False))

        # Handle window close
        self.protocol("WM_DELETE_WINDOW", self._on_close)

        log.info("FaceVision Pro application started")

    def _init_backend(self):
        """Initialize database, face store, and analysis pipeline."""
        self.db_manager = DatabaseManager()
        self.face_store = FaceStore(self.db_manager)
        self.pipeline = AnalysisPipeline(self.face_store)

        status = self.pipeline.status
        log.info(f"Pipeline status: {status}")

    def _build_ui(self):
        """Build the main application UI."""
        # Main container
        main_container = ctk.CTkFrame(self, fg_color=Colors.BG_PRIMARY, corner_radius=0)
        main_container.pack(fill="both", expand=True)

        # Toast manager (overlays on top of everything)
        self.toast = ToastManager(main_container)

        # Sidebar
        self.sidebar = Sidebar(main_container, on_navigate=self._navigate)
        self.sidebar.pack(side="left", fill="y")

        # Right side container
        right_container = ctk.CTkFrame(main_container, fg_color=Colors.BG_PRIMARY,
                                        corner_radius=0)
        right_container.pack(side="left", fill="both", expand=True)

        # Content area (panels go here)
        self.content_frame = ctk.CTkFrame(right_container, fg_color=Colors.BG_PRIMARY,
                                           corner_radius=0)
        self.content_frame.pack(fill="both", expand=True)

        # Status bar (bottom)
        self.status_bar = StatusBar(right_container)
        self.status_bar.pack(fill="x", side="bottom")

        # Create panels
        self._panels = {}
        self._create_panels()

        # Show dashboard by default
        self._navigate("dashboard")

        # Update status bar with DB count
        self.status_bar.update_db_count(self.db_manager.get_person_count())

    def _create_panels(self):
        """Create all navigation panels."""
        self._panels["dashboard"] = DashboardPanel(
            self.content_frame, self.pipeline, self.toast
        )
        self._panels["dashboard"].set_status_callback(self._on_camera_status_change)
        self._panels["dashboard"].set_status_update_callback(self._on_status_update)

        self._panels["register"] = RegistrationPanel(
            self.content_frame, self.face_store, self.pipeline, self.toast
        )

        self._panels["gallery"] = GalleryPanel(
            self.content_frame, self.face_store, self.pipeline, self.toast
        )

        self._panels["settings"] = SettingsPanel(
            self.content_frame, self.pipeline, self.toast
        )

    def _navigate(self, page):
        """Switch to a different panel."""
        # Hide all panels
        for panel in self._panels.values():
            panel.pack_forget()

        # Show selected panel
        if page in self._panels:
            self._panels[page].pack(fill="both", expand=True)

            # Refresh gallery when switching to it
            if page == "gallery":
                self._panels["gallery"].refresh()

            # Update status bar DB count
            self.status_bar.update_db_count(self.db_manager.get_person_count())

        log.info(f"Navigated to: {page}")

    def _on_camera_status_change(self, is_active):
        """Handle camera status changes from dashboard."""
        self.status_bar.update_camera_status(is_active)
        if not is_active:
            self.status_bar.update_fps(0)
            self.status_bar.update_face_count(0)

    def _on_status_update(self, fps, face_count):
        """Handle status updates from dashboard."""
        self.status_bar.update_fps(fps)
        self.status_bar.update_face_count(face_count)

    def _toggle_fullscreen(self):
        """Toggle fullscreen mode."""
        is_full = self.attributes("-fullscreen")
        self.attributes("-fullscreen", not is_full)

    def _on_close(self):
        """Clean up and close the application."""
        log.info("Shutting down FaceVision Pro...")

        # Stop dashboard camera
        if "dashboard" in self._panels:
            self._panels["dashboard"].cleanup()

        # Stop registration camera
        if "register" in self._panels:
            self._panels["register"].cleanup()

        # Close database
        self.db_manager.close()

        self.destroy()


def run():
    """Launch the FaceVision Pro application."""
    app = FaceVisionApp()
    app.mainloop()


if __name__ == "__main__":
    run()
