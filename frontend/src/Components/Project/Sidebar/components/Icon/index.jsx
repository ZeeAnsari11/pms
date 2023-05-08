import React from 'react';
import {MdNotifications, MdSummarize} from 'react-icons/md';
import {CiDeliveryTruck} from 'react-icons/ci';
import {RiRoadMapLine, RiPagesLine} from 'react-icons/ri'
import {BiCodeAlt} from 'react-icons/bi'
import {BsGraphUpArrow} from 'react-icons/bs'

const Icon = ({type, size}) => {
    switch (type) {
        case 'MdSummarize':
            return <MdSummarize size={size} color={"black"}/>;
        case 'MdNotifications':
            return <MdNotifications size={size} color={"black"}/>;
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
        default:
            return null;
    }
};

export default Icon;
