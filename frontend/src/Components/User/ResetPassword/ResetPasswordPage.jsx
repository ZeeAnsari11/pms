import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import { displayErrorMessage } from "../../../Shared/notify"
import Toast from "../../../Shared/Components/Toast"
import styled from 'styled-components';
import apiRequest from '../../../Utils/apiRequest';
import { AxiosError } from "axios";

const ForgotPasswordContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 10px;
  border: 2px solid var(--primary-color);
  padding: 20px;
  width: 510px;
  height: 300px;
`;

const ForgotPasswordHeadline = styled.h1`
  color: whitesmoke;
`;

const ForgotPasswordLabel = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
  color: whitesmoke;
  display: flex;
  justify-content: center;
`;

const ResetPasswordInput = styled.input`
  width: 300px;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #eee;
  display: flex;
  justify-content: center;
  margin-left: 27px;
`;

const Button = styled.button`
  width: 220px;
  border: none;
  border-radius: 20px;
  background-color: var(--primary-color);
  color: #00000;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-color: whitesmoke;

  &:last-child {
    margin-left: 77px;
  }

  &:hover {
    background-color: #000000;
    color: #ffffff;
    border-color: whitesmoke;
  }
`;

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
            <ForgotPasswordContainer>
                <form onSubmit={handleSubmit}>
                    <ForgotPasswordHeadline>---- Reset Password! ----</ForgotPasswordHeadline>

                    <ForgotPasswordLabel htmlFor="password">New Password:</ForgotPasswordLabel>
                    <ResetPasswordInput
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <ForgotPasswordLabel htmlFor="confirmPassword">Confirm Password:</ForgotPasswordLabel>
                    <ResetPasswordInput
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                    <Button type="submit">Reset Password</Button>
                </form>
            </ForgotPasswordContainer>
        </>
    );
};

export default ResetPasswordPage;
