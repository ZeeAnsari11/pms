import Login from "../Components/User/Login"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import React from 'react';
import ResetPasswordPage from "../Components/User/ResetPassword/ResetPasswordPage"
import ForgotPassword from "../Components/User/ForgetPassword/ForgetPassword"
import Dashboard from "../Components/Dashboard/Dashboard/Dashboard"
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
import Columns from "../Components/Project/Columns/columns";
import Permissions from "../Components/Project/Permissions/Permissions";
import CloseProject from "../Components/Project/CloseProject/CloseProject";
import AccountActivation from "../Components/User/AccountActivate/AccountActivation";

// Custom Route component for authentication check
function PrivateRoute({ element: Component, ...rest }) {
  const authToken = localStorage.getItem("auth_token");

  // Redirect to login if auth token is not present
  if (!authToken) {
    return <Navigate to="/" />;
  }

  // Render the component if the user is logged in
  return <Component {...rest} />;
}

function Url() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Private routes */}
        <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
        <Route path="/profile" element={<PrivateRoute element={UserProfilePage} />} />
        <Route path="/project-views" element={<PrivateRoute element={ProjectsPage} />} />
        <Route
          path="/project-views/:projectId/project-setting"
          element={<PrivateRoute element={ProjectSettingPage} />}
        />
        <Route path="/project-setting" element={<PrivateRoute element={ProjectSettingPage} />} />
        <Route path="/create-project" element={<PrivateRoute element={CreateProject} />} />
        <Route path="/personal-settings" element={<PrivateRoute element={PersonalSettingsPage} />} />
        <Route path="/manage-account" element={<PrivateRoute element={ManageAccount} />} />
        <Route path="/project-summary" element={<PrivateRoute element={ProjectSummary} />} />
        <Route path="/notification" element={<PrivateRoute element={Notification} />} />
        <Route path="/integrations" element={<PrivateRoute element={Integrations} />} />
        <Route path="/project-tags" element={<PrivateRoute element={ProjectTag} />} />
        <Route path="/project-columns" element={<PrivateRoute element={Columns} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Url;
