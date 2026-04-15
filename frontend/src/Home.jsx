import React, { useState, useRef, useEffect } from "react";
import AboutUs from "./sections/AboutUs";
import Services from "./sections/Services";
import ContactUs from "./sections/ContactUs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import Accessibility from "./components/Accessibility";
import heroVideo from "./assets/serv1.mp4";

const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (videoPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  }, [videoPaused]);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <h1 className="sr-only">ChapChap Laundry - Professional Laundry Services</h1>
      <section className="hero-section">
        <div className="hero-media">
          <div className="hero-slide hero-video-container active">
            <video 
              ref={videoRef}
              className="hero-video" 
              src={heroVideo} 
              autoPlay 
              loop 
              muted 
              playsInline 
            />
          </div>
          <div className="hero-overlay" />
        </div>

        <div className="hero-info">
          <button className="btn hero-button" onClick={() => setIsLoginOpen(true)}>
            Start Your Wash
          </button>
          <p className="hero-note">
            Experience laundry that works around your schedule. Quick pickup, expert care, and spotless results every time.
          </p>
        </div>
      </section>
      <main id="main-content">
        <AboutUs carouselPaused={carouselPaused} />
        <Services carouselPaused={carouselPaused} />
        <ContactUs />
      </main>
      <Footer />
      <Accessibility 
        videoPaused={videoPaused}
        onVideoToggle={() => setVideoPaused(!videoPaused)}
        carouselPaused={carouselPaused}
        onCarouselToggle={() => setCarouselPaused(!carouselPaused)}
      />
      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} onSignup={() => { setIsLoginOpen(false); setIsSignupOpen(true); }} />
      <SignupModal open={isSignupOpen} onClose={() => setIsSignupOpen(false)} onLogin={() => { setIsSignupOpen(false); setIsLoginOpen(true); }} />
    </>
  );
};

export default Home;
