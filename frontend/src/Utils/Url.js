import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Components/User/Login"
import ResetPasswordPage from "../Components/User/ResetPassword/ResetPasswordPage"
import ForgotPassword from "../Components/User/ForgetPassword/ForgetPassword"
import Dashboard from "../Components/Dashboard/Dashboard/Dashboard"
import React  from 'react';

function Url() {
  return (
    <BrowserRouter>
      <Routes>
            <Route index element={<Login/>} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/rest-password" element={<ResetPasswordPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Url;
