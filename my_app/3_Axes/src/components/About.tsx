import React from "react";
import "aos/dist/aos.css";

interface Member {
  name: string;
  role: string;
  image: string;
}

const About: React.FC = () => {
  const members: Member[] = [
    {
      name: "John Smith",
      role: "President",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500",
    },
    {
      name: "Emily Johnson",
      role: "Vice President",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500",
    },
    {
      name: "Michael Chen",
      role: "Technical Lead",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500",
    },
    {
      name: "Sarah Williams",
      role: "Project Manager",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500",
    },
  ];

  return (
    <div className="container">
      <h2 className="section-title" data-aos="fade-up">
        About Us
      </h2>
      <div className="about-content" data-aos="fade-up">
        <p>
          Delta Pi 3D was founded in 2020 with the mission of bringing together
          passionate engineering students interested in 3D printing technology.
          Our fraternity provides resources, mentorship, and hands-on experience
          with cutting-edge 3D printing equipment.
        </p>
      </div>
      <div className="about-image-section" data-aos="fade-up">
        <div className="about-image-overlay">
          <h2>Innovating the Future of Engineering</h2>
        </div>
      </div>
      <div className="values-grid">
        {[
          "Innovation in Engineering",
          "Collaborative Learning",
          "Community Service",
          "Professional Development",
        ].map((value, index) => (
          <div
            className="value-card"
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <h3>{value}</h3>
            <p>
              We strive to excel in everything we do, pushing the boundaries of
              what's possible in 3D printing.
            </p>
          </div>
        ))}
      </div>
      <div className="team-section">
        <h2 className="section-title" data-aos="fade-up">
          Our Team
        </h2>
        <div className="team-grid">
          {members.map((member, index) => (
            <div
              className="member-card"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img
                src={member.image}
                alt={member.name}
                className="member-image"
              />
              <div className="member-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
