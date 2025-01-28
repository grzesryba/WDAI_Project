import React, { FormEvent } from "react";

const Contact: React.FC = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      const response = await fetch('http://localhost:5000/send-email', {
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
          <h3>Get in Touch</h3>
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
              required
            ></textarea>
          </div>
          <button type="submit" className="contact-button">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
