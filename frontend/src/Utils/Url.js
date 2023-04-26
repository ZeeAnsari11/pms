import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Components/User/Login"
import ResetPasswordPage from "../Components/User/ResetPassword/ResetPasswordPage"
import ForgotPassword from "../Components/User/ForgetPassword/ForgetPassword"
import Dashboard from "../Components/Dashboard/Dashboard/Dashboard"
import React  from 'react';
import UserProfilePage from "../Components/User/UserProfilePage/UserProfilePage";
import ProjectsPage from "../Components/User/ProjectViews/ProjectViews";
import ProjectSettingPage from "../Components/User/ProjectSettingPage/ProjectSettingPage";
import CreateProject from "../Components/User/CreateNewProjectPage/CreateProjectPage";

function Url() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/rest-password" element={<ResetPasswordPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/project-views" element={<ProjectsPage />} />
                <Route path="/project-setting" element={<ProjectSettingPage />} />
                <Route path="/create-project" element={<CreateProject />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Url;
