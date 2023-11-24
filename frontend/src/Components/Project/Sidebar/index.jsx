import React, {useEffect, useState} from 'react';
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
import {REACT_APP_DOMAIN} from "../../../Utils/envConstants";


const ProjectSidebar = () => {
    let authToken = localStorage.getItem('auth_token')

    const match = useLocation();
    const {projectId} = useParams()
    const [projectData, setProjectData] = useState({});
    const [icon, setIcon] = useState(null);

    const defaultIconPath = "Images/NoImage.jpeg"

    let IconPath = projectData.icon
    if (IconPath != null) {
        IconPath = `${REACT_APP_DOMAIN}/${icon}`
    } else {
        IconPath = `${REACT_APP_DOMAIN}/Images/NoImage.jpeg`
    }
    const [name, setName] = useState(''); // Set initial value from project object
    const [key, setKey] = useState(''); // Set initial value from project object
    const [projectCategory, setProjectCategory] = useState(''); // Set initial value from project object

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await axios.get(`${REACT_APP_DOMAIN}/api/projects/${projectId}`, {
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
            setProjectCategory(projectData.project_category)
        }
    }, [projectData]);

    const project = {
        name: name,
        category: projectCategory.project_category,
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
            {renderLinkItem(match, 'Project Settings', 'Project Settings', `/project/${projectId}/project-setting`)}
            {renderLinkItem(match, 'Summary', 'Summary', `/project/${projectId}/setting/summary`)}
            {renderLinkItem(match, 'Notifications', 'Notifications', `/project/${projectId}/setting/notification`)}
            {renderLinkItem(match, 'Integrations', 'Integrations', `/project/${projectId}/setting/integrations`)}
            {renderLinkItem(match, 'Tags', 'Tags', `/project/${projectId}/setting/tags`)}
            {renderLinkItem(match, 'Types', 'Types', `/project/${projectId}/setting/types`)}
            {renderLinkItem(match, 'Columns', 'Columns', `/project/${projectId}/setting/columns`)}
            {renderLinkItem(match, 'Permissions', 'Permissions', `/project/${projectId}/setting/permissions`)}
            {renderLinkItem(match, 'Close Project', 'Close Project', `/project/${projectId}/close-project`)}

            <Divider/>
            {/*{renderLinkItem(match, 'Roadmap', 'roadmap')}*/}
            {/*{renderLinkItem(match, 'Releases', 'release')}*/}
            {/*{renderLinkItem(match, 'Code', 'code')}*/}
            {/*{renderLinkItem(match, 'Project Pages', 'pages')}*/}
            {/*{renderLinkItem(match, 'Reports', 'reports')}*/}
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
