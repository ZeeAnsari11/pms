import styled from "styled-components";
import { AuthContext } from '../../../Utils/AuthContext';
import React, { useContext, useEffect, useState } from "react";
import apiRequest from '../../../Utils/apiRequest';
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";


const Username = styled.div`
  margin-left: 40px;
  margin-top: -35px;
  color: black;
`;

const Email = styled.div`
  margin-left: 40px;
  margin-top: -5px;
`;


const AccountDropdown = () => {
    const [userData, setUserData] = useState(null);
    const { authToken} = useContext( AuthContext );

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
    <Username>{userData?.username}</Username>
    <Email>{userData?.email}</Email>
    </div>
</>
);
};

export default AccountDropdown;