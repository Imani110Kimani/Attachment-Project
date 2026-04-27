import React, { useEffect, useRef, useState } from "react";

const LoginModal = ({ open, onClose, onSignup, onLoginSubmit }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const firstInputRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await onLoginSubmit({ email, password });
      onClose();
    } catch (err) {
      setError(err.message || "Unable to login. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="login-modal-title" onClick={onClose}>
      <div className="login-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <button 
          ref={closeButtonRef}
          className="modal-close" 
          onClick={onClose} 
          aria-label="Close login form"
        >
          ×
        </button>
        <div className="login-modal-header">
          <h2 id="login-modal-title">Ready to start your wash?</h2>
          <p>Login in seconds and book pickup with one tap. No long forms, no waiting.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email address</label>
          <input
            ref={firstInputRef}
            id="login-email"
            type="email"
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn login-submit" disabled={loading}>
            {loading ? "Logging in..." : "Login now"}
          </button>

          <div className="login-separator">
            <span>or</span>
          </div>

          <button type="button" className="btn google-button" disabled>
            Use&nbsp;<span className="google-text"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></span>&nbsp;Instead
          </button>

          <p className="login-note">
            Don't have an account? <a href="#create-account" onClick={(e) => { e.preventDefault(); onSignup(); }}>Create one</a> in seconds.
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;