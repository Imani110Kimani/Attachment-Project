import React, { useState, useEffect } from "react";
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import NorthIcon from '@mui/icons-material/North';
import ContrastIcon from '@mui/icons-material/Contrast';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

const Accessibility = ({
  videoPaused,
  onVideoToggle,
  carouselPaused,
  onCarouselToggle,
}) => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(1); // multiplier for font size

  useEffect(() => {
    document.documentElement.style.setProperty('--font-size-multiplier', fontSize);
    document.body.classList.toggle('high-contrast', highContrast);
  }, [fontSize, highContrast]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 0.1, 1.5));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 0.1, 0.8));
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
  };

  return (
    <div className="accessibility-widget">
      <button
        className="accessibility-button"
        onClick={() => setPanelOpen(!panelOpen)}
        aria-label="Accessibility options"
        aria-expanded={panelOpen}
        title="Accessibility Controls"
      >
        <AccessibilityIcon />
      </button>

      {panelOpen && (
        <div className="accessibility-panel" role="region" aria-label="Accessibility controls">
          <h3>Accessibility Controls</h3>
          
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
        </div>
      )}
    </div>
  );
};

export default Accessibility;
