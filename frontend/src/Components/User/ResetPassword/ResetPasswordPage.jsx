import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';

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

const WarningDiv = styled.div`
  background-color: #fff6f6;
  border: 1px solid #e0b4b4;
  color: #9f3a38;
  margin-top: 10px;
  padding: 5px;
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
            axios
                .post(`${process.env.REACT_APP_HOST}/api/auth/users/reset_password_confirm/`, {
                    uid: uid,
                    token: token,
                    new_password: password
                })
                .then(response => {
                    if (response.status === 204) {
                        navigate('/');
                    } else {
                        console.error('Error sending password reset email');
                    }
                })
                .catch(error => {
                    toast.error('🦄 Please click on the password reset link and try again', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                });
        } else {
            toast.error('🦄 Passwords do not match', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };


    return (
        <>
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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
};

export default ResetPasswordPage;
