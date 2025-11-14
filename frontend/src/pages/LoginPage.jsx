import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { useState, useEffect } from "react";

export const LoginPage = () => {

  // TODO: Crear estados locales para manejar errores y loading
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TODO: Implementar useForm para controlar el formulario
  const { username, password, handleChange, handleReset } = useForm({
    username: "",
    password: "",
  });

  // TODO: Implementar useNavigate para redirigir al usuario al iniciar sesión
  const navigate = useNavigate();

  // TODO: Crear función para manejar el submit del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setErrorMessage("Todos los campos son obligatorios.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        let message = "Credenciales incorrectas.";

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
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Iniciar Sesión
        </h2>

        <div
          className={`bg-red-100 text-red-700 p-3 rounded mb-4 ${
            hasError ? "" : "hidden"
          }`}
        >
          <p className="text-sm">{errorMessage}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Ingresa tu usuario"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition-colors"
          >
            Ingresar
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};
