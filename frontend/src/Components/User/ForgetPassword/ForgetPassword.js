import React, { useState } from 'react';
import './ForgetPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log(email);
  };

  return (
    <div className="forgot-password-container">
      <h2 className="forgot-password-headline">---- Forgot Password! ----</h2>
      {submitted ? (
        <p>An email has been sent to your email address with instructions on how to reset your password.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label className="forgot-password-label">Email Address</label>
          <input
            className="forgot-password-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="forgot-password-button" type="submit">
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;
