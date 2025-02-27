import { useState } from "react";
import PropTypes from "prop-types";
import "./ReporteForm.css";

const ReporteForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fecha: "",
    ubicacion: "",
    viento: "",
    periodo: "",
    tamano: "",
    coeficiente: "",
    pleamar: "",
    bajamar: "",
    horario: "",
    direccionViento: "",
    direccionOleaje: "",
    comentario: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="reporte-form">
      <label>Fecha:</label>
      <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
      
      <label>Ubicación:</label>
      <select name="ubicacion" value={formData.ubicacion} onChange={handleChange} required>
        <option value="">Seleccione una opción</option>
        <option value="Mar de Ajo">Mar de Ajo</option>
        <option value="Punta Medanos">Punta Médanos</option>
        <option value="Pinamar/Villagesell">Pinamar/Villagesell</option>
        <option value="Mar del Plata">Mar del Plata</option>
        <option value="Miramar">Miramar</option>
        <option value="Necochea">Necochea</option>
      </select>
      
      <label>Viento (Km/h):</label>
      <input type="number" name="viento" value={formData.viento} onChange={handleChange} required />
      
      <label>Periodo (s):</label>
      <input type="number" name="periodo" value={formData.periodo} onChange={handleChange} required />
      
      <label>Tamaño (m):</label>
      <input type="number" name="tamano" value={formData.tamano} onChange={handleChange} required />
      
      <label>Coeficiente:</label>
      <input type="number" name="coeficiente" value={formData.coeficiente} onChange={handleChange} required />
      
      <label>Pleamar:</label>
      <input type="time" name="pleamar" value={formData.pleamar} onChange={handleChange} required />
      
      <label>Bajamar:</label>
      <input type="time" name="bajamar" value={formData.bajamar} onChange={handleChange} required />
      
      <label>Horario:</label>
      <input type="time" name="horario" value={formData.horario} onChange={handleChange} required />
      
      <label>Dirección del Viento:</label>
      <input type="text" name="direccionViento" value={formData.direccionViento} onChange={handleChange} required />
      
      <label>Dirección del Oleaje:</label>
      <input type="text" name="direccionOleaje" value={formData.direccionOleaje} onChange={handleChange} required />
      
      <label>Comentario:</label>
      <textarea name="comentario" value={formData.comentario} onChange={handleChange}></textarea>
      
      <button type="submit">Enviar</button>
    </form>
  );
};

ReporteForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ReporteForm;
