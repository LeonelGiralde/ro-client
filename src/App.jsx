import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes"; // Asegúrate de que la ruta es correcta

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
