import { useState } from 'react';

function FormNov() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [media, setMedia] = useState(null);
  
  // Obtener la fecha actual en formato 'YYYY-MM-DD' para Argentina
  const getCurrentDateInArgentina = () => {
    const now = new Date();
    const utcOffset = -3; // UTC-3 para Argentina
    const localDate = new Date(now.getTime() + (utcOffset * 60 * 60 * 1000));
    
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0'); // +1 porque los meses empiezan desde 0
    const day = String(localDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
  };

  const [date, setDate] = useState(getCurrentDateInArgentina()); // Establecer la fecha por defecto

  const handleMediaChange = (event) => {
    setMedia(event.target.files[0]); // Obtener el archivo subido
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Aquí puedes manejar el envío del formulario
    console.log("Título:", title);
    console.log("Texto:", text);
    console.log("Archivo:", media);
    console.log("Fecha:", date);

    // Resetear el formulario
    setTitle('');
    setText('');
    setMedia(null);
    setDate(getCurrentDateInArgentina()); // Resetear la fecha
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="text">Texto:</label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="date">Fecha:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="media">Subir imagen o video:</label>
        <input
          type="file"
          id="media"
          onChange={handleMediaChange}
          accept="image/*,video/*" // Acepta imágenes y videos
          required
        />
      </div>

    

      <button type="submit">Enviar</button>
    </form>
  );
}

export default FormNov;
