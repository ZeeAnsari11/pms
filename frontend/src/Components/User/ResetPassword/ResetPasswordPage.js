import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../ForgetPassword/ForgetPassword.css"

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
    <div className="forgot-password-container">
      <form onSubmit={handleSubmit}>
        <h1 className='forgot-password-headline'>---- Reset Password! ----</h1>
        {error && <div className="error">{error}</div>}
        <label className="forgot-password-label" htmlFor="password">New Password:</label>
        <input
          className="reset-password-input"
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <label className="forgot-password-label" htmlFor="confirmPassword">Confirm Password:</label>
        <input
          className="reset-password-input"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
        <button className="reset-password-button" type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
