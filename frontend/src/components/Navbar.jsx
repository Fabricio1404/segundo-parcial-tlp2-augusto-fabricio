import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  // TODO: Obtener datos del usuario desde /api/profile
  const [userName, setUserName] = useState("");

  const fetchProfile = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      if (data && data.name) {
        setUserName(data.name);
      }
    } catch {}
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // TODO: Implementar función handleLogout con POST a /api/logout usando credentials: 'include'
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      const response = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        return;
      }

      navigate("/login");
    } catch {} finally {
      setIsLoggingOut(false);
    }
  };

  // TODO: Después del logout exitoso, redireccionar a /login

  // TODO: Manejar errores apropiadamente

  const displayName = userName || "Usuario";

  return (
    <nav className="bg-gray-900 text-white h-16 left-0 right-0 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="text-2xl font-bold">Superhéroes App</div>

        <div className="hidden md:flex items-center space-x-6">
          <span className="text-gray-300">
            Bienvenido,{" "}
            <span className="font-semibold text-white">{displayName}</span>
          </span>

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors font-medium"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};