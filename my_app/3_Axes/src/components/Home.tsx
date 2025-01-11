import React, { useEffect } from "react";
import AOS from "aos";
//import 'aos/dist/aos.css';

const Home: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div>
      <div className="hero">
        <div className="hero-content" data-aos="fade-up">
          <h1>Delta Pi 3D</h1>
          <p>Engineering Excellence Through Innovation</p>
        </div>
      </div>
      <div className="container" data-aos="fade-up">
        <h2 className="section-title">Welcome to Delta Pi 3D</h2>
        <p>
          We are a fraternity dedicated to advancing 3D printing technology and
          fostering innovation among engineering students.
        </p>
      </div>
    </div>
  );
};

export default Home;
