import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import Protected from "../pages/Protected";

function AppRoutes() {
  const auth = useAuth();
  
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={"/home"} />}
      />
      <Route path="/home" element={<Protected />} />
    </Routes>
  );
}

export default AppRoutes;
