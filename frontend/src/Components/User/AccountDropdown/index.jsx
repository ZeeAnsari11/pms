import React, {useEffect, useState} from "react";
import apiRequest from '../../../Utils/apiRequest';
import Avatar from "react-avatar";
import {useNavigate} from "react-router-dom";
import * as AccountComponents from "./Style"


const AccountDropdown = () => {
    const [userData, setUserData] = useState(null);
    const [currentUserProfileData, setcurrentUserProfileData] = useState(null);

    let authToken = localStorage.getItem('auth_token');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            apiRequest
                .get(`/api/auth/users/me/`,
                    {
                        headers:
                            {"Authorization": `Token ${authToken}`}
                    })
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


    useEffect(() => {
        const fetchCurrentUserProfileData = async () => {
            apiRequest
                .get(`/api/userprofile/?user__username__iexact=${userData?.username}&&user__email__iexact=${userData?.email}`,
                    {
                        headers:
                            {"Authorization": `Token ${authToken}`}
                    })
                .then(response => {
                    setcurrentUserProfileData(response.data[0]);
                })
                .catch(error => {
                    navigate('/');
                    console.error(error);
                });
        };

        fetchCurrentUserProfileData();
    }, [userData]);

    return (
        <>
            <strong>ACCOUNT</strong>
            <div>
                <Avatar
                    name={userData?.username}
                    src={`${process.env.REACT_APP_HOST}/${currentUserProfileData?.image}`}
                    size={30}
                    round={true}
                    title={userData?.username}
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