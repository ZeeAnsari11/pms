import React, {useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import apiRequest from '../../../Utils/apiRequest';
import * as CloseProjectComponents from "./Style";
import {Modal} from 'antd';
import NavBar from "../../Dashboard/Navbar";
import ProjectSidebar from "../../Dashboard/Sidebar/ProjectSidebar";
import ToastContainer from '../../../Shared/Components/Toast'
import {displayInfoMessage} from '../../../Shared/notify'
import ErrorPage from "../../Error/ErrorPage";
import {useIsAdminOrStaffUser} from "../../../Store/Selector/Selector";

const CloseProject = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    let authToken = localStorage.getItem('auth_token');
    const IsAdminOrStaffUser = useIsAdminOrStaffUser();

    const navigate = useNavigate();
    const {projectId} = useParams();

    const deleteProject = () => {
        if (projectId !== undefined) {
            apiRequest
                .delete(`/api/projects/${projectId}`, {
                    headers: {
                        Authorization: `Token ${authToken}`
                    },
                })
                .then(response => {
                    setIsModalVisible(false);
                    displayInfoMessage('The project has been deleted. \n  You will be redirected to the project within 2 seconds');
                    setTimeout(() => {
                        navigate('/project');
                    }, 2000);
                })
                .catch(error => {
                    console.error('Error deleting data', error);
                });
        }
    }

    const handleButtonClick = () => {
        setIsModalVisible(true);
    };

    const handleModalConfirm = () => {
        deleteProject()
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    if (!IsAdminOrStaffUser) {
        return (
            <>
                <NavBar/>
                <ProjectSidebar/>
                <ErrorPage status={403}/>
            </>
        );
    }

    return (
        <>
            <ProjectSidebar/>
            <NavBar/>
            <ToastContainer/>
            <CloseProjectComponents.PermissionsContainer>

                <CloseProjectComponents.AddTagButton onClick={handleButtonClick}>Close
                    project</CloseProjectComponents.AddTagButton>
                <Modal
                    title="Confirm Closure"
                    open={isModalVisible}
                    onOk={handleModalConfirm}
                    onCancel={handleModalCancel}
                >
                    <p>Are you sure you want to close the project?</p>
                </Modal>
            </CloseProjectComponents.PermissionsContainer>
        </>
    )
        ;
};

export default CloseProject;
