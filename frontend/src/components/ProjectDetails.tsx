import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import AOS from "aos";
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import {useTranslation} from "react-i18next";


interface Project {
    id: string;
    translations: {
        pl: { title: string; short_desc: string; long_desc: string };
        en: { title: string; short_desc: string; long_desc: string };
    };
    images: string[];
}



function ProjectDetails() {
    const {id} = useParams();

    const [project, setProject] = useState<Project | null>(null)

    const {i18n} = useTranslation();
    const currentLang = i18n.language;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: true
        });
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${backendUrl}/projects/${id}`);
                const data = await response.json();
                setProject(data);
                AOS.refresh();
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, [id]);

    if (!project) {
        return <p>Project not found!</p>;
    }
    const projectTranslations = project.translations?.[currentLang as keyof typeof project.translations] || project.translations?.['pl']; // Default to Polish if translation for current language is missing

    const images = []

    for (let i = 0; i < project.images.length; i++) {
        images.push({
            original: project.images[i],
            thumbnail: project.images[i],
        })
    }

    return (
        <div className="projects_background">
            <div className="project-details ">
                <div className="project-details-container">
                    <h1 className="project-section-title"
                        data-aos="fade-up">{projectTranslations?.title || "Title not available"}</h1>
                    <div className="project-details-image" data-aos="slide-right" style={{
                        backgroundImage: `url(${project.images[0]})`
                    }}>
                    </div>
                    <div className="project-details-desc" data-aos="slide-left">
                        <p>{projectTranslations?.long_desc || "Description not available"}</p>
                    </div>
                </div>
            </div>
            <ImageGallery items={images}/>
        </div>
    );
}

export default ProjectDetails;