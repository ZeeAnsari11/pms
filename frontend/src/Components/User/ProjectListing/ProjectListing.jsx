import React, { useState, useEffect, useContext } from 'react';
import apiRequest from '../../../Utils/apiRequest';
import { AuthContext } from '../../../Utils/AuthContext';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {Modal} from 'antd';
import {GrAlert} from 'react-icons/gr';
import {CiSettings} from 'react-icons/ci'
import ProjectSettingPage from "../ProjectSettingPage/ProjectSettingPage";

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


const NameColumn = styled.td`
  display: flex;
  align-items: center;

  a {
    color: #000;
    text-decoration: none;
    position: relative;

    &:hover {
      color: #1E64D1;
      text-decoration: underline;

      &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 2px;
        background-color: #1E64D1;
        transition: transform 0.2s ease-in-out;
        transform: scaleX(0);
        transform-origin: left;
      }

      &:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 2px;
        background-color: #1E64D1;
        transform: scaleX(1);
        transform-origin: right;
        transition: transform 0.2s ease-in-out;
      }
    }
  }

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
  }

  span {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100% - 32px);
  }
`;



const ProjectAvatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
`;

const ProjectName = styled.span`
`;


const ProjectAvatarWrapper = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 8px;
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
  margin-right: 5px;
  color: #ccc;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #ffd700;
  }
`;
const StarSelect = styled.td`
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
    const [visible, setVisible] = useState(false);
    const [projects, setProjects] = useState([]);

    const { authToken } = useContext(AuthContext);

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await apiRequest
                .get(`/api/projects/`, {
                    headers: {
                        Authorization: `Token ${authToken}`,
                    },
                } );
                setProjects(response.data);
        };
        fetchProjects()
    }, []);
    console.log("Projects Data:", projects)


    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };



    const userIcon = <GrAlert/>;

    return (
        <ProjectListingTable>
            <Modal
                title={`Welcome, ${userIcon}!`}
                open={visible}
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

                        <StarSelect>
                            <StarColumn>★</StarColumn>
                        </StarSelect>
                        <td>
                            <NameColumn>
                                <ProjectAvatarWrapper>
                                    <ProjectAvatar
                                        src={
                                            project.icon
                                                ? `${process.env.REACT_APP_HOST}/${project.icon}`
                                                : `${process.env.REACT_APP_HOST}/Images/NoImage.jpeg`
                                        }
                                        alt='Project Avatar'
                                    />
                                </ProjectAvatarWrapper>
                                <ProjectName>
                                    <Link to={`/project/${project.id}/dashboard`}>{project.name}</Link>
                                </ProjectName>
                            </NameColumn>
                        </td>
                        <td>{project.key.toUpperCase()}</td>
                        <td>{project.category?.category}</td>
                        <LeadColumn>
                            <p>{project.project_lead.username}</p>
                        </LeadColumn>
                        <OptionsColumns>
                            <Link to={`/project/${project.id}/project-setting`}>
                                {project && (
                                    <CiSettings size={24} component={<ProjectSettingPage/>}/>
                                )}
                            </Link>
                        </OptionsColumns>


                    </tr>
                ))
            )}
            </tbody>
        </ProjectListingTable>
    );
};

export default ProjectListing;