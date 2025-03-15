import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function Reportes() {
  console.log("Componente Reportes montado");
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}`)
      .then((response) => response.json())
      .then((data) => setReportes(data))
      .catch((error) => console.error("Error al obtener reportes:", error));
}, []);

  return (
    <div>
      <h2>Lista de Reportes</h2>
      <ul>
        {reportes.map((reporte) => (
          <li key={reporte._id}>{reporte.nombre} - {reporte.descripcion}</li>
        ))}
      </ul>
    </div>
  );
}

export default Reportes;

