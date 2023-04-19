import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


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
  const [error, setError] = useState('');
  const history = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // send password reset request to server here

    history.push('/login');
  };

  return (
    <ForgotPasswordContainer>
      <form onSubmit={handleSubmit}>
        <ForgotPasswordHeadline>---- Reset Password! ----</ForgotPasswordHeadline>
        {error && <div className="error">{error}</div>}
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
  );
};

export default ResetPasswordPage;
