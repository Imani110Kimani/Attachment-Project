import React, { useState, useEffect, useRef } from "react";
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
 * - Advanced accessibility controls (text spacing, cursor, dyslexia font, tooltips,
 *   line height, text align, desaturate, hide images, highlight links)
 */

const Accessibility = ({ onVideoToggle, videoPaused, onCarouselToggle, carouselPaused }) => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [textSpacing, setTextSpacing] = useState(false);
  const [largeCursor, setLargeCursor] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [tooltipsEnabled, setTooltipsEnabled] = useState(true);
  const [lineHeight, setLineHeight] = useState(1.45);
  const [textAlign, setTextAlign] = useState("left");
  const [desaturate, setDesaturate] = useState(false);
  const [hideImages, setHideImages] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);

  const buttonRef = useRef(null);
  const panelRef = useRef(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  // Escape key and click-outside handling
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        setPanelOpen(false);
        setMenuAnchorEl(null);
      }
    };
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target) &&
          buttonRef.current && !buttonRef.current.contains(e.target)) {
        setPanelOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    if (panelOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [panelOpen, menuAnchorEl]);

  // Focus management for panel opening
  useEffect(() => {
    if (panelOpen && panelRef.current) {
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
    setTextSpacing(false);
    setLargeCursor(false);
    setDyslexiaFont(false);
    setTooltipsEnabled(true);
    setLineHeight(1.45);
    setTextAlign("left");
    setDesaturate(false);
    setHideImages(false);
    setHighlightLinks(false);
    setPanelOpen(false);
    setMenuAnchorEl(null);
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
          PaperProps={{ style: { width: "260px" } }}
          MenuListProps={{ "aria-label": "Accessibility controls" }}
        >
          <MenuItem
            onClick={() => handleMenuAction(onVideoToggle)}
            aria-label={videoPaused ? "Play video" : "Pause video"}
          >
            {videoPaused ? <PlayArrowIcon fontSize="small" /> : <PauseIcon fontSize="small" />}
            <span style={{ marginLeft: 8 }}>{videoPaused ? "Play Video" : "Pause Video"}</span>
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuAction(onCarouselToggle)}
            aria-label={carouselPaused ? "Play carousels" : "Pause carousels"}
          >
            {carouselPaused ? <PlayArrowIcon fontSize="small" /> : <PauseIcon fontSize="small" />}
            <span style={{ marginLeft: 8 }}>{carouselPaused ? "Play Carousels" : "Pause Carousels"}</span>
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuAction(toggleHighContrast)}
            aria-label={highContrast ? "Disable high contrast" : "Enable high contrast"}
          >
            <ContrastIcon fontSize="small" />
            <span style={{ marginLeft: 8 }}>{highContrast ? "Disable High Contrast" : "Enable High Contrast"}</span>
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
                className={`control-button${textSpacing ? " active" : ""}`}
                onClick={() => setTextSpacing((v) => !v)}
                aria-label="Toggle text spacing"
                title="Toggle text spacing"
              >
                <span>Text Spacing</span>
              </button>
            </div>
            <div className="control-group">
              <button
                className={`control-button${largeCursor ? " active" : ""}`}
                onClick={() => setLargeCursor((v) => !v)}
                aria-label="Toggle large cursor"
                title="Toggle large cursor"
              >
                <span>Large Cursor</span>
              </button>
            </div>
            <div className="control-group">
              <button
                className={`control-button${dyslexiaFont ? " active" : ""}`}
                onClick={() => setDyslexiaFont((v) => !v)}
                aria-label="Toggle dyslexia-friendly font"
                title="Toggle dyslexia-friendly font"
              >
                <span>Dyslexia Font</span>
              </button>
            </div>
            <div className="control-group">
              <button
                className={`control-button${tooltipsEnabled ? " active" : ""}`}
                onClick={() => setTooltipsEnabled((v) => !v)}
                aria-label="Toggle tooltips"
                title="Toggle tooltips"
              >
                <span>Tooltips {tooltipsEnabled ? "On" : "Off"}</span>
              </button>
            </div>
            <div className="control-group">
              <label style={{ display: "block", marginBottom: 4 }}>Line Height</label>
              <input
                type="range"
                min="1"
                max="2"
                step="0.05"
                value={lineHeight}
                onChange={(e) => setLineHeight(Number(e.target.value))}
                aria-label="Adjust line height"
                title="Adjust line height"
                style={{ width: 120 }}
              />
              <span style={{ marginLeft: 8 }}>{lineHeight.toFixed(2)}</span>
            </div>
            <div className="control-group">
              <label style={{ display: "block", marginBottom: 4 }}>Text Align</label>
              <select
                value={textAlign}
                onChange={(e) => setTextAlign(e.target.value)}
                aria-label="Text alignment"
                title="Text alignment"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
                <option value="justify">Justify</option>
              </select>
            </div>
            <div className="control-group">
              <button
                className={`control-button${desaturate ? " active" : ""}`}
                onClick={() => setDesaturate((v) => !v)}
                aria-label="Toggle color desaturation"
                title="Toggle color desaturation"
              >
                <span>Desaturate Colors</span>
              </button>
            </div>
            <div className="control-group">
              <button
                className={`control-button${hideImages ? " active" : ""}`}
                onClick={() => setHideImages((v) => !v)}
                aria-label="Hide images"
                title="Hide images"
              >
                <span>Hide Images</span>
              </button>
            </div>
            <div className="control-group">
              <button
                className={`control-button${highlightLinks ? " active" : ""}`}
                onClick={() => setHighlightLinks((v) => !v)}
                aria-label="Highlight links"
                title="Highlight links"
              >
                <span>Highlight Links</span>
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
                  <ZoomOutIcon /><span>A-</span>
                </button>
                <button
                  className="control-button font-btn"
                  onClick={increaseFontSize}
                  aria-label="Increase font size"
                  title="Increase font size"
                  disabled={fontSize >= 1.5}
                >
                  <ZoomInIcon /><span>A+</span>
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
                <NorthIcon /><span>Back to Top</span>
              </button>
            </div>
            <div className="control-group">
              <button
                className="control-button"
                onClick={resetAccessibilitySettings}
                aria-label="Reset all accessibility settings"
                title="Reset all accessibility settings to defaults"
              >
                <RefreshIcon /><span>Reset Settings</span>
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Accessibility;
