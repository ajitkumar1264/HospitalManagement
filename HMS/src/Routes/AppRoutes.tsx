import { Route, Routes, Navigate } from "react-router-dom";

import Protected from "../pages/Protected";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/home"} />} />
      <Route path="/home" element={<Protected />} />
    </Routes>
  );
}

export default AppRoutes;
