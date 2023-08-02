import React from "react";
import {RiExternalLinkLine, RiFeedbackFill} from "react-icons/ri";
import {VscProject} from "react-icons/vsc";
import {BiPlus} from "react-icons/bi";
import {BsArrowRightCircleFill, BsMicrosoftTeams} from "react-icons/bs";
import {MdOutlineCreate} from "react-icons/md";
import {GoKeyboard} from "react-icons/go";
import {Link} from "react-router-dom";

const iconSize = 20;

export const adminUserProjectItems = [
    {
        icon: <VscProject size={iconSize}/>,
        label: <Link to="/project">View All Projects</Link>,
        key: "0",
    },
    {
        type: "divider",
    },
    {
        icon: <MdOutlineCreate size={iconSize}/>,
        label: <Link to="/create-project">Create Project</Link>,
        key: "1",
    },
];

export const simpleUserProjectItems = [
    {
        icon: <VscProject size={iconSize}/>,
        label: <Link to="/project">View All Projects</Link>,
        key: "0",
    }
];

export const teamItems = [
    {
        icon: <BiPlus size={iconSize}/>,
        key: "0",
        label: <Link to="/invite">Invite People to Jira</Link>,
    },
    {
        icon: <BsMicrosoftTeams size={iconSize}/>,
        label: <Link to="/team">Create a Team</Link>,
        key: "1",
    },
    {
        type: "divider",
    },
    {
        label: <Link to="/people/search">Search people and teams</Link>,
        key: "2",
    },
];

export const yourWorkItems = [
    {
        icon: <BsArrowRightCircleFill size={iconSize}/>,
        label: <Link to="/project">Go to Your work Page</Link>,
        key: "0",
    },
];

export const notificationsItems = [
    {
        icon: <RiExternalLinkLine size={iconSize}/>,
        label: <Link to="/notifcations">Notifications</Link>,
        key: "0",
    },
    {
        type: "divider",
    },
    {
        label: <p>Password has been changed successfully. (Demo Notification)</p>,
        key: "1",
    },
];

export const helpItems = [
    {
        icon: <GoKeyboard size={iconSize}/>,
        label: <Link to="/shortcuts">KeyBoard Shortcuts</Link>,
        key: "0",
    },
    {
        type: "divider",
    },
    {
        icon: <RiFeedbackFill size={iconSize}/>,
        label: <Link to="/feedback">Give Feedback About ProjeX</Link>,
        key: "1",
    },
];
