import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";

export const HomePage = () => {
  const [userName, setUserName] = useState("");
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isReloading, setIsReloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // TODO: Integrar lógica para obtener superhéroes desde la API
  const fetchSuperheroes = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/superheroes", {
        credentials: "include",
      });

      if (!response.ok) {
        setSuperheroes([]);
        return;
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setSuperheroes(data);
      } else {
        setSuperheroes([]);
      }
    } catch (error) {
      setSuperheroes([]);
    }
  };

  // TODO: Implementar useState para almacenar la lista de superhéroes
  const [superheroes, setSuperheroes] = useState([]);

  // TODO: Implementar función para recargar superhéroes
  const handleReload = async () => {
    setIsReloading(true);
    await fetchSuperheroes();
    setIsReloading(false);
  };

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
    } catch (error) {}
  };

  useEffect(() => {
    const loadData = async () => {
      setErrorMessage("");
      await fetchProfile();
      await fetchSuperheroes();
      setIsInitialLoading(false);
    };

    loadData();
  }, []);

  if (isInitialLoading) {
    return <Loading />;
  }

  const hasSuperheroes = superheroes.length > 0;
  const displayName = userName || "Usuario";

  return (
    <div className="container mx-auto px-4 pb-8">
      <h1 className="text-4xl font-bold text-center mt-8 mb-2 text-gray-800">
        Galería de Superhéroes
      </h1>

      <p className="text-center text-lg text-gray-700 mb-4">
        ¡Bienvenido, {displayName}!
      </p>

      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <div className="flex justify-center mb-8">
        <button
          onClick={handleReload}
          disabled={isReloading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors"
        >
          Recargar
        </button>
      </div>

      {!hasSuperheroes && !errorMessage && (
        <p className="text-center text-gray-600">
          No hay superhéroes disponibles para mostrar.
        </p>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {superheroes.map((hero) => (
          <div
            key={hero.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
          >
            <img
              src={hero.image}
              alt={hero.superhero}
              className="h-64 object-cover w-full"
            />

            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {hero.superhero}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
