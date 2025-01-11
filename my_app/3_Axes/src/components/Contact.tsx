import React, { FormEvent } from "react";

const Contact: React.FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <div className="contact-section">
      <div className="contact-container">
        <div className="contact-info-card" data-aos="fade-right">
          <h3>Get in Touch</h3>
          <div className="contact-detail">
            <i className="fas fa-map-marker-alt"></i>
            <p>123 Engineering Drive, University Campus</p>
          </div>
          <div className="contact-detail">
            <i className="fas fa-phone"></i>
            <p>(555) 123-4567</p>
          </div>
          <div className="contact-detail">
            <i className="fas fa-envelope"></i>
            <p>info@deltapi3d.org</p>
          </div>
          <div className="contact-detail">
            <i className="fas fa-clock"></i>
            <p>Mon - Fri: 9:00 AM - 5:00 PM</p>
          </div>
        </div>
        <form
          className="contact-form"
          data-aos="fade-left"
          onSubmit={handleSubmit}
        >
          <h2>Send us a Message</h2>
          <div className="form-group">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Your Name" required />
          </div>
          <div className="form-group">
            <i className="fas fa-envelope"></i>
            <input type="email" placeholder="Your Email" required />
          </div>
          <div className="form-group">
            <i className="fas fa-pen"></i>
            <textarea
              className="form-text-area"
              rows={5}
              placeholder="Your Message"
              required
            ></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
