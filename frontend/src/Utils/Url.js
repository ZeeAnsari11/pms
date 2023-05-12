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
import ManageAccount from "../Components/User/ManageAccount/ManageAccount";
import PersonalSettingsPage from "../Components/User/PersonalSettingPage/PersonalSettingsPage";
import ProjectSummary from "../Components/Project/ProjectSummaryPage/ProjectSummary";
import Notification from "../Components/Project/Notification/Notification";
import Integrations from "../Components/Project/Integrations/Integrations";
import ProjectTag from "../Components/Project/ProjectTag/ProjectTag";
function Url() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/reset-password" element={<ResetPasswordPage/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/profile" element={<UserProfilePage/>}/>
                <Route path="/project-views" element={<ProjectsPage/>}/>
                <Route path="/project-setting" element={<ProjectSettingPage/>}/>
                <Route path="/create-project" element={<CreateProject/>}/>
                <Route path="/personal-settings" element={<PersonalSettingsPage/>}/>
                <Route path="/manage-account" element={<ManageAccount />} />
                <Route path="/project-summary" element={<ProjectSummary />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/integrations" element={<Integrations />} />
                <Route path="/project-tags" element={<ProjectTag />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Url;
