import React from 'react';
import {MdNotifications, MdSummarize} from 'react-icons/md';
import {RiRoadMapLine, RiPagesLine} from 'react-icons/ri'
import {BiCodeAlt} from 'react-icons/bi'
import {BsGraphUpArrow} from 'react-icons/bs'
import {GrSettingsOption} from 'react-icons/gr';
import { FaTag } from 'react-icons/fa';
import { FaColumns } from 'react-icons/fa';


const Icon = ({type, size}) => {
    switch (type) {
        case 'MdSummarize':
            return <MdSummarize size={size} color={"black"}/>;
        case 'MdNotifications':
            return <MdNotifications size={size} color={"black"}/>;
        case 'GrSettingsOption':
            return <GrSettingsOption size={size}/>;
        case 'FaTag':
            return <FaTag color={'Black'} size={size}/>;
        case 'FaColumns':
            return <FaColumns color={'Black'} size={size}/>;
        case 'pages':
            return <RiPagesLine size={size}/>;
        case 'reports':
            return <BsGraphUpArrow size={size}/>;
        default:
            return null;
    }
};

export default Icon;
