import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from "./pages/Admin";
import { contexto_usuario } from "./componentes/context/UsuarioContext";
import { Navigate } from "react-router-dom";

function AppRoutes() {
    const { nomeusuario } = contexto_usuario(); 

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={nomeusuario ? <Admin /> : <Navigate to="/login" />} />
        </Routes>
    )
}
export default AppRoutes;
