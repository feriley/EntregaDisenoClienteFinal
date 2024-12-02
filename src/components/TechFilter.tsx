import React, { useState, useEffect } from "react";

interface Technology {
  techId: number;
  techName: string;
}

interface TechFilterProps {
  onFilter: (techName: string) => void;
}

const TechFilter: React.FC<TechFilterProps> = ({ onFilter }) => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/technologies");
        if (!response.ok) {
          throw new Error(`Error al cargar las tecnologías: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data.content)) {
          throw new Error("El campo 'content' no contiene un array.");
        }
        setTechnologies(data.content); // Utilizamos el campo 'content'
      } catch (error) {
        console.error("Error al cargar tecnologías:", error);
        setTechnologies([]); // Asegura que siempre haya un valor válido
      }
    };

    fetchTechnologies();
  }, []);

  return (
    <div className="tech-filter mb-6">
      <label htmlFor="tech-select" className="block text-gray-700 font-bold mb-2">
        Filtrar por Tecnología:
      </label>
      <select
        id="tech-select"
        className="border border-gray-300 px-4 py-2 rounded w-full"
        onChange={(e) => onFilter(e.target.value)}
      >
        <option value="">Todas</option>
        {technologies?.map((tech) => (
          <option key={tech.techId} value={tech.techName}>
            {tech.techName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TechFilter;
