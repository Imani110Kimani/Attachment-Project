import React, { useState } from "react";
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import NorthIcon from '@mui/icons-material/North';

const Accessibility = ({
  videoPaused,
  onVideoToggle,
  carouselPaused,
  onCarouselToggle,
}) => {
  const [panelOpen, setPanelOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
