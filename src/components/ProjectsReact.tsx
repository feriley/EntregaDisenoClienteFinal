import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import SearchBar from "./SearchBar";
import TechFilter from "./TechFilter";
import { testMode } from "../config/config";

// Interfaces
interface Technology {
  techId: number;
  techName: string;
}

interface Project {
  projectId: number;
  projectName: string;
  description: string;
  picture: string;
  technologies: Technology[];
  repositoryUrl: string;
  demoUrl?: string;
}

const ProjectsReact: React.FC = () => {
  const [page, setPage] = useState(0); // Página actual
  const [projects, setProjects] = useState<Project[]>([]); // Lista de proyectos
  const [totalPages, setTotalPages] = useState(0); // Total de páginas disponibles
  const [isSearching, setIsSearching] = useState(false); // Indicador de estado de búsqueda
  const [currentTech, setCurrentTech] = useState(""); // Tecnología seleccionada para el filtro
  const pageSize = 5; // Tamaño de cada página
  const apiUrl = "http://localhost:8080/api/v1/projects"; // URL base de la API

  /**
   * Cargar proyectos paginados desde la API
   */
  const fetchProjects = async () => {
    const url = `${apiUrl}?size=${pageSize}&page=${page}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      const projectsData = data.content?.content || [];
      const totalPagesData = data.content?.totalPages || 0;

      setProjects(projectsData);
      setTotalPages(totalPagesData);
    } catch (error) {
      console.error("Error al cargar proyectos:", error);
    }
  };

  /**
   * Buscar proyectos por palabra clave
   * @param query Palabra clave para buscar
   */
  const searchProjects = async (query: string) => {
    const url = `${apiUrl}/${query}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setProjects(data.content || []);
      setIsSearching(true); // Activar estado de búsqueda
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  };

  /**
   * Filtrar proyectos por tecnología
   * @param techName Nombre de la tecnología seleccionada
   */
  const filterByTechnology = async (techName: string) => {
    if (techName === "") {
      // Restablecer filtro
      setCurrentTech("");
      setIsSearching(false);
      setPage(0); // Reiniciar a la primera página
      return fetchProjects();
    }

    const url = `${apiUrl}/tec/${techName}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setProjects(data.content || []);
      setCurrentTech(techName);
      setIsSearching(true);
    } catch (error) {
      console.error("Error al filtrar por tecnología:", error);
    }
  };

  // Cargar proyectos iniciales y en cambios de página/estado
  useEffect(() => {
    if (!isSearching) fetchProjects();
  }, [page, isSearching]);

  return (
    <div>
      {/* Barra de búsqueda */}
      <SearchBar onSearch={(query) => searchProjects(query)} />

      {/* Filtro por tecnología */}
      <TechFilter onFilter={(techName) => filterByTechnology(techName)} />

      {/* Lista de proyectos */}
      <div className="grid gap-6">
        {projects.length === 0 ? (
          <p>No hay proyectos disponibles.</p>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project.projectId}
              id={project.projectId}
              title={project.projectName}
              description={project.description}
              image={project.picture}
              technologies={project.technologies}
              githubLink={project.repositoryUrl}
              projectLink={project.demoUrl}
              test={testMode}
            />
          ))
        )}
      </div>

      {/* Paginación */}
      {!isSearching && (
        <div className="paginacion flex justify-center gap-4 mt-8">
          <button
            className="btn-prev bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={page === 0}
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          >
            Previous
          </button>
          <span className="font-bold">{`Página ${page + 1} de ${totalPages}`}</span>
          <button
            className="btn-next bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectsReact;
