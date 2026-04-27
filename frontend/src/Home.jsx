import React, { useState, useRef, useEffect } from "react";
import AboutUs from "./sections/AboutUs";
import Services from "./sections/Services";
import ContactUs from "./sections/ContactUs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import Accessibility from "./components/Accessibility";
import GoogleAd from "./components/GoogleAd";
import heroVideo from "./assets/serv1.mp4";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
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

  useEffect(() => {
    const storedToken = localStorage.getItem("chapchap_token");
    const storedUser = localStorage.getItem("chapchap_user");

    if (storedToken && storedUser) {
      setAuthToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!authToken) return;

    const controller = new AbortController();
    const verifyToken = async () => {
      try {
        const response = await fetch(`${API_BASE}/auth/me`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${authToken}`,
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Token invalid");
        }

        const data = await response.json();
        setUser(data.user);
        localStorage.setItem("chapchap_user", JSON.stringify(data.user));
      } catch (error) {
        clearAuth();
      }
    };

    verifyToken();
    return () => controller.abort();
  }, [authToken]);

  const saveAuth = (userData, token) => {
    setUser(userData);
    setAuthToken(token);
    localStorage.setItem("chapchap_token", token);
    localStorage.setItem("chapchap_user", JSON.stringify(userData));
  };

  const clearAuth = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem("chapchap_token");
    localStorage.removeItem("chapchap_user");
  };

  const handleLogin = async ({ email, password }) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Invalid login credentials.");
    }

    saveAuth(data.user, data.token);
  };

  const handleSignup = async ({ fullName, email, password }) => {
    const response = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Unable to create account.");
    }

    saveAuth(data.user, data.token);
  };

  const handleLogout = () => {
    clearAuth();
  };

  return (
    <>
      {/* <a href="#main-content" className="skip-link">Skip to main content</a> */}
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
          <button
            className="btn hero-button"
            onClick={() => (user ? handleLogout() : setIsLoginOpen(true))}
          >
            {user ? "Logout" : "Start Your Wash"}
          </button>
          {user && <p className="hero-welcome">Welcome back, {user.fullName.split(" ")[0]}!</p>}
          <p className="hero-note">
            Experience laundry pickup service that works around your schedule, with quick same day laundry delivery, expert care, and spotless results every time.
          </p>
        </div>
      </section>
      <main id="main-content">
        <AboutUs carouselPaused={carouselPaused} />
        <GoogleAd
          client="ca-pub-XXXXXXXXXXXXXXXX"
          slot="1234567890"
        />
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
      <LoginModal
        open={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSignup={() => { setIsLoginOpen(false); setIsSignupOpen(true); }}
        onLoginSubmit={handleLogin}
      />
      <SignupModal
        open={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onLogin={() => { setIsSignupOpen(false); setIsLoginOpen(true); }}
        onSignupSubmit={handleSignup}
      />
    </>
  );
};

export default Home;
