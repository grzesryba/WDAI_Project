import {useEffect, useState} from "react";
import AOS from "aos";
import {Link, useLocation} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import '../i18n';

interface Project {
    id: string;
    translations: {
        pl: { title: string; short_desc: string; long_desc: string };
        en: { title: string; short_desc: string; long_desc: string };
    };
    images: string[];
}

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    const location = useLocation()
    const { t,i18n } = useTranslation();
    const currentLang = i18n.language;

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    useEffect(() => {
        const timeout = setTimeout(() => {
        }, 500)
        clearTimeout(timeout);
        AOS.refresh();
    }, [location.pathname]);

    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: true
        });
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${backendUrl}/projects`);
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
            <div className="project-container">
                <h2 className="project-section-title" data-aos="fade-up">{t('project_header')}</h2>
                <div>
                    {projects.map((project, index) => {
                        const projectTranslations = project.translations?.[currentLang as keyof typeof project.translations] || project.translations?.['pl']; // wczytanie tłumaczenia w zależności od języka
                        const title = projectTranslations?.title;
                        const short_desc = projectTranslations?.short_desc;

                        return index % 2 == 0 ? (
                            <div className="post-card">
                                <div
                                    key={index}
                                    className="second_image_1 project_image"
                                    data-aos="zoom-in"
                                    style={{
                                        backgroundImage: `url(${backendUrl+project.images[0]})`
                                    }}
                                ></div>
                                <div
                                    key={index}
                                    className="first_image_1 project_image"
                                    data-aos="reveal-clip-left"
                                    style={{
                                        backgroundImage: `url(${backendUrl+project.images[1]})`
                                    }}
                                ></div>
                                <div className="project_1_desc" data-aos="slide-right">
                                    <h3>
                                        {title}
                                    </h3>
                                    {short_desc}
                                </div>
                                <div className="project_1_view" data-aos="slide-left">
                                    <Link to={`/project/${project.id}`} className="view-project-link">
                                        View Projekt
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="post-card">
                                <div
                                    key={index}
                                    className="first_image_2 project_image"
                                    data-aos="reveal-clip-top"
                                    style={{
                                        backgroundImage: `url(${backendUrl+project.images[0]})`
                                    }}
                                ></div>
                                <div
                                    key={index}
                                    className="second_image_2 project_image"
                                    data-aos="reveal-clip-right"
                                    style={{
                                        backgroundImage: `url(${backendUrl+project.images[1]})`
                                    }}
                                ></div>
                                <div className="project_2_desc" data-aos="slide-left">
                                    <h3>
                                        {title}
                                    </h3>
                                    {short_desc}
                                </div>
                                <div className="project_2_view" data-aos="slide-right">
                                    <Link to={`/project/${project.id}`} className="view-project-link">
                                        View Projekt
                                    </Link>
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
