import React from 'react';
import {MdOutlineViewKanban} from 'react-icons/md';
import {FiSettings} from 'react-icons/fi';
import {CiDeliveryTruck} from 'react-icons/ci';
import {RiRoadMapLine, RiPagesLine} from 'react-icons/ri'
import {BiCodeAlt} from 'react-icons/bi'
import {BsGraphUpArrow} from 'react-icons/bs'

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
        default:
            return null;
    }
};

export default Icon;
