import { useEffect, useState } from "react";
import { conexionAPI } from "../../ConexionAPI";

const MisReportes = () => {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const data = await conexionAPI.listaReportes();
        setReportes(data);
      } catch (error) {
        console.error("Error al obtener los reportes:", error);
        alert("No se pudieron obtener los reportes. Intenta más tarde.");
      }
    };
    fetchReportes();
  }, []);

  return (
    <div>
      <h1>Mis Reportes</h1>
      <ul>
        {reportes.map((reporte) => (
          <li key={reporte.fecha}>{reporte.fecha}</li>
        ))}
      </ul>
    </div>
  );
};

export default MisReportes;
