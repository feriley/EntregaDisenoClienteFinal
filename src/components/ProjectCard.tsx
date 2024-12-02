import React, { useState } from "react";

interface Technology {
  techId: number;
  techName: string;
}

interface ProjectProps {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: Technology[];
  githubLink: string;
  projectLink?: string;
  test?: boolean;
}

const ProjectCard: React.FC<ProjectProps> = ({
  id,
  title,
  description,
  image,
  technologies,
  githubLink,
  projectLink,
  test = false,
}) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/projects/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert(`El proyecto "${title}" ha sido eliminado correctamente.`);
        setIsDeleted(true);
      } else {
        alert("No se pudo eliminar el proyecto. Revisa la API.");
      }
    } catch (error) {
      console.error("Error al intentar eliminar el proyecto:", error);
      alert("Ocurrió un error al eliminar el proyecto.");
    }
  };

  if (isDeleted) return null;

  return (
    <div className="card bg-white p-6 mb-8 shadow-lg rounded-lg flex">
      <div className="proyecto-icono flex-shrink-0 w-56 mr-6">
        <img src={image} alt={`Imagen del Proyecto ${title}`} className="w-full h-auto rounded-lg shadow-md" />
      </div>

      <div className="proyecto-detalle flex-1">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
        <div className="proyecto-iconos flex gap-4 mb-4">
          {technologies.map((tech) => (
            <span key={tech.techId} className="bg-gray-200 px-2 py-1 rounded">
              {tech.techName}
            </span>
          ))}
        </div>
        <p className="text-lg text-gray-600 mb-6">{description}</p>
        <div className="links">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-600 hover:text-blue-800 mr-4"
          >
            Código en GitHub
          </a>
          {projectLink && (
            <a
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 hover:text-blue-800"
            >
              Ver Proyecto
            </a>
          )}
        </div>
        {test && (
          <button
            onClick={handleDelete}
            className="delete-button mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
