import React from "react";
import ChatBot from "../components/ChatBot";
import botImg from "../assets/bot.png";

const ContactUs = () => (
  <section className="contact-us">
    <div className="contact-image">
      <img src={botImg} alt="Chat assistant" />
    </div>
    <ChatBot />
  </section>
);

export default ContactUs;
