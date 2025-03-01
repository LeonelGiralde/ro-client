import { useEffect, useState } from "react";
import { conexionAPI } from "../../../ConexionAPI"; // Ruta correcta

const MisReportes = () => {
  const [reportes, setReportes] = useState([]);
  const [selectedReporte, setSelectedReporte] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const datos = await conexionAPI.listaReportes(); // Usamos la función de conexionAPI
        console.log("Respuesta de la API:", datos); // Debug
        setReportes(datos);
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
      const resultado = await conexionAPI.eliminarReporte(id); // Usamos la función de eliminar

      if (resultado && resultado.message) {
        setReportes(reportes.filter((reporte) => reporte._id !== id));
        alert("Reporte eliminado con éxito");
      } else {
        throw new Error("No se pudo eliminar el reporte");
      }
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
        const resultado = await conexionAPI.actualizarReporte(
          selectedReporte._id,
          selectedReporte.reportes
        );

        if (resultado && resultado._id) {
          setReportes(
            reportes.map((r) => (r._id === selectedReporte._id ? selectedReporte : r))
          );
          setIsEditing(false);
          setNotification({ message: "Reporte editado con éxito.", type: "success" });
        } else {
          throw new Error("No se pudo actualizar el reporte");
        }
      } catch (error) {
        console.error("Error al actualizar el reporte:", error);
        alert("No se pudo actualizar el reporte.");
      }
    }
  };

  return (
    <div>
      <h1>Mis Reportes</h1>
      {reportes.map((item) => (
        <div key={item._id} className="reporte-card">
          <h2>{item.fecha}</h2>
          {item.reportes.length > 0 ? (
            item.reportes.map((reporte) => (
              <div key={reporte._id}>
                <p>Ubicación: {reporte.ubicacion}</p>
                <button onClick={() => handleViewMore(reporte)}>Ver Más</button>
                <button onClick={() => handleEdit(reporte)}>Editar</button>
                <button onClick={() => handleDelete(reporte._id)}>Eliminar</button>
              </div>
            ))
          ) : (
            <p>No hay reportes para esta fecha.</p>
          )}
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
