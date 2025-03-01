const BASE_URL = "https://ro-server-55omirja4-leonels-projects-bc6284c9.vercel.app/api/reportes";

// Obtener todos los reportes
async function listaReportes() {
    const conexion = await fetch(BASE_URL);
    return await conexion.json();
}

// Obtener un reporte por fecha
async function obtenerReportePorFecha(fecha) {
    const conexion = await fetch(`${BASE_URL}/${fecha}`);
    return await conexion.json();
}

// Enviar un nuevo reporte
async function enviarReporte(fecha, reportes) {
    const conexion = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fecha, reportes })
    });
    return await conexion.json();
}

// Actualizar un reporte por fecha
async function actualizarReporte(fecha, reportes) {
    const conexion = await fetch(`${BASE_URL}/${fecha}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportes })
    });
    return await conexion.json();
}

// Eliminar un reporte por fecha
async function eliminarReporte(fecha) {
    const conexion = await fetch(`${BASE_URL}/${fecha}`, {
        method: "DELETE"
    });
    return await conexion.json();
}

// Exportar las funciones en un objeto
export const conexionAPI = {
    listaReportes,
    obtenerReportePorFecha,
    enviarReporte,
    actualizarReporte,
    eliminarReporte
};
