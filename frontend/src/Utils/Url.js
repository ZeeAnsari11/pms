import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import React from 'react';
import Login from "../Components/User/Login"
import ResetPasswordPage from "../Components/User/ResetPassword/ResetPasswordPage"
import ForgotPassword from "../Components/User/ForgetPassword/ForgetPassword"
import Dashboard from "../Components/Dashboard/Dashboard/Dashboard"
import UserProfilePage from "../Components/User/UserProfilePage/UserProfilePage";
import ProjectsPage from "../Components/User/ProjectViews/ProjectViews";
import ProjectSettingPage from "../Components/User/ProjectSettingPage/ProjectSettingPage";
import CreateProject from "../Components/User/CreateNewProjectPage/CreateProjectPage";
import ManageAccount from "../Components/User/Manage/ManageAccount";
import ManageUsers from "../Components/User/Manage/ManageUsers";
import ManageGroups from "../Components/User/Manage/ManageGroups";
import GeneralSettings from "../Components/User/Manage/GeneralSettings";
import ProjectSummary from "../Components/Project/ProjectSummaryPage/ProjectSummary";
import Notification from "../Components/Project/Notification/Notification";
import Integrations from "../Components/Project/Integrations/Integrations";
import ProjectTag from "../Components/Project/ProjectTag/ProjectTag";
import Columns from "../Components/Project/Columns/Columns";
import Types from "../Components/Project/Types/Types";
import Permissions from "../Components/Project/Permissions/Permissions";
import CloseProject from "../Components/Project/CloseProject/CloseProject";
import AccountActivation from "../Components/User/AccountActivate/AccountActivation";

// Custom Route component for authentication check
function PrivateRoute({element: Component, ...rest}) {
    let authToken = localStorage.getItem('auth_token')

    if (!authToken) {
        return <Navigate to="/"/>;
    }

    // Render the component if the user is logged in
    return <Component {...rest} />;
}

function Url() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/reset-password" element={<ResetPasswordPage/>}/>
                <Route index element={<Login/>}/>
                {/* Private routes */}PersonalSettingsPage
                <Route path="/dashboard" element={<PrivateRoute element={Dashboard}/>}/>
                <Route path="/profile" element={<PrivateRoute element={UserProfilePage}/>}/>
                <Route path="/project" element={<PrivateRoute element={ProjectsPage}/>}/>
                <Route
                    path="/project/:projectId/project-setting"
                    element={<PrivateRoute element={ProjectSettingPage}/>}
                />
                <Route
                    path="/project/:projectId/dashboard"
                    element={<PrivateRoute element={Dashboard}/>}
                />
                <Route path="/project-setting" element={<ProjectSettingPage/>}/>
                <Route path="/create-project" element={<CreateProject/>}/>
                <Route path="/manage-account" element={<ManageAccount/>}/>
                <Route path="/manage-users" element={<ManageUsers/>}/>
                <Route path="/manage-groups" element={<ManageGroups/>}/>
                <Route path="/manage-general-settings" element={<GeneralSettings/>}/>
                <Route path="/project/:projectId/setting/summary" element={<ProjectSummary/>}/>
                <Route path="/project/:projectId/setting/notification" element={<Notification/>}/>
                <Route path="/project/:projectId/setting/integrations" element={<Integrations/>}/>
                <Route path="/project/:projectId/setting/tags" element={<ProjectTag/>}/>
                <Route path="/project/:projectId/setting/types" element={<Types/>}/>
                <Route path="/project/:projectId/setting/columns" element={<Columns/>}/>
                <Route path="/project/:projectId/setting/permissions" element={<Permissions/>}/>
                <Route path="/project/:projectId/close-project" element={<CloseProject/>}/>
                <Route path="/user-activate" element={<AccountActivation/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Url;
