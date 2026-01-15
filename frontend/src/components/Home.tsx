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
    const { t } = useTranslation();

    const [slides, setSlides] = useState<string[]>([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/home-slides`)
            .then(res => {
                const promise = res.json();
                console.log(promise)
                return promise
            })
            .then(setSlides)
            .catch(console.error);
    }, []);

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
                    backgroundImage: `url(${slides[currentSlider] || 'https://res.cloudinary.com/drcjl0cys/image/upload/v1768476088/home2_uuyxyw.jpg'})`,
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
