import React, { useState, useEffect, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import NorthIcon from "@mui/icons-material/North";
import ContrastIcon from "@mui/icons-material/Contrast";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RefreshIcon from "@mui/icons-material/Refresh";
/**
 * Accessibility Component with Escape Hatch Design
 *
 * Provides comprehensive accessibility controls with multiple escape mechanisms:
 * - Escape key to close panels/menus
 * - Click outside to close panel
 * - Close button on panel
 * - Reset settings button
 * - Focus management and trapping prevention
 */
const Accessibility = ({
  videoPaused,
  onVideoToggle,
  carouselPaused,
  onCarouselToggle,
}) => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(1); // multiplier for font size
  const isMobile = useMediaQuery("(max-width:600px)");
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.setProperty("--font-size-multiplier", fontSize);
    document.body.classList.toggle("high-contrast", highContrast);
  }, [fontSize, highContrast]);

  // Escape hatch: Handle Escape key to close panels/menus
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        if (panelOpen) {
          setPanelOpen(false);
          buttonRef.current?.focus(); // Return focus to trigger button
        }
        if (menuAnchorEl) {
          setMenuAnchorEl(null);
          buttonRef.current?.focus(); // Return focus to trigger button
        }
      }
    };

    const handleClickOutside = (event) => {
      if (
        panelOpen &&
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setPanelOpen(false);
      }
    };

    if (panelOpen || menuAnchorEl) {
      document.addEventListener("keydown", handleEscapeKey);
      if (panelOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("keydown", handleEscapeKey);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [panelOpen, menuAnchorEl]);

  // Focus management for panel opening
  useEffect(() => {
    if (panelOpen && panelRef.current) {
      // Focus the first focusable element in the panel
      const firstFocusable = panelRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  }, [panelOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 0.1, 1.5));
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 0.1, 0.8));
  };

  const toggleHighContrast = () => {
    setHighContrast((prev) => !prev);
  };

  const resetAccessibilitySettings = () => {
    setHighContrast(false);
    setFontSize(1);
    setPanelOpen(false);
    setMenuAnchorEl(null);
    // Reset any other accessibility settings here
  };

  const handleAccessibilityClick = (event) => {
    if (isMobile) {
      setMenuAnchorEl(event.currentTarget);
    } else {
      setPanelOpen((prev) => !prev);
    }
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleMenuAction = (action) => {
    action();
    handleMenuClose();
  };

  return (
    <div className="accessibility-widget">
      <button
        ref={buttonRef}
        className="accessibility-button"
        onClick={handleAccessibilityClick}
        aria-label="Accessibility options"
        aria-expanded={panelOpen || Boolean(menuAnchorEl)}
        title="Accessibility Controls"
      >
        <AccessibilityIcon />
      </button>

      {isMobile ? (
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            style: { width: "240px" },
          }}
          MenuListProps={{
            "aria-label": "Accessibility controls",
          }}
        >
          <MenuItem
            onClick={() => handleMenuAction(onVideoToggle)}
            aria-label={videoPaused ? "Play video" : "Pause video"}
          >
            {videoPaused ? <PlayArrowIcon fontSize="small" /> : <PauseIcon fontSize="small" />}
            <span style={{ marginLeft: 8 }}>
              {videoPaused ? "Play Video" : "Pause Video"}
            </span>
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuAction(onCarouselToggle)}
            aria-label={carouselPaused ? "Play carousels" : "Pause carousels"}
          >
            {carouselPaused ? <PlayArrowIcon fontSize="small" /> : <PauseIcon fontSize="small" />}
            <span style={{ marginLeft: 8 }}>
              {carouselPaused ? "Play Carousels" : "Pause Carousels"}
            </span>
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuAction(toggleHighContrast)}
            aria-label={highContrast ? "Disable high contrast" : "Enable high contrast"}
          >
            <ContrastIcon fontSize="small" />
            <span style={{ marginLeft: 8 }}>
              {highContrast ? "Disable High Contrast" : "Enable High Contrast"}
            </span>
          </MenuItem>
          <MenuItem onClick={() => handleMenuAction(decreaseFontSize)} aria-label="Decrease font size">
            <ZoomOutIcon fontSize="small" />
            <span style={{ marginLeft: 8 }}>Decrease Font</span>
          </MenuItem>
          <MenuItem onClick={() => handleMenuAction(increaseFontSize)} aria-label="Increase font size">
            <ZoomInIcon fontSize="small" />
            <span style={{ marginLeft: 8 }}>Increase Font</span>
          </MenuItem>
          <MenuItem onClick={() => handleMenuAction(scrollToTop)} aria-label="Scroll to top">
            <NorthIcon fontSize="small" />
            <span style={{ marginLeft: 8 }}>Back to Top</span>
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuAction(resetAccessibilitySettings)}
            aria-label="Reset all accessibility settings"
          >
            <RefreshIcon fontSize="small" />
            <span style={{ marginLeft: 8 }}>Reset Settings</span>
          </MenuItem>
        </Menu>
      ) : (
        panelOpen && (
          <div
            ref={panelRef}
            className="accessibility-panel"
            role="region"
            aria-label="Accessibility controls"
          >
            <div className="panel-header">
              <h3>Accessibility Controls</h3>
              <button
                className="close-button"
                onClick={() => setPanelOpen(false)}
                aria-label="Close accessibility panel"
                title="Close (Escape)"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="control-group">
              <button
                className="control-button"
                onClick={onVideoToggle}
                aria-label={videoPaused ? "Play video" : "Pause video"}
                title={videoPaused ? "Play video" : "Pause video"}
              >
                {videoPaused ? <PlayArrowIcon /> : <PauseIcon />}
                <span>{videoPaused ? "Play Video" : "Pause Video"}</span>
              </button>
            </div>

            <div className="control-group">
              <button
                className="control-button"
                onClick={onCarouselToggle}
                aria-label={carouselPaused ? "Play carousels" : "Pause carousels"}
                title={carouselPaused ? "Play carousels" : "Pause carousels"}
              >
                {carouselPaused ? <PlayArrowIcon /> : <PauseIcon />}
                <span>{carouselPaused ? "Play Carousels" : "Pause Carousels"}</span>
              </button>
            </div>

            <div className="control-group">
              <button
                className="control-button"
                onClick={toggleHighContrast}
                aria-label={highContrast ? "Disable high contrast" : "Enable high contrast"}
                title={highContrast ? "Disable high contrast" : "Enable high contrast"}
              >
                <ContrastIcon />
                <span>{highContrast ? "Disable High Contrast" : "Enable High Contrast"}</span>
              </button>
            </div>

            <div className="control-group">
              <div className="font-size-controls">
                <button
                  className="control-button font-btn"
                  onClick={decreaseFontSize}
                  aria-label="Decrease font size"
                  title="Decrease font size"
                  disabled={fontSize <= 0.8}
                >
                  <ZoomOutIcon />
                  <span>A-</span>
                </button>
                <button
                  className="control-button font-btn"
                  onClick={increaseFontSize}
                  aria-label="Increase font size"
                  title="Increase font size"
                  disabled={fontSize >= 1.5}
                >
                  <ZoomInIcon />
                  <span>A+</span>
                </button>
              </div>
            </div>

            <div className="control-group">
              <button
                className="control-button"
                onClick={scrollToTop}
                aria-label="Scroll to top"
                title="Scroll to top"
              >
                <NorthIcon />
                <span>Back to Top</span>
              </button>
            </div>

            <div className="control-group">
              <button
                className="control-button"
                onClick={resetAccessibilitySettings}
                aria-label="Reset all accessibility settings"
                title="Reset all accessibility settings to defaults"
              >
                <RefreshIcon />
                <span>Reset Settings</span>
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Accessibility;
