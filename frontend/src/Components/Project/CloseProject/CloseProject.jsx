import React, {useState} from 'react';
import {Modal, Button} from 'antd';
import styled from "styled-components";
import NavBar from "../../Dashboard/Navbar";
import Sidebar from '../../Project/Sidebar/index';

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

    const handleButtonClick = () => {
        setIsModalVisible(true);
    };

    const handleModalConfirm = () => {
        // Logic for closing the project goes here
        setIsModalVisible(false);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const project = {
        name: 'Project Name',
        category: 'Project Setting',
    };

    return (
        <>
            <Sidebar project={project}/>
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
        </>
    )
        ;
};

export default CloseProject;
