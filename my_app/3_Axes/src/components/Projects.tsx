interface Project {
  title: string;
  description: string;
  image: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: "Prosthetic Hand Project",
      description: "3D printed prosthetic hands for children in need",
      image:
        "https://images.unsplash.com/photo-1576615278693-f8e095e37e01?auto=format&fit=crop&w=500",
    },
    {
      title: "Campus Innovation Hub",
      description: "Creating a makerspace for engineering students",
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=500",
    },
    {
      title: "Sustainable Housing",
      description: "3D printed sustainable housing solutions",
      image:
        "https://images.unsplash.com/photo-1638444571685-e1ef9b9316c8?auto=format&fit=crop&w=500",
    },
  ];

  return (
    <div className="container">
      <h2 className="section-title" data-aos="fade-up">
        Our Projects
      </h2>
      <div className="project-grid">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div
              className="project-image"
              style={{ backgroundImage: `url(${project.image})` }}
            ></div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
