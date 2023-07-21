import React, {useState} from 'react';
import * as ForgetPasswordComponents from './style';
import apiRequest from '../../../Utils/apiRequest';
import { StatusCodes } from 'http-status-codes';
import '../../../Configurations/colors';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        apiRequest
            .post(`/api/auth/users/reset_password/`,
                {
                    "email": email
                } )
            .then(response => {
                if (response.status === StatusCodes.NO_CONTENT) {
                    setSubmitted(true)
                }
            })
            .catch(error => {
                console.error('Error sending password reset email:');
                console.error('Error:', error);
            });
    };

    return (
        <ForgetPasswordComponents.Container>
            <ForgetPasswordComponents.Headline>---- Forgot Password! ----</ForgetPasswordComponents.Headline>
            {submitted ? (
                <ForgetPasswordComponents.Message>An email has been sent to your email address with instructions on how to reset your
                    password.</ForgetPasswordComponents.Message>
            ) : (
                <form onSubmit={handleSubmit}>
                    <ForgetPasswordComponents.Label>Email Address</ForgetPasswordComponents.Label>
                    <ForgetPasswordComponents.Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <ForgetPasswordComponents.Button type="submit">Reset Password</ForgetPasswordComponents.Button>
                </form>
            )}
        </ForgetPasswordComponents.Container>
    );
};

export default ForgotPassword;
