import { useEffect, useState } from 'react';
import axios from 'axios';

const Reportes = () => {
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportes = async () => {
        try {
            const response = await axios.get('https://ro-server-55omirja4-leonels-projects-bc6284c9.vercel.app/api/reportes');
            setReportes(response.data);  // Suponiendo que la API devuelve un array de reportes
            setLoading(false);
          } catch (error) {
            setError(`Error al cargar los reportes: ${error.message}`);
            setLoading(false);
          }
          
    };

    fetchReportes();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Reportes</h1>
      {reportes.map((reporte, index) => (
        <div key={index}>
          <h2>Fecha: {new Date(reporte.fecha).toLocaleDateString()}</h2>
          {reporte.reportes.map((detalle, idx) => (
            <div key={idx}>
              <p><strong>Ubicación:</strong> {detalle.ubicacion}</p>
              <p><strong>Descripción:</strong> {detalle.descripcion}</p>
              <p><strong>Puntuación:</strong> {detalle.puntuacion}</p>
              {/* Agrega otros campos aquí según lo necesites */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Reportes;
