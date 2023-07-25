import React, {useEffect, useState} from "react";
import apiRequest from '../../../Utils/apiRequest';
import Avatar from "react-avatar";
import {useNavigate} from "react-router-dom";
import * as AccountComponents from "./Style"


const AccountDropdown = () => {
    const [currentUserProfileData, setcurrentUserProfileData] = useState(null);

    let authToken = localStorage.getItem('auth_token');

    const navigate = useNavigate();


    useEffect(() => {
        const fetchCurrentUserProfileData = async () => {
            apiRequest
                .get(`/api/userprofile/me/`,
                    {
                        headers:
                            {"Authorization": `Token ${authToken}`}
                    })
                .then(response => {
                    setcurrentUserProfileData(response.data);
                })
                .catch(error => {
                    navigate('/');
                    console.error(error);
                });
        };

        fetchCurrentUserProfileData();
    }, []);

    return (
        <>
            <strong>ACCOUNT</strong>
            <div>
                <Avatar
                    name={currentUserProfileData?.user?.username}
                    src={`${process.env.REACT_APP_HOST}/${currentUserProfileData?.image}`}
                    size={30}
                    round={true}
                    title={currentUserProfileData?.user?.username}
                    color="#DE350B"
                    style={{marginRight: '10px', marginTop: '8px'}}
                />
                <AccountComponents.Username>{currentUserProfileData?.user?.username}</AccountComponents.Username>
                {currentUserProfileData?.user?.email && (
                    <AccountComponents.Email>{currentUserProfileData?.user?.email}</AccountComponents.Email>
                )}
            </div>
        </>
    );
};

export default AccountDropdown;