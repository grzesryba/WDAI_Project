import React, {FormEvent} from "react";
import {useTranslation} from "react-i18next";
import '../i18n';

const Contact: React.FC = () => {

  const { t } = useTranslation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${backendUrl}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        alert("Thank you for your message! We'll get back to you soon.");
      } else {
        alert('Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to send your message. Please try again later.');
    }
  };



  return (
    <div className="contact-section">
      <div className="contact-container">
        <div className="contact-info-card" data-aos="fade-right">
          <h3>{t('contact_header')}</h3>
          <div className="contact-detail">
            <i className="fas fa-map-marker-alt"></i>
            <p>D-17 AGH Campus</p>
          </div>
          <div className="contact-detail">
            <i className="fas fa-phone"></i>
            <p>(555) 123-4567</p>
          </div>
          <div className="contact-detail">
            <i className="fas fa-envelope"></i>
            <p>info@3axes.org</p>
          </div>
          <div className="contact-detail">
            <i className="fas fa-clock"></i>
            <p>{t('contact_date')}</p>
          </div>
        </div>
        <form
          className="contact-form"
          data-aos="fade-left"
          onSubmit={handleSubmit}
        >
          <h2>{t('contact_send_header')}</h2>
          <div className="form-group">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Your Name" name="name" required />
          </div>
          <div className="form-group">
            <i className="fas fa-envelope"></i>
            <input type="email" placeholder="Your Email" name="email" required />
          </div>
          <div className="form-group">
            <i className="fas fa-pen"></i>
            <textarea
              className="form-text-area"
              rows={5}
              placeholder="Your Message"
              name="message"
              required
            ></textarea>
          </div>
          <button type="submit" className="contact-button">{t('contact_send_button')}</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
