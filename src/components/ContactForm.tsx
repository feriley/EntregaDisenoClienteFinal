import React, { useState } from "react";

const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validateName = (value: string) => {
    if (!/^[A-Z][a-z]*$/.test(value)) {
      return "El nombre debe comenzar con mayúscula y el resto en minúsculas.";
    }
    return "";
  };

  const validateEmail = (value: string) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "El email no tiene un formato válido.";
    }
    return "";
  };

  const validateMessage = (value: string) => {
    if (value.length < 20) {
      return "El mensaje debe tener al menos 20 caracteres.";
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const messageError = validateMessage(message);

    if (nameError || emailError || messageError) {
      setErrors({
        name: nameError,
        email: emailError,
        message: messageError,
      });
      return;
    }

    alert("Formulario enviado correctamente");
    // Aquí puedes manejar el envío del formulario
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors({ ...errors, name: validateName(e.target.value) });
          }}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Mail
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors({ ...errors, email: validateEmail(e.target.value) });
          }}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setErrors({ ...errors, message: validateMessage(e.target.value) });
          }}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={!!(errors.name || errors.email || errors.message)}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
};

export default ContactForm;
