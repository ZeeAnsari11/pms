import React, {useState, useEffect} from 'react';
import apiRequest from '../../../Utils/apiRequest';
import * as ProjectListingComponents from './Style';
import {Link} from 'react-router-dom';
import {Modal} from 'antd';
import {GrAlert} from 'react-icons/gr';
import {CiSettings} from 'react-icons/ci'
import ProjectSettingPage from "../ProjectSettingPage/ProjectSettingPage";

const ProjectListing = () => {
    const [visible, setVisible] = useState(false);
    const [projects, setProjects] = useState([]);
    let authToken = localStorage.getItem('auth_token')

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await apiRequest
                .get(`/api/projects/`, {
                    headers: {
                        Authorization: `Token ${authToken}`,
                    },
                });
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
        <ProjectListingComponents.ProjectListingTable>
            <Modal
                title={`Welcome, ${userIcon}!`}
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                style={ProjectListingComponents.modalStyle}
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
                    <ProjectListingComponents.StarColumn>★</ProjectListingComponents.StarColumn>
                </th>
                <th>Name</th>
                <th>Key</th>
                <th>Type</th>
                <th>Lead</th>
                <ProjectListingComponents.OptionsColumn></ProjectListingComponents.OptionsColumn>
            </tr>
            </thead>
            <tbody>
            {projects.length === 0 ? (
                <ProjectListingComponents.NoProjectsMessage>
                    <td colSpan="6">No Projects to show</td>
                </ProjectListingComponents.NoProjectsMessage>
            ) : (

                projects.map((project) => (
                    <tr key={project.id}>

                        <ProjectListingComponents.StarSelect>
                            <ProjectListingComponents.StarColumn>★</ProjectListingComponents.StarColumn>
                        </ProjectListingComponents.StarSelect>
                        <td>
                            <ProjectListingComponents.NameColumn>
                                <ProjectListingComponents.ProjectAvatarWrapper>
                                    <ProjectListingComponents.ProjectAvatar
                                        src={
                                            project.icon
                                                ? `${process.env.REACT_APP_HOST}/${project.icon}`
                                                : `${process.env.REACT_APP_HOST}/Images/NoImage.jpeg`
                                        }
                                        alt='Project Avatar'
                                    />
                                </ProjectListingComponents.ProjectAvatarWrapper>
                                <ProjectListingComponents.ProjectName>
                                    <Link to={`/project/${project.id}/dashboard`}>{project.name}</Link>
                                </ProjectListingComponents.ProjectName>
                            </ProjectListingComponents.NameColumn>
                        </td>
                        <td>{project.key.toUpperCase()}</td>
                        <td>{project.category?.category}</td>
                        <ProjectListingComponents.LeadColumn>
                            <p>{project.project_lead.username}</p>
                        </ProjectListingComponents.LeadColumn>
                        <ProjectListingComponents.OptionsColumns>
                            <Link to={`/project/${project.id}/project-setting`}>
                                {project && (
                                    <CiSettings size={24} component={<ProjectSettingPage/>}/>
                                )}
                            </Link>
                        </ProjectListingComponents.OptionsColumns>
                    </tr>
                ))
            )}
            </tbody>
        </ProjectListingComponents.ProjectListingTable>
    );
};

export default ProjectListing;