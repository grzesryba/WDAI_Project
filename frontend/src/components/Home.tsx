import React, {useEffect, useState} from "react";
import AOS from "aos";
import {useTranslation} from 'react-i18next';
import '../i18n'; // import pliku i18n.js

//import 'aos/dist/aos.css';

const Home: React.FC = () => {
    useEffect(() => {
        AOS.init({duration: 1500, once: true});
        AOS.refresh();
    }, []);

    const [currentSlider, setCurrentSlide] = useState(0)
    const slides = [
        "https://img.freepik.com/free-photo/designer-using-3d-printer_23-2151037152.jpg",
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200",
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920"
    ]
    const { t } = useTranslation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div>
            <div
                className="hero"
                style={{
                    backgroundImage: `url(${slides[currentSlider]})`,
                    backgroundSize: "cover",
                    backgroundBlendMode: "overlay",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                    transition: "background-image 1s ease-in-out",
                }}>
                <div className="hero-content" data-aos="fade-up">
                    <h1>3AXES</h1>
                    <p>Engineering Excellence Through Innovation</p>
                </div>
            </div>
            <div className="container" data-aos="fade-up">
                <h2 className="home-section-title">{t('home_welcome')}</h2>
                <p>{t('home_desc')}</p>
            </div>
        </div>
    );
};

export default Home;
