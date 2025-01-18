import { useContext, useState } from "react";
import { ProjectsContext } from "./ProjectsContext";
import { DragDropImage } from "../components/DragDropImage";

export function AdminPanel() {
  const { projects, dispatch } = useContext(ProjectsContext)!;
  const [selectedImage, setSelectedImage] = useState("");

  const handleAddProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const newProject = {
      id: Date.now(),
      title: (form.elements.namedItem("title") as HTMLInputElement).value,
      description: (form.elements.namedItem("content") as HTMLTextAreaElement)
        .value,
      image:
        selectedImage ||
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=500",
    };

    dispatch({
      type: "ADD_PROJECT",
      payload: newProject,
    });

    form.reset();
    setSelectedImage("");
  };

  const handleDeleteProject = (id: number) => {
    dispatch({
      type: "DELETE_PROJECT",
      payload: id,
    });
  };

  return (
    <div className="container admin-panel">
      <h2 className="text-primary mb-4">Admin Panel</h2>

      <div className="card admin-form">
        <div className="card-body">
          <h3 className="mb-3">Add New Project</h3>
          <form onSubmit={handleAddProject}>
            <div className="mb-3">
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Project Title"
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                name="content"
                className="form-control"
                placeholder="Project Description"
                rows={4}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <DragDropImage onImageSelected={setSelectedImage} />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Project
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
                <img
                  src={project.image}
                  className="card-img-top"
                  alt={project.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="card-text">{project.description}</p>
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
