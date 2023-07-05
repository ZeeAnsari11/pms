import React, { useContext, useState } from 'react';
import {useParams, useNavigate} from "react-router-dom";
import apiRequest from '../../../Utils/apiRequest';

import styled from "styled-components";
import {ToastContainer, toast} from 'react-toastify';
import {Modal} from 'antd';
import NavBar from "../../Dashboard/Navbar";
import ProjectSidebar from "../../Dashboard/Sidebar/ProjectSidebar";



const PermissionsContainer = styled.div`
  margin-left: 16%;
  margin-top: 0%;
  padding-top: 85px;
  padding-left: 80px;
  margin-right: 90px;
`;

const AddTagButton = styled.button`
  background-color: #0062FF;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-right: 310px;

  &:hover {
    background-color: #3e81ed;
  }
`;

const CloseProject = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    let authToken = localStorage.getItem('auth_token');

    const navigate = useNavigate();
    const {projectId} = useParams();


    const deleteProject = () => {
        if (projectId !== undefined) {
            apiRequest
            .delete(`/api/projects/${projectId}`, {
                headers: {
                    Authorization: `Token ${authToken}`},
            })
            .then(response => {
                setIsModalVisible(false);
                showInfoOnConfirmations();
                setTimeout(() => {
                    navigate('/project');
                    }, 2000);
            })
            .catch(error => {
                console.error('Error deleting data', error);
            });
        }
    }

    const showInfoOnConfirmations = () => {
        toast.info('The project has been deleted. \n  You will be redirected to the project within 2 seconds', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
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


    return (
        <>
            <ProjectSidebar/>
            <NavBar/>
            <PermissionsContainer>

                <AddTagButton onClick={handleButtonClick}>Close project</AddTagButton>
                <Modal
                    title="Confirm Closure"
                    open={isModalVisible}
                    onOk={handleModalConfirm}
                    onCancel={handleModalCancel}
                >
                    <p>Are you sure you want to close the project?</p>
                </Modal>
            </PermissionsContainer>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
        ;
};

export default CloseProject;
