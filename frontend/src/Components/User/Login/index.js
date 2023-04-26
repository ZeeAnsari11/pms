import React, {useState} from "react";
import * as Components from "../../../StyledComponents/Components.js";
import {Link} from "react-router-dom";
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ParentContainer} from "../../../StyledComponents/Components.js";

function Login() {
    const [signIn, toggle] = React.useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameForSignIn, setUsernameForSignIn] = useState('');
    const [passwordForSignIn, setPasswordForSignIn] = useState('');
    const [authToken, setAuthToken] = useState('');

    const handleSubmitSignIn = (e) => {
        e.preventDefault();

        const data = {
            "password": passwordForSignIn,
            "username": usernameForSignIn,
        };
        axios.post(`${process.env.REACT_APP_HOST}/api/auth/token/login/`, data)
            .then(response => {
                sessionStorage.setItem('auth_token', response.data.auth_token)
                setAuthToken(response.data.auth_token);
                axios.defaults.headers.common['Authorization'] = `Token ${authToken}`;
                window.location.href = '/dashboard';
            })
            .catch(error => {
                console.error(error.message);
                const notify = () => toast.error('🦄 ' + "Incorrect username or password. Please try again.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                notify();
            });

        if (authToken) {
            axios.get(`${process.env.REACT_APP_HOST}/api/projects/`, {headers: {"Authorization": `Token ${authToken}`}})
                .then(response => {
                    console.log("success project:");
                    console.log(response.data);

                }).catch(error => {
                console.log("failed project");
                console.error(error);
            });
        }

        if (authToken) {
            axios.get(`${process.env.REACT_APP_HOST}/api/issues/`, {headers: {"Authorization": `Token ${authToken}`}})
                .then(response => {
                    console.log("success issues:");
                    console.log(response.data);
                }).catch(error => {
                console.log("failed issues");
                console.error(error);
            });
        }

        if (authToken) {
            axios.get(`${process.env.REACT_APP_HOST}/api/comments/`, {headers: {"Authorization": `Token ${authToken}`}})
                .then(response => {
                    console.log("success comments:");
                    console.log(response.data);
                }).catch(error => {
                console.log("failed comments");
                console.error(error);
            });

        }

        if (authToken) {
            axios.get(`${process.env.REACT_APP_HOST}/api/worklogs/`, {headers: {"Authorization": `Token ${authToken}`}})
                .then(response => {
                    console.log("success worklogs:");
                    console.log(response.data);
                }).catch(error => {
                console.log("failed worklogs");
                console.error(error);
            });

        }

        if (authToken) {
            axios.get(`${process.env.REACT_APP_HOST}/api/watchers/`, {headers: {"Authorization": `Token ${authToken}`}})
                .then(response => {
                    console.log("success watchers:");
                    console.log(response.data);
                }).catch(error => {
                console.log("failed watchers");
                console.error(error);
            });
        }


    }

    const handleSubmitSignUp = (e) => {
        e.preventDefault();

        const data = {
            "email": email,
            "username": name,
            "password": password,
        };

        axios.post(`${process.env.REACT_APP_HOST}/api/auth/users/`, data)
            .then(response => {
                if (response.data.username) {
                    const notify = () => toast.success('Thanks for registration! Check your email ' + response.data.email + '  and click the link to activate your account. If you need help, contact us. We appreciate your business!', {
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    notify();
                }
            })
            .catch(error => {
                if (error.response.data.username) {
                    let errors = error.response.data.username;
                    //start
                    for (let i = 0; i < errors.length; i++) {
                        const notify = () => toast.error('🦄 ' + errors[i], {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                        notify();
                    }
                    //end
                }
                if (error.response.data.password) {
                    let errors = error.response.data.password;
                    //start
                    for (let i = 0; i < errors.length; i++) {
                        const notify = () => toast.error('🦄 ' + errors[i], {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                        notify();
                    }
                    //end
                }
                if (error.response.data.email) {
                    let errors = error.response.data.email;
                    //start
                    for (let i = 0; i < errors.length; i++) {
                        const notify = () => toast.error('🦄 ' + errors[i], {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                        notify();
                    }
                    //end
                }
            });
    }

    return (
        <ParentContainer>
        <Components.Container>
            <Components.SignUpContainer signingIn={signIn}>
                <Components.Form onSubmit={handleSubmitSignUp}>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type="text" placeholder="Name" value={name}
                                      onChange={(e) => setName(e.target.value)}/>
                    <Components.Input type="email" placeholder="Email" value={email}
                                      onChange={(e) => setEmail(e.target.value)}/>
                    <Components.Input type="password" placeholder="Password" value={password}
                                      onChange={(e) => setPassword(e.target.value)}/>
                    <Components.Button>Sign Up</Components.Button>
                </Components.Form>
            </Components.SignUpContainer>
            <Components.SignInContainer signingIn={signIn}>
                <Components.Form onSubmit={handleSubmitSignIn}>
                    <Components.Title>Sign In</Components.Title>
                    <Components.Input type="text" placeholder="Name" value={usernameForSignIn}
                                      onChange={(e) => setUsernameForSignIn(e.target.value)}/>
                    <Components.Input type="password" placeholder="Password" value={passwordForSignIn}
                                      onChange={(e) => setPasswordForSignIn(e.target.value)}/>
                    <Components.Anchor>
                        <Link to="/forgot-password">Forgot Password?</Link>
                        <br></br>
                        <br></br>
                        <Link to="/rest-password">Password Rest?</Link>
                    </Components.Anchor>
                    <Components.Button>Sign In</Components.Button>
                </Components.Form>
            </Components.SignInContainer>
            <Components.OverlayContainer signingIn={signIn}>
                <Components.Overlay signingIn={signIn}>
                    <Components.LeftOverlayPanel signingIn={signIn}>
                        <Components.Title>Welcome Back!</Components.Title>
                        <Components.Paragraph>
                            To keep connected with us please login with your personal info
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(true)}>
                            Sign In
                        </Components.GhostButton>
                    </Components.LeftOverlayPanel>
                    <Components.RightOverlayPanel signingIn={signIn}>
                        <Components.Title>PHP Studios!</Components.Title>
                        <Components.Paragraph>
                            Enter your personal details and start journey with us
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(false)}>
                            Sign Up
                        </Components.GhostButton>
                    </Components.RightOverlayPanel>
                </Components.Overlay>
            </Components.OverlayContainer>
        </Components.Container>
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
    </ParentContainer>);
}

export default Login;