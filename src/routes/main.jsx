// src/router.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/AuthorizationPages/Login.jsx";
import Register from "../features/AuthorizationPages/Register.jsx";
import ForgotPassword from "../features/OtpPages/ForgotPasswordOtp.jsx";
import TwoFactorAuth from "../features/OtpPages/TwoFactorAuth.jsx";
import ResetPassword from "../features/OtpPages/ResetPassword.jsx";
import Sidebar from "../common/navs/Sidebar/sidebar.jsx";


export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/two-factor-auth" element={<TwoFactorAuth />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/sidebar" element={<Sidebar />} />
    </Routes>
  );
}
