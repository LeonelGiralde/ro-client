import { useEffect, useState } from "react";

const Reportes = () => {
  const [reportes, setReportes] = useState([]);  // Estado para almacenar reportes
  const [error, setError] = useState(null);      // Estado para errores

  useEffect(() => {
    fetch("https://ro-server-55omirja4-leonels-projects-bc6284c9.vercel.app/api/reportes", {
      method: "GET", // Aseguramos que sea GET
      headers: {
        "Content-Type": "application/json", // Cabecera de tipo de contenido
      },
      mode: "cors", // Asegura que la petición se haga con CORS
    })
      .then(response => {
        if (!response.ok) { // Si la respuesta no es correcta, se lanza un error
          throw new Error("Network response was not ok");
        }
        return response.json(); // Convertir respuesta a JSON
      })
      .then(data => setReportes(data))   // Guardar reportes en el estado
      .catch(err => setError(err.message)); // Manejo de errores
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Reportes</h1>
      {reportes.length > 0 ? (
        reportes.map((reporte, index) => (
          <div key={index}>
            <h2>Fecha: {reporte.fecha}</h2>
          </div>
        ))
      ) : (
        <p>No hay reportes disponibles.</p>
      )}
    </div>
  );
};

export default Reportes;
