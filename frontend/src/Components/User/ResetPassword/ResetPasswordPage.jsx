import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import { displayErrorMessage } from "../../../Shared/notify"
import Toast from '../../../Shared/Components/Toast'
import * as ResetPasswordComponents from './style';
import apiRequest from '../../../Utils/apiRequest';
import { AxiosError } from "axios";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [uid, setUid] = useState('');
    const [token, setToken] = useState('');


    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const uid = searchParams.get('uid');
        const token = searchParams.get('token');
        if (uid && token) {
            setUid(uid);
            setToken(token);
        }

    }, [location.search]);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password === confirmPassword) {
            apiRequest
                .post(`/api/auth/users/reset_password_confirm/`, {
                    uid: uid,
                    token: token,
                    new_password: password
                })
                .then(response => {
                    if (response.status === 204) {
                        navigate('/');
                    } else {
                        displayErrorMessage(`Error sending password reset email`);
                    }
                })
                .catch(error => {
                    if(error.code === AxiosError.ERR_NETWORK){
                        return displayErrorMessage(`${error.message}`)
                    }
                    if (error.response.data.new_password) {
                        let newPasswordError = error.response.data.new_password;
                        for (let i = 0; i < newPasswordError.length; i++) {
                            displayErrorMessage(`${newPasswordError[i]}`);
                        }
                    }
                });
        } else {
            displayErrorMessage(`Passwords do not match`)
        }
    };


    return (
        <>
            <Toast />
            <ResetPasswordComponents.ForgotPasswordContainer>
                <form onSubmit={handleSubmit}>
                    <ResetPasswordComponents.ForgotPasswordHeadline>---- Reset Password! ----</ResetPasswordComponents.ForgotPasswordHeadline>

                    <ResetPasswordComponents.ForgotPasswordLabel htmlFor="password">New Password:</ResetPasswordComponents.ForgotPasswordLabel>
                    <ResetPasswordComponents.ResetPasswordInput
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <ResetPasswordComponents.ForgotPasswordLabel htmlFor="confirmPassword">Confirm Password:</ResetPasswordComponents.ForgotPasswordLabel>
                    <ResetPasswordComponents.ResetPasswordInput
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                    <ResetPasswordComponents.Button type="submit">Reset Password</ResetPasswordComponents.Button>
                </form>
            </ResetPasswordComponents.ForgotPasswordContainer>
        </>
    );
};

export default ResetPasswordPage;
