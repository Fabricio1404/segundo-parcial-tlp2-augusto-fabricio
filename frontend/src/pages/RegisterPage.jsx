import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { useState, useEffect } from "react";

export const RegisterPage = () => {

  // TODO: Crear estados locales para manejar errores y loading
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TODO: Implementar useForm para controlar el formulario
  const { username, email, password, name, lastname, handleChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    name: "",
    lastname: "",
  });

  // TODO: Implementar useNavigate para redirigir al usuario al registrarse
  const navigate = useNavigate();

  // TODO: Crear función para manejar el submit del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !email || !password || !name || !lastname) {
      setErrorMessage("Todos los campos son obligatorios.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          name,
          lastname,
        }),
      });

      if (!response.ok) {
        let message = "No se pudo completar el registro.";

        try {
          const data = await response.json();
          if (data && data.message) {
            message = data.message;
          }
        } catch {}

        setErrorMessage(message);
        return;
      }

      await response.json();
      handleReset();
      navigate("/home");
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // TODO: Verificar si hay errores y mostrarlos en pantalla
  const hasError = Boolean(errorMessage);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Crear Cuenta
        </h2>

        <div
          className={`bg-red-100 text-red-700 p-3 rounded mb-4 ${
            hasError ? "" : "hidden"
          }`}
        >
          <p className="text-sm">{errorMessage}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-1"
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Nombre de usuario"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={username}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="usuario@correo.com"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-1"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Tu nombre"
                className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="lastname"
                className="block text-gray-700 font-medium mb-1"
              >
                Apellido
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Tu apellido"
                className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={lastname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Crea una contraseña segura"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded mt-2 transition-colors"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="text-green-600 hover:text-green-800 font-medium"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
};
