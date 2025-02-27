import { Routes, Route } from "react-router-dom";
import ViewHome from "../Views/InicioAdmin/InicioAdmin.jsx";
import FormNov from "../Components/FormNov/FormNov.jsx";
import FormRep from "../Components/FormRep/FormRep.jsx";
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