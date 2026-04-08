import React, { useState } from "react";
import serv1 from "../assets/serv1.mp4";
import serv2 from "../assets/serv2.mp4";
import pickupImg from "../assets/pickup.jpg";
import dryCleaningVideo from "../assets/drycleaning.mp4";

const Services = () => {
  const slides = [
    [
      { src: serv1, title: "Express Service", type: "video" },
      
    ],
     [
      { src: serv1, title: "Wash & Fold", type: "video" },
      
    ],
    [
      { src: pickupImg, title: "Pickup & Delivery", type: "image" },
      
    ],
     [
      { src: serv1, title: "Dry Cleaning", type: "video" },
      
    ],
    [
      { src: dryCleaningVideo, title: "Dry Cleaning", type: "video" }
    ]
  ];
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % slides.length);
  const prev = () => setCurrent((current - 1 + slides.length) % slides.length);

  return (
    <section className="services">
      <div className="services-content">
        <div className="services-media">
          <div className="carousel">
            <button onClick={prev} className="carousel-btn prev">&lt;</button>
            <div className="slide">
              {slides[current].map((item, idx) => (
                <div key={idx} className="video-item">
                  <h3 className="video-title">{item.title}</h3>
                  {item.type === "video" ? (
                    <video controls className="service-video">
                      <source src={item.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img src={item.src} alt={item.title} className="service-video" />
                  )}
                </div>
              ))}
            </div>
            <button onClick={next} className="carousel-btn next">&gt;</button>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Services;
