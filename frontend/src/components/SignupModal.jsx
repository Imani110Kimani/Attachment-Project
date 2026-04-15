import React, { useEffect, useRef } from "react";

const SignupModal = ({ open, onClose, onLogin }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleFocusTrap = (e) => {
      if (!modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])"
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    modalRef.current?.addEventListener("keydown", handleFocusTrap);
    firstInputRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleEscape);
      modalRef.current?.removeEventListener("keydown", handleFocusTrap);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="signup-modal-title">
      <div className="signup-modal" ref={modalRef}>
        <button 
          ref={closeButtonRef}
          className="modal-close" 
          onClick={onClose} 
          aria-label="Close signup form"
        >
          ×
        </button>
        <div className="signup-modal-header">
          <h2 id="signup-modal-title">Join ChapChap Laundry</h2>
          <p>Create your account in under a minute. Start washing smarter today.</p>
        </div>

        <form className="signup-form" onSubmit={(event) => event.preventDefault()}>
        
          <label htmlFor="signup-name">Full name</label>
          <input 
            ref={firstInputRef}
            id="signup-name" 
            type="text" 
            placeholder="Your full name" 
            required 
          />

        
          <label htmlFor="signup-email">Email address</label>
          <input id="signup-email" type="email" placeholder="you@domain.com" required />

          
          <label htmlFor="signup-password">Password</label>
          <input id="signup-password" type="password" placeholder="Create a password" required />

          <button type="submit" className="btn signup-submit">
            Create account
          </button>

          <div className="signup-separator">
            <span>or</span>
          </div>

          <button type="button" className="btn google-button" disabled>
            Sign up with Google
          </button>

          <p className="signup-note">
            Already have an account? <a href="#login" onClick={(e) => { e.preventDefault(); onLogin(); }}>Login here</a>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;