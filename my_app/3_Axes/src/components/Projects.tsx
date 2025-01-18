import { useContext } from "react";
import { ProjectsContext } from "./ProjectsContext";

const Projects: React.FC = () => {
  const { projects } = useContext(ProjectsContext)!;

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
