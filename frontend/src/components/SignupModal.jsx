import React, { useEffect, useRef, useState } from "react";

const SignupModal = ({ open, onClose, onLogin, onSignupSubmit }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const firstInputRef = useRef(null);
  const [name, setName] = useState("");
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
      await onSignupSubmit({ fullName: name, email, password });
      onClose();
    } catch (err) {
      setError(err.message || "Unable to create account.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="signup-modal-title" onClick={onClose}>
      <div className="signup-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
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

        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="signup-name">Full name</label>
          <input
            ref={firstInputRef}
            id="signup-name"
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="signup-email">Email address</label>
          <input
            id="signup-email"
            type="email"
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn signup-submit" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>

          <div className="signup-separator">
            <span>or</span>
          </div>

          <button type="button" className="btn google-button" disabled>
            Sign up with&nbsp;<span className="google-text"><span></span><span> G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e </span></span>
          </button>

          <p className="signup-note">
            Already have an account? <button type="button" className="modal-link" onClick={onLogin}>Login here</button>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;