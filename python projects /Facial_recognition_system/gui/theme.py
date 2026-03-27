"""Centralized theme system — colors, fonts, spacing, and styling constants."""


class Colors:
    """Dark theme color palette with vibrant accents."""
    # Backgrounds
    BG_PRIMARY = "#0f0f1a"       # Deep dark background
    BG_SECONDARY = "#1a1a2e"     # Card / panel backgrounds
    BG_TERTIARY = "#16213e"      # Sidebar / elevated surfaces
    BG_INPUT = "#252540"         # Input field background
    BG_HOVER = "#2a2a4a"        # Hover state

    # Accents
    ACCENT = "#6c63ff"           # Primary purple accent
    ACCENT_HOVER = "#7c74ff"     # Lighter accent on hover
    ACCENT_LIGHT = "#8b83ff"     # Even lighter for active states

    # Semantic colors
    SUCCESS = "#00d4aa"          # Green — recognized, success
    WARNING = "#ffa726"          # Amber — low confidence, caution
    DANGER = "#ef5350"           # Red — error, delete
    INFO = "#42a5f5"             # Blue — informational

    # Text
    TEXT_PRIMARY = "#ffffff"
    TEXT_SECONDARY = "#b0b0c8"
    TEXT_MUTED = "#6c6c88"
    TEXT_ON_ACCENT = "#ffffff"

    # Borders
    BORDER = "#2a2a4a"
    BORDER_LIGHT = "#3a3a5a"

    # Face detection overlay colors
    FACE_KNOWN = (0, 212, 170)    # BGR green
    FACE_UNKNOWN = (38, 167, 255) # BGR amber
    FACE_ERROR = (80, 83, 239)    # BGR red

    # Status indicators
    STATUS_ONLINE = "#00d4aa"
    STATUS_OFFLINE = "#ef5350"
    STATUS_PROCESSING = "#ffa726"


class Fonts:
    """Font configuration — uses system fonts with fallbacks."""
    # Font families (CustomTkinter format)
    FAMILY = "Segoe UI"
    FAMILY_MONO = "Cascadia Code"

    # Sizes
    HEADING_XL = (FAMILY, 28, "bold")
    HEADING_LG = (FAMILY, 22, "bold")
    HEADING = (FAMILY, 18, "bold")
    SUBHEADING = (FAMILY, 15, "bold")
    BODY = (FAMILY, 13)
    BODY_BOLD = (FAMILY, 13, "bold")
    CAPTION = (FAMILY, 11)
    CAPTION_BOLD = (FAMILY, 11, "bold")
    SMALL = (FAMILY, 10)
    MONO = (FAMILY_MONO, 12)
    EMOJI = (FAMILY, 20)


class Spacing:
    """Consistent spacing tokens."""
    XS = 4
    SM = 8
    MD = 12
    LG = 16
    XL = 24
    XXL = 32

    # Specific spacing
    SIDEBAR_WIDTH = 220
    PANEL_PADDING = 24
    CARD_PADDING = 16
    CARD_RADIUS = 12
    BUTTON_PADDING_X = 20
    BUTTON_PADDING_Y = 10
    INPUT_PADDING = 12


class Sizes:
    """Component size constants."""
    SIDEBAR_ICON = 20
    FACE_CARD_WIDTH = 280
    FACE_CARD_HEIGHT = 100
    THUMBNAIL_SIZE = 64
    GALLERY_CARD_SIZE = 200
    STATUS_DOT = 8
    CONFIDENCE_BAR_HEIGHT = 6
    CAMERA_OVERLAY_OPACITY = 0.7


# Emotion color mapping for visualization
EMOTION_COLORS = {
    "Happy": Colors.SUCCESS,
    "Sad": Colors.INFO,
    "Angry": Colors.DANGER,
    "Fear": Colors.WARNING,
    "Surprise": "#ce93d8",
    "Disgust": "#a1887f",
    "Neutral": Colors.TEXT_SECONDARY,
}
