// src/router.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/AuthorizationPages/login.jsx";
import Register from "../features/AuthorizationPages/register.jsx";
import ForgotPassword from "../features/OtpPages/forgotPasswordotp.jsx";
import TwoFactorAuth from "../features/OtpPages/twoFactorauth.jsx";
import ResetPassword from "../features/OtpPages/resetPassword.jsx";
import InvoiceReport from "../features/AuthorizationPages/invoice.jsx";
import Dashboard from "../features/Dashboard/dashboard.jsx";
import Sidebar from "../common/navs/Sidebar/sidebar.jsx";
import ProfilePicture from "../features/ProfilePictureSettings/changeProfileSettings.jsx";


export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/two-factor-auth" element={<TwoFactorAuth />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/sidebar" element={<Sidebar />} />
      <Route path="/invoice" element={<InvoiceReport />} />
      <Route path="/profilepicture" element={<ProfilePicture />} />

    </Routes>
  );
}
