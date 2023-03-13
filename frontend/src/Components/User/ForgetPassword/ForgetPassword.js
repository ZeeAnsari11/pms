import React, {useState} from 'react';
import "./ForgetPassword.css"

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
            <h2>---- Forgot Password! ----</h2>
            {submitted ? (
                <p>An email has been sent to your email address with instructions on how to reset your password.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>Email Address</label>
                    <input className="inputwdith" type="email" placeholder="Enter your email" value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                    <button className="Button-top-padding-for-forgetpassword" type="submit">Reset Password</button>
                </form>
            )}
        </div>
    );
}

export default ForgotPassword;
