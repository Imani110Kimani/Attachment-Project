import React, { useState, useEffect } from "react";
import aboutsecImg from "../assets/aboutsec.png";
import aboutsec2Img from "../assets/aboutsec2.png";

const AboutUs = () => {
  const images = [aboutsecImg, aboutsec2Img];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="about-us">
      <div className="about-wrap">
        <div className="about-copy">
          <h2>Fresh, Fast, and Flawless</h2>
          <p>
            ChapChap Laundry brings professional care to every load. We make laundry day smoother with fast service, smart pickup, and spotless results.
          </p>
        </div>
        <div className="about-image">
          <div className="about-carousel">
            <img src={images[current]} alt="Laundry service preview" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
