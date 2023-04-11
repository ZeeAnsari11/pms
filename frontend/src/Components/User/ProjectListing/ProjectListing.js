import React, {useState} from 'react';
import styled from 'styled-components';
import Dropdown from '../../Dashboard/Dropdown/index';
import {HiDotsHorizontal} from "react-icons/hi";
import {Link} from "react-router-dom";
import {Button, Modal} from 'antd';
import {GrAlert} from "react-icons/gr";

const ProjectListingTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    font-weight: bold;
    padding: 12px 8px;
    border-bottom: 2px solid #ddd;
  }

  td {
    padding: 12px 8px;
  }

  tr:not(:first-child) {
    border-top: 1px solid #ddd;
  }

  tr:hover {
    background-color: #EBECF0;
  }

  .name-column {
    display: flex;
    align-items: center;
  }

  .name-column img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
  }
  
  .option-column-align {
        margin-right: 45%;
  }

  .star-column {
    color: #ccc;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
  }

  .star-column:hover {
    color: #ffd700;
  }

  .lead-column {
    display: flex;
    align-items: center;
  }

  .lead-column img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
  }

  .options-column {
    text-align: center;
    cursor: pointer;
    justify-content: center;
  }

  .options-column:hover {
    text-decoration: underline;
  }
`;

const modalStyle = {
    borderRadius: 0,
};

const ProjectListing = () => {

    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };


    const items = [
        {
            label: <Link to="/project-setting">Project Setting</Link>,
            key: '0',
        },
        {
            label: <Link onClick={showModal}>Move to trash</Link>,
            key: '1',
        },
    ];

    const userIcon = <GrAlert/>;

    const message = `Welcome, {userIcon}!`;

    return (
        <ProjectListingTable>
            <Modal
                title={`Welcome, ${userIcon}!`}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                style={modalStyle}
            >
                <p><GrAlert/> The project along with its issues, components, attachments, and versions will be available
                    in the
                    trash for 60 days after which it will be permanently deleted.</p>
                <p>Only Jira admins can restore the project from the trash.</p>
            </Modal>
            <thead>
            <tr>
                <th><span className="star-column">★</span></th>
                <th>Name</th>
                <th>Key</th>
                <th>Type</th>
                <th>Lead</th>
                <th className="options-column"></th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td className="star-column">★</td>
                <td className="name-column">
                    <img src="https://i.pravatar.cc/300" alt="Project Avatar"/>
                    <a href="project-link">Project Name</a>
                </td>
                <td>PROJ-001</td>
                <td>Task Management</td>
                <td className="lead-column">
                    <img src="https://i.pravatar.cc/300" alt="Lead Avatar"/>
                    <a href="lead-link">Lead Name</a>
                </td>
                <td className="options-column"><Dropdown items={items} icon={<HiDotsHorizontal size={24}/>}/></td>
            </tr>
            <tr>
                <td className="star-column">★</td>
                <td className="name-column">
                    <img src="https://i.pravatar.cc/300" alt="Project Avatar"/>
                    <a href="project-link">Project Name</a>
                </td>
                <td>PROJ-002</td>
                <td>Bug Tracking</td>
                <td className="lead-column">
                    <img src="https://i.pravatar.cc/300" alt="Lead Avatar"/>
                    <a href="lead-link">Lead Name</a>
                </td>
                <td className="options-column"><Dropdown items={items} icon={<HiDotsHorizontal size={24}/>}/></td>
            </tr>
            {/* more project rows */}
            </tbody>
        </ProjectListingTable>
    );
};

export default ProjectListing;
