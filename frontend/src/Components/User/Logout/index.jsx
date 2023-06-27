import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../../Utils/AuthContext';
import AccountDropdown from "../AccountDropdown";
import apiRequest from '../../../Utils/apiRequest';
import { AiOutlineLogout } from "react-icons/ai";
import { RiExternalLinkLine } from "react-icons/ri";
import { FaUsersCog } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { GrSettingsOption } from "react-icons/gr";

import React, { useContext } from "react";

const iconSize = 20;


const logout = (navigate, authToken, setAuthToken) => {
    try {
        apiRequest
            .post('/api/auth/token/logout/', null, {
            headers: {
                Authorization: `Token ${authToken}`,
            },
            } )
            .then((response) => {
                setAuthToken(null)
                localStorage.removeItem('auth_token'); // @todo remove token from local storage
                navigate('/')
        });
    } catch (error) {
        navigate('/')
    }
};

const LinkItem = () => {
    const { authToken, setAuthToken } = useContext( AuthContext );
    const navigate = useNavigate();
    return (
        <Link to="/" onClick={() => logout(navigate, authToken, setAuthToken)}>Logout</Link>
    )
}

const accountItems = [
    {
        key: "1",
        type: "group",
        label: <AccountDropdown />,
        children: [
            {
                key: "1-2",
                label: <Link to="/manage-account">Manage Account</Link>,
                icon: <RiExternalLinkLine size={iconSize} />,
            },
            {
                key: "1-3",
                label: <Link to="/manage-users">Manage Users</Link>,
                icon: <FaUsersCog size={iconSize} />,
            },
            {
                key: "1-4",
                label: <Link to="/manage-groups">Manage Groups</Link>,
                icon: <MdGroups size={iconSize} />,
            },
            {
                key: "1-5",
                label: <Link to="/manage-general-settings">Manage General Settings</Link>,
                icon: <GrSettingsOption size={iconSize} />,
            },
        ],
    }, {
    type: "divider",
    }, {
    key: "3",
    icon: <AiOutlineLogout size={iconSize} />,
    label: <LinkItem />,
    },
];


export {accountItems}