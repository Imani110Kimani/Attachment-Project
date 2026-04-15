import React, { useState, useEffect } from "react";
import pickupImg from "../assets/pickup.png";
import washFoldImg from "../assets/washandfold.png";
import ironingImg from "../assets/ironing.png";
import dryCleaningImg from "../assets/drycleaning.png";

const Services = ({ carouselPaused }) => {
  const slides = [
    {
      title: "Pickup & Delivery",
      description:
        "Our pickup service makes laundry effortless. We collect your clothes from your door, clean them with care, and return them ready to wear.",
      src: pickupImg,
      alt: "Pickup and delivery service",
    },
    {
      title: "Wash & Fold",
      description:
        "Professional wash and fold service that keeps your clothes soft, fresh, and ready to wear. Perfect for busy schedules.",
      src: washFoldImg,
      alt: "Wash and fold service",
    },
    {
      title: "Ironing",
      description:
        "Detailed ironing service for sharp, crease-free shirts, trousers, and linens so you always look polished.",
      src: ironingImg,
      alt: "Ironing service",
    },
    {
      title: "Dry Cleaning",
      description:
        "Premium dry cleaning for delicate fabrics and special garments that need extra care and precision.",
      src: dryCleaningImg,
      alt: "Dry cleaning service",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (carouselPaused) return;
    
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setVisible(true);
      }, 1000);
    }, 30000);
    return () => clearInterval(interval);
  }, [slides.length, carouselPaused]);

  const slide = slides[current];

  return (
    <section className="services">
      <div className={`services-wrap service-fade ${visible ? "visible" : "hidden"}`}>
        <div className="services-image">
          {slide.src ? (
            <img src={slide.src} alt={slide.alt} />
          ) : (
            <div className="service-placeholder">Image coming soon</div>
          )}
        </div>
        <div className="services-copy">
          <h2>{slide.title}</h2>
          <p>{slide.description}</p>
        </div>
      </div>
    </section>
  );
};

export default Services;
