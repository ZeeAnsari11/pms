import {ImUser} from "react-icons/im";
import {Link} from "react-router-dom";
import {RiExternalLinkLine, RiFeedbackFill} from "react-icons/ri";
import {VscProject} from "react-icons/vsc";
import {BiPlus} from "react-icons/bi";
import {AiOutlineLogout} from 'react-icons/ai'
import {BsArrowRightCircleFill, BsMicrosoftTeams} from "react-icons/bs";
import {MdOutlineCreate} from 'react-icons/md'
import {GoKeyboard} from 'react-icons/go'
import React from "react";


const iconSize = 20

export const accountitems = [
    {
        key: '1',
        type: 'group',
        label: <strong>ACCOUNT</strong>,
        children: [
            {
                key: '1-1',
                icon: <ImUser size={iconSize}/>,
                label: <Link to="/account">PHPStudios Account</Link>,
            },
            {
                key: '1-2',
                label: <Link to="/manage-account">Manage Account</Link>,
                icon: <RiExternalLinkLine size={iconSize}/>
            },
        ],
    },
    {
        key: '2',
        type: 'group',
        label: <strong>JIRA</strong>,
        children: [
            {
                key: '2-1',
                label: <Link to="/profile">Profile</Link>,
            },
            {
                key: '2-2',
                label: <Link to="/personal-settings">Personal Settings</Link>,
            },
        ],
    },
    {
        type: 'divider',
    },
    {
        key: '3',
        icon: <AiOutlineLogout size={iconSize}/>,
        label: <Link to="/logout">Logout</Link>,
    },

];
export const projectitems = [

    {
        icon: <VscProject size={iconSize}/>,
        label: <Link to="/project-views">View All Projects</Link>,
        key: '0',
    },
    {
        type: 'divider',
    },
    {
        icon: <MdOutlineCreate size={iconSize}/>,
        label: <Link to="/create-project">Create Project</Link>,
        key: '1',
    },
];
export const teamitems = [

    {
        icon: <BiPlus size={iconSize}/>,
        key: '0',
        label: <Link to="/invite">Invite People to Jira</Link>,
    },
    {
        icon: <BsMicrosoftTeams size={iconSize}/>,
        label: <Link to="/team">Create a Team</Link>,
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: <Link to="/people/search">Search people and teams</Link>,
        key: '2',
    },
];
export const yourworkitems = [
    {
        icon: <BsArrowRightCircleFill size={iconSize}/>,
        label: <Link to="/project-views">Go to Your work Page</Link>,
        key: '0',
    },
];
export const notificationsitems = [
    {
        icon: <RiExternalLinkLine size={iconSize}/>,
        label: <Link to="/notifcations">Notifications</Link>,
        key: '0',
    },
    {
        type: 'divider',
    },
    {
        label: <p>Password has been changed succesfully. (Demo Notification)</p>,
        key: '1',
    },
];

export const helpitems = [
    {
        icon: <GoKeyboard size={iconSize}/>,
        label: <Link to="/shortcuts">KeyBoard Shortcuts</Link>,
        key: '0',

    },
    {
        type: 'divider',
    },
    {
        icon: <RiFeedbackFill size={iconSize}/>,
        label: <Link to="/feedback">Give Feedback About ProjeX</Link>,
        key: '1',
    },
];