import React from 'react';
import PropTypes from 'prop-types';
import {NavLink,useLocation} from 'react-router-dom';
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

const propTypes = {
    project: PropTypes.object.isRequired,
};

const ProjectSidebar = ({project}) => {
    const match = useLocation();

    return (
        <Sidebar>
            <ProjectInfo>
                <ProjectAvatar/>
                <ProjectTexts>
                    <ProjectName><strong>{project.name? project.name : 'Project Name' }</strong></ProjectName>
                    <ProjectCategory>{ProjectCategoryCopy[project.category]} {project.category? project.category : 'Category Name'}</ProjectCategory>
                </ProjectTexts>
            </ProjectInfo>

            {renderLinkItem(match, 'Summary', 'MdSummarize', '/project-summary')}
            {renderLinkItem(match, 'Notification', 'MdNotifications', '/notification')}
            {renderLinkItem(match, 'Integrations', 'GrSettingsOption', '/integrations')}
            <Divider/>
            {renderLinkItem(match, 'Roadmap', 'roadmap')}
            {renderLinkItem(match, 'Releases', 'release')}
            {renderLinkItem(match, 'Code', 'code')}
            {renderLinkItem(match, 'Project Pages', 'pages')}
            {renderLinkItem(match, 'Reports', 'reports')}
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

ProjectSidebar.propTypes = propTypes;

export default ProjectSidebar;
