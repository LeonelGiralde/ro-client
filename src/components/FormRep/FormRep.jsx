import { useState } from "react";
import "./FormRep.css";

const ubicaciones = [
  "Mar de Ajo",
  "Punta Medanos",
  "Pinamar/Villa Gesell",
  "Mar del Plata",
  "Miramar",
  "Necochea",
];

const ReporteForm = () => {
  const [fecha, setFecha] = useState("");
  const [reportes, setReportes] = useState(
    ubicaciones.reduce((acc, ubicacion) => {
      acc[ubicacion] = {
        sinReporte: false,
        mareaAlta: { horario: "", medida: "" },
        mareaBaja: { horario: "", medida: "" },
        puntuacion: 2.5,
        tempMax: "",
        tempMin: "",
        clima: "",
        tempMar: "",
        viento: { direccion: "", velocidad: "" },
        swell: "",
        ola: { altura: "", periodo: "" },
        descripcion: "",
      };
      return acc;
    }, {})
  );

  const handleChange = (ubicacion, campo, valor) => {
    setReportes((prevReportes) => ({
      ...prevReportes,
      [ubicacion]: { ...prevReportes[ubicacion], [campo]: valor },
    }));
  };

  const handleNestedChange = (ubicacion, categoria, campo, valor) => {
    setReportes((prevReportes) => ({
      ...prevReportes,
      [ubicacion]: {
        ...prevReportes[ubicacion],
        [categoria]: { ...prevReportes[ubicacion][categoria], [campo]: valor },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { fecha, reportes };
    try {
      const response = await fetch("https://ro-server-55omirja4-leonels-projects-bc6284c9.vercel.app/api/reportes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Error al enviar el reporte");
      }
      alert("Reporte enviado correctamente");
      setFecha("");
      setReportes(
        ubicaciones.reduce((acc, ubicacion) => {
          acc[ubicacion] = {
            sinReporte: false,
            mareaAlta: { horario: "", medida: "" },
            mareaBaja: { horario: "", medida: "" },
            puntuacion: 2.5,
            tempMax: "",
            tempMin: "",
            clima: "",
            tempMar: "",
            viento: { direccion: "", velocidad: "" },
            swell: "",
            ola: { altura: "", periodo: "" },
            descripcion: "",
          };
          return acc;
        }, {})
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reporte-form">
      <label>Fecha:</label>
      <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />

      {ubicaciones.map((ubicacion) => (
        <div key={ubicacion} className="card">
          <h3>{ubicacion}</h3>
          <label>
            <input
              type="checkbox"
              checked={reportes[ubicacion].sinReporte}
              onChange={(e) => handleChange(ubicacion, "sinReporte", e.target.checked)}
            />
            Sin reporte
          </label>

          {!reportes[ubicacion].sinReporte && (
            <>
              <label>Marea Alta - Horario:</label>
              <input
                type="time"
                value={reportes[ubicacion].mareaAlta.horario}
                onChange={(e) => handleNestedChange(ubicacion, "mareaAlta", "horario", e.target.value)}
              />

              <label>Marea Alta - Medida (m):</label>
              <input
                type="number"
                step="0.1"
                value={reportes[ubicacion].mareaAlta.medida}
                onChange={(e) => handleNestedChange(ubicacion, "mareaAlta", "medida", e.target.value)}
              />

              <label>Puntuación:</label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={reportes[ubicacion].puntuacion}
                onChange={(e) => handleChange(ubicacion, "puntuacion", parseFloat(e.target.value))}
              />
              <span>{reportes[ubicacion].puntuacion}</span>

              <label>Temperatura Máxima (°C):</label>
              <input type="number" value={reportes[ubicacion].tempMax} onChange={(e) => handleChange(ubicacion, "tempMax", e.target.value)} />
              
              <label>Temperatura Mínima (°C):</label>
              <input type="number" value={reportes[ubicacion].tempMin} onChange={(e) => handleChange(ubicacion, "tempMin", e.target.value)} />
              
              <label>Tipo de Clima:</label>
              <select value={reportes[ubicacion].clima} onChange={(e) => handleChange(ubicacion, "clima", e.target.value)}>
                <option value="">Seleccione</option>
                <option value="soleado">Soleado</option>
                <option value="nublado">Nublado</option>
                <option value="lluvioso">Lluvioso</option>
              </select>
              
              <label>Descripción:</label>
              <textarea value={reportes[ubicacion].descripcion} onChange={(e) => handleChange(ubicacion, "descripcion", e.target.value)} />
            </>
          )}
        </div>
      ))}

      <button type="submit">Enviar</button>
    </form>
  );
};

export default ReporteForm;
