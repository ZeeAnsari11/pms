import React from 'react';
import {MdNotificationsNone, MdOutlineSummarize} from 'react-icons/md';
import {GrSettingsOption} from 'react-icons/gr';
import {TiTags} from 'react-icons/ti';
import {TbLayoutColumns} from 'react-icons/tb';
import {AiOutlineCloseCircle,AiOutlineUnlock} from 'react-icons/ai';
import {FiSettings} from 'react-icons/fi'


const Icon = ({type, size}) => {
    switch (type) {
        case 'Project Settings':
            return <FiSettings size={size} color={"black"}/>;
        case 'Summary':
            return <MdOutlineSummarize size={size} color={"black"}/>;
        case 'Notifications':
            return <MdNotificationsNone size={size} color={"black"}/>;
        case 'Integrations':
            return <GrSettingsOption size={size}/>;
        case 'Tags':
            return <TiTags color={'Black'} size={size}/>;
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
