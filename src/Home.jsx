import React, { useState, useEffect } from "react";
import AboutUs from "./sections/AboutUs";
import Services from "./sections/Services";
import ContactUs from "./sections/ContactUs";
import Header from "./components/Header";
import machineImg from "./assets/machine.png";
import heroVideo from "./assets/serv1.mp4";


const Home = () => {
	const images = [machineImg, machineImg, machineImg];
	const [imageOrder, setImageOrder] = useState([0, 1, 2]);
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setImageOrder(prev => [prev[1], prev[2], prev[0]]);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const slideInterval = setInterval(() => {
			setCurrentSlide(prev => (prev + 1) % 2);
		}, 8000); // Switch slides every 8 seconds
		return () => clearInterval(slideInterval);
	}, []);

	return (
		<>
			<Header />
			<section className="hero-section">
				<div className="hero-media">
					<div className={`hero-slide hero-images ${currentSlide === 0 ? "active" : ""}`}>
						{imageOrder.map((index, i) => (
							<img key={i} src={images[index]} className="hero-img" alt="Laundry Machine" />
						))}
					</div>

					<div className={`hero-slide hero-video-container ${currentSlide === 1 ? "active" : ""}`}>
						<video className="hero-video" src={heroVideo} autoPlay loop muted playsInline />
					</div>

					<div className="hero-overlay" />
				</div>

				<div className="hero-info">
					<button className="btn hero-button">Start Your Wash</button>
					<p className="hero-note">
						{currentSlide === 0
							? "Experience laundry that works around your schedule. Quick pickup, expert care, and spotless results every time."
							: "See how we handle your laundry with care and precision."}
					</p>
				</div>
			</section>
			<main>
				<AboutUs />
				<Services />
				<ContactUs />
			</main>
		</>
	);
};

export default Home;
