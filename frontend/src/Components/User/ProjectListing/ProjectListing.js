import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Dropdown from '../../Dashboard/Dropdown/index';
import {HiDotsHorizontal} from 'react-icons/hi';
import {Link} from 'react-router-dom';
import {Button, Modal} from 'antd';
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
      &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 2px;
        background-color: #000;
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
        background-color: #000;
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
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 32px);
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
    let authToken = localStorage.getItem('auth_token')
    const [visible, setVisible] = useState(false);
    const [projects, setProjects] = useState([]);
    const [userimage, setuserimage] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/projects/`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setProjects(response.data);
        };
        fetchProjects()
    }, []);
    console.log("Projects Data:", projects)


    useEffect(() => {
        const fetchuserImage = async () => {
            const userResponse = await axios.get(`${process.env.REACT_APP_HOST}/api/auth/users/me/`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            const avatarResponse = await axios.get(`${process.env.REACT_APP_HOST}/api/avatar/all/`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            if (avatarResponse.data.user.username === userResponse.data.username) {
                setuserimage(avatarResponse.data);
            }
        };
        fetchuserImage();
    }, []);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const imagePaths = [
        `${process.env.REACT_APP_HOST}//media/default_avatars/flamingo.png`,
        `${process.env.REACT_APP_HOST}//media/default_avatars/butterfly.png`,
        `${process.env.REACT_APP_HOST}//media/default_avatars/leopard.png`,
        `${process.env.REACT_APP_HOST}//media/default_avatars/squirrel.png`,
        `${process.env.REACT_APP_HOST}//media/default_avatars/starfish.png`,

        // Add more image paths here
    ];

    function getRandomImagePath(imagePaths) {
        // Generate a random index within the range of available image paths
        const randomIndex = Math.floor(Math.random() * imagePaths.length);

        // Retrieve the randomly selected image path
        const randomImagePath = imagePaths[randomIndex];
        return randomImagePath;
    }

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
    const someData = {id: 1, name: 'John'};

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
                                                ? `${process.env.REACT_APP_HOST}${project.icon}`
                                                : getRandomImagePath(imagePaths)
                                        }
                                        alt='Project Avatar'
                                    />
                                </ProjectAvatarWrapper>
                                <ProjectName>
                                    <Link to={`/dashboard`}>{project.name}</Link>
                                </ProjectName>
                            </NameColumn>
                        </td>
                        <td>{project.key.toUpperCase()}</td>
                        {/*<td>{project.type}Team-managed software</td>*/}
                        <td>{project.project_category.project_category}</td>
                        <LeadColumn>
                            {/*<img src={userimage.image ? userimage.image : 'http://localhost:3000/Images/NoImage.jpeg'}*/}
                            {/*     alt='Lead Avatar'/>*/}
                            <p>{project.project_lead.username}</p>
                        </LeadColumn>
                        <OptionsColumns>
                            <Link to={`${project.id}/project-setting`}>
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