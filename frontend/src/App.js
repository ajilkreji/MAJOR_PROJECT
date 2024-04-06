import React from "react";
import Admin from "./pages/admin/Admin";
import AdminLogin from "./pages/admin/Login";
import InstitutionLogin from "./pages/institution/InstitutionLogin";
import Institution from "./pages/institution/Institution";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/Authcontext";
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/admin" element={<Admin/>}/>
      <Route path="/admin/login" element={<AdminLogin />}/>
        <Route path="/institutions/login" element={<InstitutionLogin />} />
        <Route path="/institutions" element={<Institution />} />
        <Route path="/" element={<Institution />} />
      </Routes>
    </AuthProvider>
  );
}
