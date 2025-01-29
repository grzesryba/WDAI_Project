import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import AOS from "aos";
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"

function ProjectDetails() {
    const {id} = useParams(); // Pobieramy ID z URL
    // const {projects} = useContext(ProjectsContext)!;

    const [project, setProject] = useState(null)

    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: true
        });
        const fetchProjects = async () => {
            try {
                const response = await fetch(`http://localhost:5000/projects/${id}`);
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

    const images = []

    for (let i = 0; i < project.images.length; i++) {
        images.push({
            original: project.images[i],
            thumbnail: project.images[i],
        })
    }

    // const images = [
    //     {
    //         original: "https://images.unsplash.com/photo-1546188994-07c34f6e5e1b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnV0dXJlfGVufDB8fDB8fHww/1000/600",
    //         thumbnail: "https://picsum.photos/id/1018/250/150/",
    //     },
    //     {
    //         original: "https://picsum.photos/id/1015/1000/600/",
    //         thumbnail: "https://picsum.photos/id/1015/250/150/",
    //     },
    //     {
    //         original: "https://picsum.photos/id/1019/1000/600/",
    //         thumbnail: "https://picsum.photos/id/1019/250/150/",
    //     },
    // ];

    return (
        <div className="projects_background">
            <div className="project-details ">
                <div className="project-details-container">
                    <h1 className="section-title" data-aos="fade-up">{project.title}</h1>
                    <div className="project-details-image" data-aos="slide-right" style={{
                        backgroundImage: `url(${project.images[0]})`
                    }}>
                    </div>
                    <div className="project-details-desc" data-aos="slide-left">
                        <h1>{project.title}</h1>
                        <br/>
                        <p>{project.long_desc}</p>
                    </div>
                </div>
            </div>
            <ImageGallery items={images}/>
        </div>
    );
}

export default ProjectDetails;