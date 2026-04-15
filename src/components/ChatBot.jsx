import React, { useState, useRef, useEffect } from "react";

const faqList = [
  {
    question: "How do I schedule a pickup?",
    answer:
      "Tap the 'Book Pickup' button or call our hotline. We'll collect your laundry from your doorstep within the same or next day.",
  },
  {
    question: "What are your service prices?",
    answer:
      "Prices depend on the service. Wash & Fold, Ironing, and Dry Cleaning rates are available on our services page or via the chat bot when you ask for pricing.",
  },
  {
    question: "How long does a wash take?",
    answer:
      "Most orders are ready within 24 hours. Dry cleaning may take slightly longer depending on fabric care requirements.",
  },
  {
    question: "Where are you located?",
    answer:
      "We operate in Laundro City with pickup and delivery across the neighborhood. Contact support if you need a custom route.",
  },
];

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I’m ChapChap Assistant. Ask me about pickup, pricing, or our services.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const sendBotReply = (text) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsTyping(true);
    timerRef.current = setTimeout(() => {
      setIsTyping(false);
      addMessage({ sender: "bot", text });
    }, 2000);
  };

  const handleFaqClick = (faq) => {
    addMessage({ sender: "user", text: faq.question });
    sendBotReply(faq.answer);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    addMessage({ sender: "user", text });

    const lowerText = text.toLowerCase();
    const matchedFaq = faqList.find(
      (faq) =>
        faq.question.toLowerCase().includes(lowerText) ||
        lowerText.includes("pickup") ||
        lowerText.includes("price") ||
        lowerText.includes("dry") ||
        lowerText.includes("iron")
    );

    sendBotReply(
      matchedFaq
        ? matchedFaq.answer
        : "I can help with pickup, pricing, ironing, wash & fold, or dry cleaning. Try asking one of those topics."
    );

    setInputValue("");
  };

  return (
    <div className="chat-container">
      <div className="phone-screen">
        <div className="chat-header">
          <div>
            <h3>Chat with ChapChap</h3>
            <p>FAQ-driven support for pickup, pricing, and service details.</p>
          </div>
        </div>

        <div className="chat-messages" aria-live="polite">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "user" ? "user" : "bot"}`}
          >
            {message.text}
          </div>
        ))}
        {isTyping && (
          <div className="message bot typing">
            <div className="typing-dot" />
            <div className="typing-dot" />
            <div className="typing-dot" />
          </div>
        )}
      </div>

      <div className="chat-quick-actions">
        {faqList.map((faq, index) => (
          <button
            key={index}
            type="button"
            className="faq-button"
            onClick={() => handleFaqClick(faq)}
          >
            {faq.question}
          </button>
        ))}
      </div>

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Ask me about pickup, pricing, or services..."
          aria-label="Ask a question"
          disabled={isTyping}
        />
        <button type="submit" className="btn" disabled={isTyping}>
          Send
        </button>
      </form>
      </div>
    </div>
  );
};

export default ChatBot;
