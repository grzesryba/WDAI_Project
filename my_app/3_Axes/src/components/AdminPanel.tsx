import { useState, useEffect } from "react";

export function AdminPanel() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [editingImages, setEditingImages] = useState([]); // Zarządzanie istniejącymi zdjęciami
  const [newImages, setNewImages] = useState([]); // Nowo wybrane zdjęcia

  useEffect(() => {
    fetch("http://localhost:5000/projects")
        .then((res) => res.json())
        .then((data) => setProjects(data))
        .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  const handleAddProject = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const title = form.elements.title.value.trim();
    const shortDesc = form.elements.shortDesc.value.trim();
    const longDesc = form.elements.longDesc.value.trim();
    const files = form.elements.images.files;

    if (files.length < 2) {
      alert("Please upload at least 2 images.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("short_desc", shortDesc);
    formData.append("long_desc", longDesc);
    for (const file of files) {
      formData.append("images", file);
    }

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

    const title = form.elements.title.value.trim();
    const shortDesc = form.elements.shortDesc.value.trim();
    const longDesc = form.elements.longDesc.value.trim();
    const files = form.elements.images.files;

    if (title.length > 100 || shortDesc.length > 300 || longDesc.length > 1000) {
      alert("Title, short description, or long description exceeds maximum length.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("short_desc", shortDesc);
    formData.append("long_desc", longDesc);

    // Dodaj istniejące zdjęcia jako oddzielne pole w formie stringów (URL)
    editingImages.forEach((image) => {
      if (typeof image === "string") {
        formData.append("existingImages", image); // Istniejące URL-e
      }
    });

    // Dodaj nowe zdjęcia jako pliki
    for (const file of files) {
      formData.append("images", file);
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

  const handleReorderImages = (fromIndex, toIndex) => {
    setEditingImages((prev) => {
      const updatedImages = [...prev];
      const [movedImage] = updatedImages.splice(fromIndex, 1);
      updatedImages.splice(toIndex, 0, movedImage);
      return updatedImages;
    });
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
        <h2 className="text-primary mb-4">Admin Panel</h2>

        <div className="card admin-form">
          <div className="card-body">
            <h3 className="mb-3">{editingProject ? "Edit Project" : "Add New Project"}</h3>
            <form onSubmit={editingProject ? handleSaveEdit : handleAddProject}>
              <div className="mb-3">
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Project Title"
                    defaultValue={editingProject?.title || ""}
                    required
                />
              </div>
              <div className="mb-3">
              <textarea
                  name="shortDesc"
                  className="form-control"
                  placeholder="Short Description"
                  rows={2}
                  defaultValue={editingProject?.short_desc || ""}
                  required
              ></textarea>
              </div>
              <div className="mb-3">
              <textarea
                  name="longDesc"
                  className="form-control"
                  placeholder="Long Description"
                  rows={4}
                  defaultValue={editingProject?.long_desc || ""}
                  required
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
                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
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
                {newImages.length > 0 && (
                    <button
                        type="button"
                        className="btn btn-secondary mt-2"
                        onClick={handleAddNewImages}
                    >
                      Add Selected Images
                    </button>
                )}
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
            {projects.map((project) => (
                <div key={project.id} className="col-md-6">
                  <div className="card">
                    <div
                        style={{
                          backgroundImage: `url(${project.images[0]})`,
                        }}
                        className="card-img-top"
                    ></div>
                    <div className="card-body">
                      <h5 className="card-title">{project.title}</h5>
                      <p className="card-text">{project.short_desc}</p>
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
            ))}
          </div>
        </div>
      </div>
  );
}
