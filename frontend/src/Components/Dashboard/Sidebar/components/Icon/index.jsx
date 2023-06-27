import React from 'react';
import {MdNotificationsNone, MdOutlineSummarize, MdOutlineViewKanban, MdOutlineTypeSpecimen} from 'react-icons/md';
import {FiSettings} from 'react-icons/fi';
import {CiDeliveryTruck} from 'react-icons/ci';
import {RiRoadMapLine, RiPagesLine} from 'react-icons/ri'
import {BiCodeAlt} from 'react-icons/bi'
import {BsGraphUpArrow} from 'react-icons/bs'
import {GrSettingsOption} from "react-icons/gr";
import {TiTags} from "react-icons/ti";
import { RiExternalLinkLine } from "react-icons/ri";
import { FaUsersCog } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import {TbLayoutColumns} from "react-icons/tb";
import {AiOutlineCloseCircle, AiOutlineUnlock} from "react-icons/ai";

const Icon = ({type, size}) => {
    switch (type) {
        case 'kanban':
            return <MdOutlineViewKanban size={size}/>;
        case 'settings':
            return <FiSettings size={size}/>;
        case 'release':
            return <CiDeliveryTruck size={size}/>;
        case 'roadmap':
            return <RiRoadMapLine size={size}/>;
        case 'code':
            return <BiCodeAlt size={size}/>;
        case 'pages':
            return <RiPagesLine size={size}/>;
        case 'reports':
            return <BsGraphUpArrow size={size}/>;
            case 'Project Settings':
            return <FiSettings size={size} color={"black"}/>;
        case 'Summary':
            return <MdOutlineSummarize size={size} color={"black"}/>;
        case 'My Account':
            return <RiExternalLinkLine size={size} color={"black"}/>;
        case 'Manage Users':
            return <FaUsersCog size={size} color={"black"}/>;
        case 'Manage Groups':
            return <MdGroups size={size} color={"black"}/>;
        case 'General Setting':
            return <GrSettingsOption size={size} color={"black"}/>;
        case 'Notifications':
            return <MdNotificationsNone size={size} color={"black"}/>;
        case 'Integrations':
            return <GrSettingsOption size={size}/>;
        case 'Tags':
            return <TiTags color={'Black'} size={size}/>;
        case 'Types':
            return <MdOutlineTypeSpecimen color={'Black'} size={size}/>;
        case 'Columns':
            return <TbLayoutColumns color={'Black'} size={size}/>;
        case 'Permissions':
            return <AiOutlineUnlock color={'Black'} size={size}/>;
        case 'Close Project':
            return <AiOutlineCloseCircle color={'Black'} size={size}/>;
        default:
            return null;
    }
};

export default Icon;
