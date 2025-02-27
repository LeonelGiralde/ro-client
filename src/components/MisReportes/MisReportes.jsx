import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://ro-server.vercel.app/api/reportes";

const MisReportes = () => {
  const [reportes, setReportes] = useState([]);
  const [selectedReporte, setSelectedReporte] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const response = await axios.get(BASE_URL);
        setReportes(response.data);
      } catch (error) {
        console.error("Error al obtener los reportes:", error);
        alert("No se pudieron obtener los reportes. Intenta más tarde.");
      }
    };
    fetchReportes();
  }, []);

  const handleViewMore = (reporte) => {
    setSelectedReporte(reporte);
    setIsEditing(false);
  };

  const handleEdit = (reporte) => {
    if (window.confirm("¿Estás seguro de que deseas editar este reporte?")) {
      setSelectedReporte(reporte);
      setIsEditing(true);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este reporte?")) return;

    try {
      const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error("No se pudo eliminar el reporte");
      }

      setReportes(reportes.filter((reporte) => reporte._id !== id));
      alert("Reporte eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("No se pudo eliminar el reporte.");
    }
  };

  const handleChange = (e) => {
    setSelectedReporte({ ...selectedReporte, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (window.confirm("¿Estás seguro de que deseas guardar los cambios?")) {
      try {
        await axios.put(`${BASE_URL}/${selectedReporte._id}`, selectedReporte);

        setReportes(
          reportes.map((r) =>
            r._id === selectedReporte._id ? selectedReporte : r
          )
        );
        setIsEditing(false);
        setNotification({ message: "Reporte editado con éxito.", type: "success" });
      } catch (error) {
        console.error("Error al actualizar el reporte:", error);
        alert("No se pudo actualizar el reporte.");
      }
    }
  };

  return (
    <div>
      <h1>Mis Reportes</h1>
      {reportes.map((reporte) => (
        <div key={reporte._id} className="reporte-card">
          <h2>{reporte.fecha}</h2>
          <button onClick={() => handleViewMore(reporte)}>Ver Más</button>
          <button onClick={() => handleEdit(reporte)}>Editar</button>
          <button onClick={() => handleDelete(reporte._id)}>Eliminar</button>
        </div>
      ))}

      {selectedReporte && (
        <div className="modal">
          <h2>{isEditing ? "Editar Reporte" : "Detalles del Reporte"}</h2>
          <label>Fecha:</label>
          <input
            type="text"
            name="fecha"
            value={selectedReporte.fecha}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <label>Contenido:</label>
          <textarea
            name="contenido"
            value={selectedReporte.contenido}
            onChange={handleChange}
            disabled={!isEditing}
          />
          {isEditing ? (
            <button onClick={handleUpdate}>Guardar</button>
          ) : (
            <button onClick={() => setSelectedReporte(null)}>Cerrar</button>
          )}
        </div>
      )}

      {notification && (
        <div className={`notification ${notification.type}`}>
          <p>{notification.message}</p>
          <button onClick={() => setNotification(null)}>Volver al menú principal</button>
        </div>
      )}
    </div>
  );
};

export default MisReportes;
