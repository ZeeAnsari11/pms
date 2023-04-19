import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Dropdown from '../../Dashboard/Dropdown/index';
import {HiDotsHorizontal} from 'react-icons/hi';
import {Link} from 'react-router-dom';
import {Button, Modal} from 'antd';
import {GrAlert} from 'react-icons/gr';

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

const OptionsColumn = styled.th`
  text-align: center;
  cursor: pointer;
  justify-content: center;

  &:hover {
    text-decoration: underline;
  }
`;

const modalStyle = {
    borderRadius: 0,
};


const NoProjectsMessage = styled.tr`
  text-align: center;
  font-weight: bold;

  td {
    padding: 24px 0;
  }
`;

const StarColumn = styled.span`
  color: #ccc;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #ffd700;
  }
`;

const NameColumn = styled.td`
  display: flex;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
  }
`;

const LeadColumn = styled.td`
  display: flex;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
  }
`;

const OptionsColumns = styled.td`
  text-align: center;
  cursor: pointer;
  justify-content: center;

  &:hover {
    text-decoration: underline;
  }
`;




const ProjectListing = () => {
    let authToken = sessionStorage.getItem('auth_token')
    const [visible, setVisible] = useState(false);
    const [projects, setProjects] = useState([]);


    useEffect(() => {
        const fetchProjects = async () => {
            const response = await axios.get('http://0.0.0.0:8000/api/projects/', {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setProjects(response.data);
        };

        fetchProjects();
    }, [projects]);

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
            label: <Link to='/project-setting'>Project Setting</Link>,
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: <Link onClick={showModal}>Move to trash</Link>,
            key: '1',
        },
    ];

    const userIcon = <GrAlert/>;
    const message = `Welcome, ${userIcon}!`;

    return (
        <ProjectListingTable>
            <Modal
                title={`Welcome, ${userIcon}!`}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                style={modalStyle}
            >
                <p>
                    <GrAlert/> The project along with its issues, components, attachments, and versions will be
                    available in the trash for 60 days after which it will be permanently deleted.
                </p>
                <p>Only Jira admins can restore the project from the trash.</p>
            </Modal>
            <thead>
            <tr>
                <th>
                    <StarColumn>★</StarColumn>
                </th>
                <th>Name</th>
                <th>Key</th>
                <th>Type</th>
                <th>Lead</th>
                <OptionsColumn></OptionsColumn>
            </tr>
            </thead>
            <tbody>
            {projects.length === 0 ? (
                <NoProjectsMessage>
                    <td colSpan="6">No Projects to show</td>
                </NoProjectsMessage>
            ) : (

                projects.map((project) => (
                    <tr key={project.id}>
                        <StarColumn>★</StarColumn>
                        <NameColumn>
                            <img src="https://i.pravatar.cc/300" alt="Lead Avatar"/>
                            {/*<img src={project.icon} alt='Project Avatar'/>*/}
                            {/*<img src={`http://0.0.0.0:8000/media/${project.icon}`} alt='Project Avatar'/>*/}
                            <Link to={`${project.id}/${project.name}`}>{project.name}</Link>
                        </NameColumn>
                        <td>{project.key}</td>
                        {/*<td>{project.type}Team-managed software</td>*/}
                        <td>{project.project_category.project_category}</td>
                        <LeadColumn>
                            <img src="https://i.pravatar.cc/300" alt="Lead Avatar"/>
                            {/*<img src={project.leadAvatarUrl} alt='Lead Avatar'/>*/}
                            <p>{project.project_lead.username}</p>
                        </LeadColumn>
                        <OptionsColumns>
                            <Dropdown items={items} icon={<HiDotsHorizontal size={24}/>}/>
                        </OptionsColumns>
                    </tr>
                ))
            )}
            </tbody>
        </ProjectListingTable>
    );
};

export default ProjectListing;