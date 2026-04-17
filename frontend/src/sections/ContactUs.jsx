import React, { useEffect, useState, useRef } from "react";
import ChatBot from "../components/ChatBot";
import botImg from "../assets/bot.png";

const ContactUs = () => {
  const [showPhone, setShowPhone] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => setShowPhone(true), 5000);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className={`contact-us ${isVisible ? "in-view" : ""}`}>
      <div className={`contact-image ${isVisible ? "slide-in-left" : ""}`}>
        <img src={botImg} alt="Chat assistant" />
      </div>

      {showPhone ? (
        <ChatBot />
      ) : (
        <div className={`chat-container ${isVisible ? "slide-in-right" : ""}`}>
          <div className="phone-screen">
            <div className="contact-delay-content">
              <h3>Do you have a question?</h3>
              <p>Our chat assistant is on its way. Please hang tight for a moment.</p>
              <div className="contact-delay-loader" aria-live="polite" aria-label="Loading chat">
                <span className="loader-dot" />
                <span className="loader-dot" />
                <span className="loader-dot" />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactUs;
