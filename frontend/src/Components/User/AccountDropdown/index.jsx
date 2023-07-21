import React, { useEffect, useState } from "react";
import apiRequest from '../../../Utils/apiRequest';
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import * as AccountComponents from "./style"


const AccountDropdown = () => {
    const [userData, setUserData] = useState(null);
    let authToken = localStorage.getItem('auth_token');

    const navigate = useNavigate();

    useEffect(() => {
    const fetchUserData = async () => {
        apiRequest
            .get(`/api/auth/users/me/`,
                {
                    headers:
                        {"Authorization": `Token ${authToken}`}
                } )
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                navigate('/');
                console.error(error);
            });
    };

    fetchUserData();
    }, []);

return (
<>
    <strong>ACCOUNT</strong>
    <div>
        <Avatar
            name={userData?.username}
            size={30}
            round={true}
            color="#DE350B"
            style={{marginRight: '10px', marginTop: '8px'}}
        />
    <AccountComponents.Username>{userData?.username}</AccountComponents.Username>
    <AccountComponents.Email>{userData?.email}</AccountComponents.Email>
    </div>
</>
);
};

export default AccountDropdown;