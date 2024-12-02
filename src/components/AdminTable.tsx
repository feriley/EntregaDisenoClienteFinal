import React, { useState, useEffect } from "react";
import "../components/ProjectDetail"; // Importa el WebComponent

interface Technology {
  techId: number;
  techName: string;
}

interface Developer {
  devId: number;
  devName: string;
  devSurname: string;
  email: string;
}

interface Project {
  projectId: number;
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
  technologies: Technology[];
  developers: Developer[];
  picture: string;
  repositoryUrl: string;
  demoUrl: string;
  status: { statusId: number };
}

const AdminTable: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editProjectId, setEditProjectId] = useState<number | null>(null);
  const [newProject, setNewProject] = useState<Project>({
    projectId: 0,
    projectName: "",
    description: "",
    startDate: "2024-01-01",
    endDate: "2024-06-01",
    technologies: [],
    developers: [],
    picture: "./img/default.png",
    repositoryUrl: "",
    demoUrl: "",
    status: { statusId: 1 },
  });

  const apiUrl = "http://localhost:8080/api/v1";

  // Fetch de proyectos
  const fetchProjects = async () => {
    try {
      const response = await fetch(`${apiUrl}/projects?page=0&size=10`);
      if (!response.ok) {
        throw new Error(`Error al obtener proyectos: ${response.status}`);
      }
      const data = await response.json();
      const projectData = data.content?.content || [];
      setProjects(projectData);
    } catch (error) {
      console.error("Error al cargar proyectos:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${apiUrl}/projects/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error al eliminar el proyecto.");
      }
      alert(`Proyecto con ID ${id} eliminado.`);
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id: number) => {
    const projectToEdit = projects.find((p) => p.projectId === id);
    if (projectToEdit) {
      setNewProject({ ...projectToEdit });
      setEditProjectId(id);
    }
  };

  const handleSave = async () => {
    try {
      const method = editProjectId ? "PUT" : "POST";
      const url = editProjectId
        ? `${apiUrl}/projects/${editProjectId}`
        : `${apiUrl}/projects`;

      const preparedProject = {
        ...newProject,
        technologies: newProject.technologies.map((tech) => ({
          techId: tech.techId,
        })),
        developers: newProject.developers.map((dev) => ({
          devId: dev.devId,
        })),
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preparedProject),
      });

      if (!response.ok) {
        throw new Error(`Error al guardar el proyecto. Status: ${response.status}`);
      }

      alert(`Proyecto ${editProjectId ? "editado" : "creado"} exitosamente.`);
      setEditProjectId(null);
      setNewProject({
        projectId: 0,
        projectName: "",
        description: "",
        startDate: "2024-01-01",
        endDate: "2024-06-01",
        technologies: [],
        developers: [],
        picture: "./img/default.png",
        repositoryUrl: "",
        demoUrl: "",
        status: { statusId: 1 },
      });
      fetchProjects();
    } catch (error) {
      console.error("Error en handleSave:", error);
    }
  };

  const handleViewDetails = (project: Project) => {
    const projectDetailElement = document.createElement("project-detail");
    projectDetailElement.setAttribute("project-name", project.projectName);
    projectDetailElement.setAttribute("description", project.description);
    projectDetailElement.setAttribute("picture", project.picture);
    projectDetailElement.setAttribute("repository-url", project.repositoryUrl);

    document.body.appendChild(projectDetailElement);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="admin-table">
      <h2 className="text-2xl font-bold mb-4">Administración de Proyectos</h2>
      {projects.length === 0 ? (
        <p>No hay proyectos disponibles.</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.projectId}>
                <td className="border px-4 py-2">{project.projectId}</td>
                <td className="border px-4 py-2">{project.projectName}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(project.projectId)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(project.projectId)}
                    className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => handleViewDetails(project)}
                    className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Formulario para crear/editar proyectos */}
      <div className="mt-6">
        <h3 className="text-xl font-bold">
          {editProjectId ? "Editar Proyecto" : "Crear Proyecto"}
        </h3>
        <input
          type="text"
          value={newProject.projectName}
          onChange={(e) =>
            setNewProject({ ...newProject, projectName: e.target.value })
          }
          placeholder="Nombre del proyecto"
          className="border px-2 py-1 w-full mb-4"
        />
        <textarea
          value={newProject.description}
          onChange={(e) =>
            setNewProject({ ...newProject, description: e.target.value })
          }
          placeholder="Descripción"
          className="border px-2 py-1 w-full mb-4"
        ></textarea>
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default AdminTable;
