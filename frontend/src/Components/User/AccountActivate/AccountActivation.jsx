import React, { useState, useEffect } from 'react';
import {useNavigate, useLocation, useParams} from 'react-router-dom';
import apiRequest from '../../../Utils/apiRequest';
import * as AccountActivationComponents from "./Style"



const AccountActivation = () => {
    const { activationToken } = useParams();
    const [activated, setActivated] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const uid = searchParams.get('uid');
        const token = searchParams.get('token');

        apiRequest
            .post(`/api/auth/users/activation/`,
                {
                    uid, token
                } )
            .then(response => {
                if (response.status === 204) {
                    setActivated(true);
                    sessionStorage.setItem('activated', 'true');
                } else {
                    console.error('Error sending password reset email:');
                }
            })
            .catch(error => {
                console.error(`Error: ${error}`);
            });
    }, [location.search]);

    useEffect(() => {
        const isActivated = sessionStorage.getItem('activated');
        if (isActivated) {
            setActivated(true);
        }
    }, []);

    const handleSignInClick = () => {
        navigate('/');
    };

    return (
        <AccountActivationComponents.ForgotPasswordContainer>
            {!activated && (
                <span style={{color: 'white', fontWeight: 'bold'}}>
                    Please wait, your account is activating.
        </span>
            )}
            {activated && (
                <React.Fragment>
            <span style={{color: 'white', fontWeight: 'bold', marginBottom: '20px'}}>
                Congratulations! Your account has been activated.
            </span>
                    <AccountActivationComponents.Button onClick={handleSignInClick}>Go to Sign In Page</AccountActivationComponents.Button>
                </React.Fragment>
            )}
        </AccountActivationComponents.ForgotPasswordContainer>
    );
};

export default AccountActivation;
