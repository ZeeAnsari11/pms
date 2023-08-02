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
import {useSelector} from "react-redux";


const UserSidebar = () => {
    const match = useLocation();
    const currentUserProfileData = useSelector((state) => state.DataSyncer.userProfileData);
    const IsAdminOrStaffUser = currentUserProfileData?.user?.is_staff || currentUserProfileData?.user?.is_superuser

    return (
        <Sidebar>
            <Divider/>
            {renderLinkItem(match, 'My Account', 'My Account', `/manage-account`)}
            {IsAdminOrStaffUser && renderLinkItem(match, 'Manage Users', 'Manage Users', `/manage-users`)}
            {IsAdminOrStaffUser && renderLinkItem(match, 'Manage Groups', 'Manage Groups', `/manage-groups`)}
            {/*{renderLinkItem(match, 'General Setting', 'General Setting', `/manage-general-settings`)}*/}
            {IsAdminOrStaffUser && renderLinkItem(match, 'Global Integration', 'Integrations', `/global-integrations-setting`)}
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
