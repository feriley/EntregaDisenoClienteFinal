import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      onSearch(searchTerm);
    } else {
      alert("Por favor, introduce al menos 3 caracteres para buscar.");
    }
  };

  return (
    <div className="search-bar mb-6 flex items-center gap-4">
      <input
        type="text"
        className="border border-gray-300 px-4 py-2 rounded w-full"
        placeholder="Buscar proyectos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSearch}
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
