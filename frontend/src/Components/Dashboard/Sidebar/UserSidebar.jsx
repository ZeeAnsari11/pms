import {NavLink, useLocation} from 'react-router-dom';
import Icon from './components/Icon/index';

import {
    Sidebar,
    Divider,
    LinkItem,
    LinkText,
    NotImplemented,
} from './SidebarStyle';
import React from "react";


const UserSidebar = () => {
    const match = useLocation();
    return (
        <Sidebar>
            <Divider/>
            {renderLinkItem(match, 'My Account', 'My Account', `/manage-account`)}
            {renderLinkItem(match, 'Manage Users', 'Manage Users', `/manage-users`)}
            {renderLinkItem(match, 'Manage Groups', 'Manage Groups', `/manage-groups`)}
            {renderLinkItem(match, 'General Setting', 'General Setting', `/manage-general-settings`)}
            {renderLinkItem(match, 'Global Integration', 'Integrations', `/global-integrations-setting`)}
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


export default UserSidebar;
