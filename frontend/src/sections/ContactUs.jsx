import React, { useEffect, useState } from "react";
import ChatBot from "../components/ChatBot";
import botImg from "../assets/bot.png";

const ContactUs = () => {
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setShowPhone(true), 5000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className="contact-us">
      <div className="contact-image">
        <img src={botImg} alt="Chat assistant" />
      </div>

      {showPhone ? (
        <ChatBot />
      ) : (
        <div className="chat-container">
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
