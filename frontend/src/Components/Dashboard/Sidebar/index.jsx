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
                    <ProjectName>{project.name}</ProjectName>
                    <ProjectCategory>{ProjectCategoryCopy[project.category]} project</ProjectCategory>
                </ProjectTexts>
            </ProjectInfo>

            {renderLinkItem(match, 'Kanban Board', 'kanban', '/board')}
            {renderLinkItem(match, 'Project Settings', 'settings', '/project-setting')}
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
