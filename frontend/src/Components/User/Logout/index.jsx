import React from "react";
import AccountDropdown from "../AccountDropdown";
import {Link, useNavigate} from "react-router-dom";
import {AiOutlineLogout} from "react-icons/ai";
import {RiExternalLinkLine} from "react-icons/ri";
import {FaUsersCog} from "react-icons/fa";
import {MdGroups} from "react-icons/md";
import {GrSettingsOption} from "react-icons/gr";
import {FiSettings} from "react-icons/fi";
import {logout} from "../../../Store/Slice/auth/authSlice"
import {useDispatch} from "react-redux";


const iconSize = 20;

const LinkItem = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = (navigate) => {
        dispatch(logout())
        navigate('/');
    };

    return (
        <a onClick={() => handleLogout(navigate)}>
            Logout
        </a>
    )
}

const simpleUseraccountItems = [
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
        ],
    }, {
        type: "divider",
    }, {
        key: "3",
        icon: <AiOutlineLogout size={iconSize}/>,
        label: <LinkItem/>,
    },
];


const adminUseraccountItems = [
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
                icon: <FiSettings size={iconSize}/>,
            },
            {
                key: "1-6",
                label: <Link to="/global-integrations-setting">Global Integration Settings</Link>,
                icon: <GrSettingsOption size={iconSize}/>,
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


export {adminUseraccountItems, simpleUseraccountItems}