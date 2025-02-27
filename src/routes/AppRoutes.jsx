import { Routes, Route } from "react-router-dom";
import ViewHome from "../views/InicioAdmin/InicioAdmin.jsx";
import FormNov from "../components/FormNov/FormNov.jsx";
import FormRep from "../components/FormRep/FormRep.jsx";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ViewHome />} />
      <Route path="/form-nov" element={<FormNov />} />
      <Route path="/form-rep" element={<FormRep />} />
    </Routes>
  );
}

export default AppRoutes;