
import React from "react";
import AboutUs from "./sections/AboutUs";
import Services from "./sections/Services";
import ContactUs from "./sections/ContactUs";
import Header from "./components/Header";
import machineImg from "./assets/machine.png";


const Home = () => (
  <>
    <Header />
    <section className="hero-section">
      <img src={machineImg} className="hero-img" alt="Laundry Machine" />
      <img src={machineImg} className="hero-img" alt="Laundry Machine" />
      <img src={machineImg} className="hero-img" alt="Laundry Machine" />
    </section>
    <main>
      <AboutUs />
      <Services />
      <ContactUs />
    </main>
  </>
);

export default Home;
