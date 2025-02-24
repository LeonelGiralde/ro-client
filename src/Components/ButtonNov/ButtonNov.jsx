import { useNavigate } from "react-router-dom";

function ButtonNov() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/form-nov"); // Redirige a la vista de FormNov
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleClick}>
        Crear Novedad
      </button>
    </div>
  );
}

export default ButtonNov;