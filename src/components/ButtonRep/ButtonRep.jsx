import { useNavigate } from "react-router-dom";

function ButtonRep() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/form-rep"); // Redirige a la vista de FormNov
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleClick}>
        Crear Reporte.
      </button>
    </div>
  );
}

export default ButtonRep;