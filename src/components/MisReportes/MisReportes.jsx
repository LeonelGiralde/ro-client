import { useEffect, useState } from "react";

const Reportes = () => {
  const [reportes, setReportes] = useState([]);  // Estado para almacenar reportes
  const [error, setError] = useState(null);      // Estado para errores

  useEffect(() => {
    fetch("https://ro-server-55omirja4-leonels-projects-bc6284c9.vercel.app")
      .then(response => response.json()) // Convertir respuesta a JSON
      .then(data => setReportes(data))   // Guardar reportes en el estado
      .catch(err => setError(err.message)); // Manejo de errores
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Reportes</h1>
      {reportes.map((reporte, index) => (
        <div key={index}>
          <h2>Fecha: {reporte.fecha}</h2>
        </div>
      ))}
    </div>
  );
};

export default Reportes;
