import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

export function AdminPanel() {
    const [projects, setProjects] = useState([]);
    const [editingProject, setEditingProject] = useState(null);
    const [editingImages, setEditingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const {i18n} = useTranslation();
    const currentLang = i18n.language;

    useEffect(() => {
        fetch("http://localhost:5000/projects")
            .then((res) => res.json())
            .then((data) => setProjects(data))
            .catch((err) => console.error("Error fetching projects:", err));
    }, []);


    const handleAddProject = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const titlePl = form.elements.titlePl.value.trim();
        const shortDescPl = form.elements.shortDescPl.value.trim();
        const longDescPl = form.elements.longDescPl.value.trim();

        const titleEn = form.elements.titleEn.value.trim();
        const shortDescEn = form.elements.shortDescEn.value.trim();
        const longDescEn = form.elements.longDescEn.value.trim();

        const files = form.elements.images.files;

        if (files.length < 2) {
            alert("Please upload at least 2 images.");
            return;
        }


        const jsonData = {
            translations: {
                pl: {
                    title: titlePl,
                    short_desc: shortDescPl,
                    long_desc: longDescPl,
                }
            },
        };

        if (titleEn || shortDescEn || longDescEn) {
            jsonData.translations["en"] = {
                ...(titleEn && {title: titleEn}),
                ...(shortDescEn && {short_desc: shortDescEn}),
                ...(longDescEn && {long_desc: longDescEn}),
            };
        }

        const formData = new FormData();
        formData.append("translations", JSON.stringify(jsonData.translations))
        Array.from(form?.elements.images.files).forEach((img) => formData.append("images", img));

        try {
            const res = await fetch("http://localhost:5000/projects", {
                method: "POST",
                body: formData,
            });
            const newProject = await res.json();
            setProjects((prev) => [...prev, newProject]);
            form.reset();
        } catch (err) {
            console.error("Error adding project:", err);
        }
        window.location.reload();
    };


    const handleDeleteProject = async (id) => {
        try {
            await fetch(`http://localhost:5000/projects/${id}`, {
                method: "DELETE",
            });
            setProjects((prev) => prev.filter((project) => project.id !== id));
        } catch (err) {
            console.error("Error deleting project:", err);
        }
    };


    const handleEditProject = (project) => {
        setEditingProject(project);
        setEditingImages(project.images); // Załaduj istniejące zdjęcia do edycji
        setNewImages([]); // Resetuj nowo wybrane zdjęcia
    };


    const handleSaveEdit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        const titlePl = form.elements.titlePl.value.trim();
        const shortDescPl = form.elements.shortDescPl.value.trim();
        const longDescPl = form.elements.longDescPl.value.trim();
        const titleEn = form.elements.titleEn.value.trim();
        const shortDescEn = form.elements.shortDescEn.value.trim();
        const longDescEn = form.elements.longDescEn.value.trim();
        const files = form.elements.images.files;

        if (titlePl.length > 50) {
            alert("Title exceeds maximum length(" + titlePl.length + ">50). (Polish)");
            return;
        }
        if (shortDescPl.length > 100) {
            alert("Short description exceeds maximum length( " + shortDescPl.length + ">100). (Polish)");
            return;
        }
        if (longDescPl.length > 1000) {
            alert("Long description exceeds maximum length(" + longDescPl.length + ">1000). (Polish)");
            return;
        }

        if (titleEn && titleEn.length > 50) {
            alert("Title exceeds maximum length(" + titleEn.length + ">50). (English)");
            return;
        }
        if (shortDescEn && shortDescEn.length > 100) {
            alert("Short description exceeds maximum length( " + shortDescEn.length + ">100). (English)");
            return;
        }
        if (longDescEn && longDescEn.length > 1000) {
            alert("Long description exceeds maximum length(" + longDescEn.length + ">1000). (English)");
            return;
        }


        const jsonData = {
            translations: {
                pl: {
                    title: titlePl,
                    short_desc: shortDescPl,
                    long_desc: longDescPl,
                }
            },
        };

        if (titleEn || shortDescEn || longDescEn) {
            jsonData.translations["en"] = {
                ...(titleEn && {title: titleEn}),
                ...(shortDescEn && {short_desc: shortDescEn}),
                ...(longDescEn && {long_desc: longDescEn}),
            };
        }

        const formData = new FormData();
        formData.append("translations", JSON.stringify(jsonData.translations))

        // Dodaj istniejące zdjęcia jako oddzielne pole w formie stringów (URL)
        editingImages.forEach((image) => {
            if (typeof image === "string") {
                formData.append("existingImages", image);
            }
        });

        // Dodaj nowe zdjęcia jako pliki
        for (const file of files) {
            formData.append("images", file);
        }

        if (editingImages.length + files.length < 2) {
            alert("Please upload at least 2 images.");
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/projects/${editingProject.id}`, {
                method: "PUT",
                body: formData,
            });
            const updatedProject = await res.json();
            setProjects((prev) =>
                prev.map((project) => (project.id === updatedProject.id ? updatedProject : project))
            );
            setEditingProject(null);
            setEditingImages([]);
            setNewImages([]);
        } catch (err) {
            console.error("Error editing project:", err);
        }
    };


    const handleRemoveImage = (index) => {
        setEditingImages((prev) => prev.filter((_, i) => i !== index));
    };


    const handleAddNewImages = () => {
        setEditingImages((prev) => [...prev, ...newImages.map((file) => URL.createObjectURL(file))]);
        setNewImages([]); // Wyczyść wybór nowych zdjęć
    };


    const handleNewImageSelection = (e) => {
        setNewImages([...e.target.files]);
    };


    return (
        <div className="container admin-panel">
            <h2 className="text-primary mb-4 mt-5">Admin Panel</h2>

            <div className="card admin-form">
                <div className="card-body">
                    <h3 className="mb-3">{editingProject ? "Edit Project" : "Add New Project"}</h3>
                    <form onSubmit={editingProject ? handleSaveEdit : handleAddProject}>
                        <h2>Polish:</h2>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="titlePl"
                                className="form-control"
                                placeholder="Project Title"
                                defaultValue={editingProject?.translations["pl"].title || ""}
                                required
                            />
                        </div>
                        <div className="mb-3">
              <textarea
                  name="shortDescPl"
                  className="form-control"
                  placeholder="Short Description"
                  rows={2}
                  defaultValue={editingProject?.translations["pl"].short_desc || ""}
                  required
              ></textarea>
                        </div>
                        <div className="mb-3">
              <textarea
                  name="longDescPl"
                  className="form-control"
                  placeholder="Long Description"
                  rows={4}
                  defaultValue={editingProject?.translations["pl"].long_desc || ""}
                  required
              ></textarea>
                        </div>

                        <h2>English (optional, if not entered, it will be automatically translated into Polish):</h2>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="titleEn"
                                className="form-control"
                                placeholder="Project Title"
                                defaultValue={editingProject?.translations["en"].title || ""}
                            />
                        </div>
                        <div className="mb-3">
              <textarea
                  name="shortDescEn"
                  className="form-control"
                  placeholder="Short Description"
                  rows={2}
                  defaultValue={editingProject?.translations["en"].short_desc || ""}
              ></textarea>
                        </div>
                        <div className="mb-3">
              <textarea
                  name="longDescEn"
                  className="form-control"
                  placeholder="Long Description"
                  rows={4}
                  defaultValue={editingProject?.translations["en"].long_desc || ""}
              ></textarea>
                        </div>


                        {editingProject && (
                            <div className="mb-3">
                                <h5>Current Images:</h5>
                                <div className="d-flex flex-wrap gap-3">
                                    {editingImages.map((image, index) => (
                                        <div key={index} className="position-relative">
                                            <img
                                                src={image}
                                                alt={`Image ${index + 1}`}
                                                className="img-thumbnail"
                                                style={{width: "100px", height: "100px", objectFit: "cover"}}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                                onClick={() => handleRemoveImage(index)}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}


                        <div className="mb-3">
                            <h5>Add New Images:</h5>
                            <input
                                type="file"
                                name="images"
                                className="form-control"
                                multiple
                                onChange={handleNewImageSelection}
                            />
                            {/*{newImages.length > 0 && editingProject && (*/}
                            {/*    <button*/}
                            {/*        type="button"*/}
                            {/*        className="btn btn-secondary mt-2"*/}
                            {/*        onClick={handleAddNewImages}*/}
                            {/*    >*/}
                            {/*        Add Selected Images*/}
                            {/*    </button>*/}
                            {/*)}*/}
                        </div>
                        <button type="submit" className="btn btn-primary">
                            {editingProject ? "Save Changes" : "Add Project"}
                        </button>
                    </form>
                </div>
            </div>


            <div className="mt-4">
                <h3>Manage Projects</h3>
                <div className="row g-4">
                    {projects.map((project) => {
                        const translation = project.translations[currentLang];
                        return (
                            <div key={project.id} className="col-md-6">
                                <div className="card">
                                    <div
                                        style={{
                                            backgroundImage: `url(${project.images[0]})`,
                                        }}
                                        className="card-img-top"
                                    ></div>
                                    <div className="card-body">
                                        <h5 className="card-title">{translation.title}</h5>
                                        <p className="card-text">{translation.short_desc}</p>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => handleEditProject(project)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteProject(project.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>


        </div>
    );
}