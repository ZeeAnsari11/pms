import React from "react";
import apiRequest from '../../../Utils/apiRequest';
import AccountDropdown from "../AccountDropdown";
import {Link, useNavigate} from "react-router-dom";
import {AiOutlineLogout} from "react-icons/ai";
import {RiExternalLinkLine} from "react-icons/ri";
import {FaUsersCog} from "react-icons/fa";
import {MdGroups} from "react-icons/md";
import {GrSettingsOption} from "react-icons/gr";
import { FiSettings } from "react-icons/fi";
import {displayErrorMessage, displaySuccessMessage} from "../../../Shared/notify"
import {AxiosError} from "axios";
import {StatusCodes} from "http-status-codes";


const iconSize = 20;

const handleLogout = (navigate) => {
    let authToken = localStorage.getItem('auth_token')
    apiRequest
        .post('/api/auth/token/logout/', authToken, {
            headers: {
                Authorization: `Token ${authToken}`,
            },
        })
        .then((response) => {
            console.log("response:", response)
            localStorage.removeItem('auth_token');
            navigate('/');
        })
        .catch(error => {
            console.error('Logout failed:', error);
            if (error.code === AxiosError.ERR_NETWORK) {
                return displayErrorMessage(`${error.message}`)
            }
            if (error.response.status === StatusCodes.UNAUTHORIZED) {
                return displayErrorMessage(`${error.response.data.detail}`);
            } else {
                displayErrorMessage(`${error.message}`)
            }
        });

};


const LinkItem = () => {
    const navigate = useNavigate()
    return (
        <a onClick={() => handleLogout(navigate)}>
            Logout
        </a>
    )
}

const accountItems = [
    {
        key: "1",
        type: "group",
        label: <AccountDropdown/>,
        children: [
            {
                key: "1-2",
                label: <Link to="/manage-account">Manage Account</Link>,
                icon: <RiExternalLinkLine size={iconSize}/>,
            },
            {
                key: "1-3",
                label: <Link to="/manage-users">Manage Users</Link>,
                icon: <FaUsersCog size={iconSize}/>,
            },
            {
                key: "1-4",
                label: <Link to="/manage-groups">Manage Groups</Link>,
                icon: <MdGroups size={iconSize}/>,
            },
            {
                key: "1-5",
                label: <Link to="/manage-general-settings">Manage General Settings</Link>,
                icon: <FiSettings size={iconSize} />,
            },
            {
                key: "1-6",
                label: <Link to="/global-integrations-setting">Global Integration Settings</Link>,
                icon: <GrSettingsOption size={iconSize} />,
            },
        ],
    }, {
        type: "divider",
    }, {
        key: "3",
        icon: <AiOutlineLogout size={iconSize}/>,
        label: <LinkItem/>,
    },
];


export {accountItems}