import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import React from 'react';
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
import GlobalIntegrations from "../Components/User/Manage/GlobalIntegrations";
import ProjectSummary from "../Components/Project/ProjectSummaryPage/ProjectSummary";
import Integrations from "../Components/Project/Integrations/Integrations";
import ProjectTag from "../Components/Project/ProjectTag/ProjectTag";
import Columns from "../Components/Project/Columns/Columns";
import Types from "../Components/Project/Types/Types";
import Permissions from "../Components/Project/Permissions/Permissions";
import CloseProject from "../Components/Project/CloseProject/CloseProject";
import AccountActivation from "../Components/User/AccountActivate/AccountActivation";
import EditTicketPage from "../Components/Dashboard/EditTicketPage/EditTicketPage";
import ErrorPage from "../Components/Error/ErrorPage";
import SessionAlertPage from "../Components/Error/SessionAlertPage";
import LandingPage from "../Components/Landingpage/Landingpage";
import AuthenticateWithGoogle from "../Components/User/Login/authenticateWithGoogle"

function PrivateRoute({element: Component, ...rest}) {
    let accessToken = localStorage.getItem('access')
    let refreshToken = localStorage.getItem('refresh')
    if (!accessToken || !refreshToken ) {
        return <SessionAlertPage hasAuthToken={true}/>
    }
    return <Component {...rest} />;
}

function Redirection({element: Component, ...rest}) {
    let accessToken = localStorage.getItem('access')
    let refreshToken = localStorage.getItem('refresh')
    if (accessToken && refreshToken) {
        return <Navigate to="/project" replace />;
    }
    return <Component {...rest} />;
}

function Url() {
    return (
        <BrowserRouter>
            <Routes>
                {/* General routes */}
                <Route exact path="/"  element={<Redirection element={LandingPage}/>}/>
                <Route path="/google" element={<AuthenticateWithGoogle/>}/>
                <Route path="/user-activate" element={<AccountActivation/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/reset-password" element={<ResetPasswordPage/>}/>

                {/* Project Manager routes */}

                <Route path="/create-project" element={<PrivateRoute element={CreateProject}/>}/>
                <Route path="/project/:projectId/setting/summary" element={<PrivateRoute element={ProjectSummary}/>}/>
                <Route path="/project/:projectId/setting/notification"
                        element={<PrivateRoute element={Notification}/>}/>
                <Route path="/project/:projectId/setting/integrations"
                        element={<PrivateRoute element={Integrations}/>}/>
                <Route path="/project/:projectId/setting/tags" element={<PrivateRoute element={ProjectTag}/>}/>
                <Route path="/project/:projectId/setting/types" element={<PrivateRoute element={Types}/>}/>
                <Route path="/project/:projectId/setting/columns" element={<PrivateRoute element={Columns}/>}/>
                <Route path="/project/:projectId/setting/permissions" element={<PrivateRoute element={Permissions}/>}/>
                <Route path="/project/:projectId/close-project" element={<PrivateRoute element={CloseProject}/>}/>

                {/* Admin (Super User) routes */}

                <Route path="/manage-account" element={<PrivateRoute element={ManageAccount}/>}/>
                <Route path="/manage-users" element={<PrivateRoute element={ManageUsers}/>}/>
                <Route path="/manage-groups" element={<PrivateRoute element={ManageGroups}/>}/>
                <Route path="/manage-general-settings" element={<PrivateRoute element={GeneralSettings}/>}/>
                <Route path="/global-integrations-setting" element={<PrivateRoute element={GlobalIntegrations}/>}/>

                {/* User Specific routes */}

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
                <Route
                    path="/project/:projectId/browse/issue/:issueId"
                    element={<PrivateRoute element={EditTicketPage}/>}
                />

                {/* Error routes */}

                <Route path="error" element={<ErrorPage status={500}/>}/>
                <Route path="forbidden" element={<ErrorPage status={403}/>}/>
                <Route path="*" element={<ErrorPage status={404}/>}/>

            </Routes>
        </BrowserRouter>
    );
}

export default Url;
