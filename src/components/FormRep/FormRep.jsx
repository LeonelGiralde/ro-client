import { useState } from 'react';

const ubicaciones = [
  'Mar de Ajo',
  'Punta Medanos',
  'Pinamar/Villa Gesell',
  'Mar del Plata',
  'Miramar',
  'Necochea',
];

function FormReporte() {
  const [fecha, setFecha] = useState('');
  const [reportes, setReportes] = useState(
    ubicaciones.reduce((acc, ubicacion) => {
      acc[ubicacion] = {
        mareaAlta: { horario: '', medida: '' },
        mareaBaja: { horario: '', medida: '' },
        puntacion: 0,
        tempMax: '',
        tempMin: '',
        clima: '',
        tempMar: '',
        dirViento: '',
        velocidadViento: '',
        dirSwell: '',
        olaPeriodo: { altura: '', segundos: '' },
        descripcion: '',
        noReporte: false, // Nueva propiedad para controlar el estado de N/R
      };
      return acc;
    }, {})
  );

  const handleChange = (ubicacion, field, value) => {
    setReportes((prev) => ({
      ...prev,
      [ubicacion]: {
        ...prev[ubicacion],
        [field]: value,
      },
    }));
  };

  const handleNoReporteChange = (ubicacion) => {
    setReportes((prev) => ({
      ...prev,
      [ubicacion]: {
        ...prev[ubicacion],
        noReporte: !prev[ubicacion].noReporte,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Prepara los datos para enviar
    const reportData = {
      fecha,
      reportes: Object.keys(reportes).map((ubicacion) => ({
        ubicacion,
        ...reportes[ubicacion], // Esto incluye todos los campos, incluyendo noReporte
      })),
    };
  
    // Envía el reporte al backend
    try {
      const response = await fetch('https://ro-server-cwg22ekqg-leonels-projects-bc6284c9.vercel.app/api/reportes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData), // Enviar la estructura modificada
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Maneja la respuesta según sea necesario
        // Aquí podrías agregar lógica adicional, como limpiar el formulario o mostrar un mensaje de éxito
        setFecha(''); // Reinicia el campo de fecha
        setReportes(ubicaciones.reduce((acc, ubicacion) => {
          acc[ubicacion] = {
            mareaAlta: { horario: '', medida: '' },
            mareaBaja: { horario: '', medida: '' },
            puntacion: 0,
            tempMax: '',
            tempMin: '',
            clima: '',
            tempMar: '',
            dirViento: '',
            velocidadViento: '',
            dirSwell: '',
            olaPeriodo: { altura: '', segundos: '' },
            descripcion: '',
            noReporte: false, // Reinicia la propiedad noReporte
          };
          return acc;
        }, {}));
      } else {
        console.error('Error al enviar el reporte');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Fecha:</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
      </div>
      {ubicaciones.map((ubicacion) => (
        <div key={ubicacion} className="card">
          <h3>{ubicacion}</h3>
          <div>
            <label>
              <input
                type="checkbox"
                checked={reportes[ubicacion].noReporte}
                onChange={() => handleNoReporteChange(ubicacion)}
              />
              No Reporte (N/R)
            </label>
          </div>
          {!reportes[ubicacion].noReporte && (
            <>
              <div>
                <label>Marea Alta - Horario:</label>
                <input
                  type="time"
                  value={reportes[ubicacion].mareaAlta.horario}
                  onChange={(e) =>
                    handleChange(ubicacion, 'mareaAlta', {
                      ...reportes[ubicacion].mareaAlta,
                      horario: e.target.value,
                    })
                  }
                  required
                />
                <label>Marea Alta - Medida:</label>
                <input
                  type="number"
                  value={reportes[ubicacion].mareaAlta.medida}
                  onChange={(e) =>
                    handleChange(ubicacion, 'mareaAlta', {
                      ...reportes[ubicacion].mareaAlta,
                      medida: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label>Marea Baja - Horario:</label>
                <input
                  type="time"
                  value={reportes[ubicacion].mareaBaja.horario}
                  onChange={(e) =>
                    handleChange(ubicacion, 'mareaBaja', {
                      ...reportes[ubicacion].mareaBaja,
                      horario: e.target.value,
                    })
                  }
                  required
                />
                <label>Marea Baja - Medida:</label>
                <input
                  type="number"
                  value={reportes[ubicacion].mareaBaja.medida}
                  onChange={(e) =>
                    handleChange(ubicacion, 'mareaBaja', {
                      ...reportes[ubicacion].mareaBaja,
                      medida: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label>Puntuación:</label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={reportes[ubicacion].puntacion}
                  onChange={(e) =>
                    handleChange(ubicacion, 'puntacion', parseFloat(e.target.value))
                  }
                />
                <span>{reportes[ubicacion].puntacion}</span>
              </div>
              <div>
                <label>Temperatura Máxima:</label>
                <input
                  type="number"
                  value={reportes[ubicacion].tempMax}
                  onChange={(e) =>
                    handleChange(ubicacion, 'tempMax', e.target.value)
                  }
                  required
                />
                <label>Temperatura Mínima:</label>
                <input
                  type="number"
                  value={reportes[ubicacion].tempMin}
                  onChange={(e) =>
                    handleChange(ubicacion, 'tempMin', e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <label>Clima:</label>
                <select
                  value={reportes[ubicacion].clima}
                  onChange={(e) => handleChange(ubicacion, 'clima', e.target.value)}
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="soleado">Soleado</option>
                  <option value="nublado">Nublado</option>
                  <option value="parcialmente nublado">Parcialmente nublado</option>
                  {/* Agrega más opciones si es necesario */}
                </select>
              </div>
              <div>
                <label>Temperatura del Mar:</label>
                <input
                  type="number"
                  value={reportes[ubicacion].tempMar}
                  onChange={(e) =>
                    handleChange(ubicacion, 'tempMar', e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <label>Dirección del Viento:</label>
                <input
                  type="text"
                  value={reportes[ubicacion].dirViento}
                  onChange={(e) =>
                    handleChange(ubicacion, 'dirViento', e.target.value)
                  }
                  required
                />
                <label>Velocidad del Viento (km/h):</label>
                <input
                  type="number"
                  value={reportes[ubicacion].velocidadViento}
                  onChange={(e) =>
                    handleChange(ubicacion, 'velocidadViento', e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <label>Dirección Swell:</label>
                <input
                  type="text"
                  value={reportes[ubicacion].dirSwell}
                  onChange={(e) =>
                    handleChange(ubicacion, 'dirSwell', e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <label>Ola - Altura:</label>
                <input
                  type="number"
                  value={reportes[ubicacion].olaPeriodo.altura}
                  onChange={(e) =>
                    handleChange(ubicacion, 'olaPeriodo', {
                      ...reportes[ubicacion].olaPeriodo,
                      altura: e.target.value,
                    })
                  }
                  required
                />
                <label>Ola - Periodo (segundos):</label>
                <input
                  type="number"
                  value={reportes[ubicacion].olaPeriodo.segundos}
                  onChange={(e) =>
                    handleChange(ubicacion, 'olaPeriodo', {
                      ...reportes[ubicacion].olaPeriodo,
                      segundos: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label>Descripción:</label>
                <textarea
                  value={reportes[ubicacion].descripcion}
                  onChange={(e) =>
                    handleChange(ubicacion, 'descripcion', e.target.value)
                  }
                  required
                />
              </div>
            </>
          )}
        </div>
      ))}
      <button type="submit">Enviar Reportes</button>
    </form>
  );
}

export default FormReporte;
