import {useContext, useEffect, useState} from "react";
import AOS from "aos";
import {Link, useLocation} from "react-router-dom";

const Projects: React.FC = () => {
    // const {projects} = useContext(ProjectsContext)!;
    const [projects, setProjects] = useState([]);

    const location = useLocation()

    useEffect(() => {
        const timeout = setTimeout(() => {
        }, 500)
        clearTimeout(timeout);
        AOS.refresh();
    }, [location.pathname]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("http://localhost:5000/projects");
                const data = await response.json();
                setProjects(data);
                AOS.refresh();
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="projects_background">
            <div className="container">
                <h2 className="section-title" data-aos="fade-up">
                    Our Projects
                </h2>
                <div>
                    {projects.map((project, index) => {
                        return index % 2 == 0 ? (
                            <div className="post-card">
                                <div
                                    key={index}
                                    className="second_image_1 project_image"
                                    data-aos="zoom-in"
                                    style={{
                                        backgroundImage: `url(${project.images[0]})`
                                    }}
                                ></div>
                                <div
                                    key={index}
                                    className="first_image_1 project_image"
                                    data-aos="reveal-clip-left"
                                    style={{
                                        backgroundImage: `url(${project.images[1]})`
                                    }}
                                ></div>
                                <div className="project_1_view">
                                    <Link to={`/project/${project.id}`} className="view-project-link">
                                        View Projekt
                                    </Link>
                                </div>
                                <div className="project_1_desc">
                                    <h3>
                                        {project.title}
                                    </h3>
                                    {project.short_desc}
                                </div>
                            </div>
                        ) : (
                            <div className="post-card">
                                <div
                                    key={index}
                                    className="first_image_2 project_image"
                                    data-aos="reveal-clip-top"
                                    style={{
                                        backgroundImage: `url(${project.images[0]})`
                                    }}
                                ></div>
                                <div
                                    key={index}
                                    className="second_image_2 project_image"
                                    data-aos="reveal-clip-right"
                                    style={{
                                        backgroundImage: `url(${project.images[1]})`
                                    }}
                                ></div>
                                <div className="project_2_view">
                                    <Link to={`/project/${project.id}`} className="view-project-link">
                                        View Projekt
                                    </Link>
                                </div>
                                <div className="project_2_desc">
                                    <h3>
                                        {project.title}
                                    </h3>
                                    {project.short_desc}
                                </div>
                            </div>
                        )
                    })}
                </div>


            </div>
        </div>
    );
};

export default Projects;
