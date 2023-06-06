import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {NavLink, useLocation, useParams} from 'react-router-dom';
import {ProjectCategoryCopy} from './constants/projects';
import Icon from './components/Icon/index';
import ProjectAvatar from './components/ProjectAvatar'

import {
    Sidebar,
    ProjectInfo,
    ProjectTexts,
    ProjectName,
    ProjectCategory,
    Divider,
    LinkItem,
    LinkText,
    NotImplemented,
} from './Styles';
import axios from "axios";


const ProjectSidebar = () => {
    const match = useLocation();
    const {projectId} = useParams()

    let authToken = localStorage.getItem('auth_token')
    const [projectData, setProjectData] = useState({});
    const [icon, setIcon] = useState(null);

    const defaultIconPath = "Images/NoImage.jpeg"

    let IconPath = projectData.icon
    if (IconPath != null) {
        IconPath = `${process.env.REACT_APP_HOST}/${icon}`
    } else {
        IconPath = 'http://localhost:3000/Images/NoImage.jpeg'
    }
    const [name, setName] = useState(''); // Set initial value from project object
    const [key, setKey] = useState(''); // Set initial value from project object
    const [projectCategory, setProjectCategory] = useState(''); // Set initial value from project object

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/projects/${projectId}`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setProjectData(response.data);

        };

        fetchProjects();
    }, []);

    useEffect(() => {
        if (projectData.icon != null) {
            setIcon(projectData.icon)
        }

        if (projectData.icon == null) {
            setIcon(defaultIconPath)
        }
    }, [projectData]);

    useEffect(() => {
        if (projectData.name) {
            setName(projectData.name);
            setKey(projectData.key);
            setProjectCategory(projectData.category)
        }
    }, [projectData]);

    const project = {
        name: name,
        category: projectCategory?.category,
        icon: IconPath
    }


    return (
        <Sidebar>
            <ProjectInfo>
                <ProjectAvatar iconImage={project.icon}/>
                <ProjectTexts>
                    <ProjectName><strong>{project.name ? project.name : 'Project Name'}</strong></ProjectName>
                    <ProjectCategory>{ProjectCategoryCopy[project.category]} {project.category ? project.category : 'Category Name'}</ProjectCategory>
                </ProjectTexts>
            </ProjectInfo>

            {renderLinkItem(match, 'Kanban Board', 'kanban', `/project/${projectId}/dashboard`)}
            {renderLinkItem(match, 'Project Settings', 'settings', `/project/${projectId}/project-setting`)}
            <Divider/>
            {renderLinkItem(match, 'Summary', 'Summary', `/project/${projectId}/setting/summary`)}
            {renderLinkItem(match, 'Notifications', 'Notifications', `/project/${projectId}/setting/notification`)}
            {renderLinkItem(match, 'Integrations', 'Integrations', `/project/${projectId}/setting/integrations`)}
            {renderLinkItem(match, 'Tags', 'Tags', `/project/${projectId}/setting/tags`)}
            {renderLinkItem(match, 'Columns', 'Columns', `/project/${projectId}/setting/columns`)}
            {renderLinkItem(match, 'Permissions', 'Permissions', `/project/${projectId}/setting/permissions`)}
            {renderLinkItem(match, 'Close Project', 'Close Project', `/project/${projectId}/close-project`)}
            <Divider/>
            {renderLinkItem(match, 'Roadmap', 'roadmap')}
            {renderLinkItem(match, 'Releases', 'release')}
            {renderLinkItem(match, 'Code', 'code')}
            {renderLinkItem(match, 'Project Pages', 'pages')}
            {renderLinkItem(match, 'Reports', 'reports')}
            <Divider/>

        </Sidebar>
    );
};

const renderLinkItem = (match, text, iconType, path) => {
    const isImplemented = !!path;

    const linkItemProps = isImplemented
        ? {as: NavLink, exact: true, to: `${path}`}
        : {as: 'div'};

    return (
        <LinkItem {...linkItemProps}>
            <Icon type={iconType} size={24}/>
            <LinkText>{text}</LinkText>
            {!isImplemented && <NotImplemented>Not implemented</NotImplemented>}
        </LinkItem>
    );
};


export default ProjectSidebar;
