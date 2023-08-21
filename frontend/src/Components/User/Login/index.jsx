import React, {useState, useEffect} from "react";
import {useDispatch} from 'react-redux';
import {login} from '../../../Store/Slice/User/loginSlice';
import {signUp} from '../../../Store/Slice/User/signupSlice';
import {Link, useNavigate, useLocation} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Toast from "../../../Shared/Components/Toast"
import * as LoginStyleComponents from "./Style"
import {displayErrorMessage, displaySuccessMessage} from "../../../Shared/notify"
import {AxiosError} from "axios";
import {StatusCodes} from "http-status-codes";
import {DataSyncer} from "../../../Store/Slice/DataSyncerSlice";
import {useIsLogInPending, useIsSingUpPending} from "../../../Store/Selector/Selector";
import {EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined} from '@ant-design/icons';
import {Button, Divider} from 'antd';
import axios from 'axios'
import {googleAuthenticate} from "../../../Store/Slice/User/googleauthSlice";

function Login() {
    const dispatch = useDispatch();

    const isLogInPending = useIsLogInPending();
    const isSingUpPending = useIsSingUpPending();


    const [signIn, setSignIn] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailForSignIn, setEmailForSignIn] = useState('');
    const [passwordForSignIn, setPasswordForSignIn] = useState('');

    const navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        const values = new URLSearchParams(location.search);
        const state = values.get('state') || null;
        const code = values.get('code') || null;

        console.log('State: ' + state);
        console.log('Code: ' + code);

        if (state && code) {
            dispatch(googleAuthenticate({state, code}));
        }
    }, [location, dispatch]);


    const handleSubmitSignIn = (e) => {
        e.preventDefault();

        dispatch(login({email: emailForSignIn, password: passwordForSignIn})).unwrap()
            .then((response) => {
                if (response.authToken.auth_token) {
                    localStorage.setItem('auth_token', response.authToken.auth_token);
                    navigate('/project');
                    dispatch(DataSyncer());
                }
            })
            .catch((error) => {
                if (error.code === AxiosError.ERR_NETWORK) {
                    return displayErrorMessage(`${error.message}`)
                }
                if (error.response.status === StatusCodes.UNAUTHORIZED) {
                    return displayErrorMessage(`${error.response.data.detail}`);
                }
                if (error.response.status === StatusCodes.BAD_REQUEST && error.response.data.non_field_errors) {
                    let nonFieldError = error.response.data.non_field_errors;
                    for (let i = 0; i < nonFieldError.length; i++) {
                        displayErrorMessage(nonFieldError[i]);
                    }
                }
            });
    };


    const continueWithGoogle = async () => {
        try {
            const apiBaseUrl = 'http://localhost:8000';
            const redirectUri = `http://localhost:3000/google`; // This is where the user should be redirected after authentication

            const res = await axios.get(`${apiBaseUrl}/api/auth/o/google-oauth2/?redirect_uri=${encodeURIComponent(redirectUri)}`);

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };
    const handleSubmitSignUp = (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            displayErrorMessage('Please fill in all fields.');
            return;
        }

        dispatch(signUp({name, email, password})).unwrap()
            .then((response) => {
                if (response.status === StatusCodes.CREATED) {
                    displaySuccessMessage(`Thanks for registration! Check your email and click the link to activate your account. If you need help, contact us. We appreciate your business!`);
                }
            })
            .catch((error) => {
                if (error.code === AxiosError.ERR_NETWORK) {
                    return displayErrorMessage(`${error.message}`)
                }
                if (error.response && error.response.data) {
                    if (error.response.data.username) {
                        let usernameErrors = error.response.data.username;
                        for (let i = 0; i < usernameErrors.length; i++) {
                            displayErrorMessage(`${usernameErrors[i]}`);
                        }
                    }
                    if (error.response.data.password) {
                        let passwordErrors = error.response.data.password;
                        for (let i = 0; i < passwordErrors.length; i++) {
                            displayErrorMessage(`${passwordErrors[i]}`);
                        }
                    }
                    if (error.response.data.email) {
                        let emailErrors = error.response.data.email;
                        for (let i = 0; i < emailErrors.length; i++) {
                            displayErrorMessage(`${emailErrors[i]}`);
                        }
                    }
                } else {
                    displayErrorMessage(`An error occurred while signing up.`);
                }
            });


    }

    return (
        <LoginStyleComponents.ParentContainer>
            <Toast/>
            <LoginStyleComponents.Container>
                <LoginStyleComponents.SignUpContainer signingIn={signIn}>
                    <LoginStyleComponents.Form onSubmit={handleSubmitSignUp}>
                        <LoginStyleComponents.Title>Create Account</LoginStyleComponents.Title>
                        <LoginStyleComponents.StyleInput type="text" placeholder="Name" value={name}
                                                         onChange={(e) => setName(e.target.value)}/>
                        <LoginStyleComponents.StyleInput type="email" placeholder="Email" value={email}
                                                         onChange={(e) => setEmail(e.target.value)}/>
                        <LoginStyleComponents.StylePasswordInput placeholder="Password" value={password}
                                                                 onChange={(e) => setPassword(e.target.value)}
                                                                 iconRender={(visible) => (visible ? <EyeTwoTone/> :
                                                                     <EyeInvisibleOutlined/>)}
                        />
                        <Button
                            size={"large"} type={"primary"} shape="round" loading={isSingUpPending}
                            onClick={handleSubmitSignUp}>
                            Sign Up
                        </Button>
                        <Divider>OR</Divider>
                        <Button type={"primary"} size={"large"} shape="round" icon={<GoogleOutlined/>}
                                onClick={continueWithGoogle}>Continue With
                            Google</Button>
                    </LoginStyleComponents.Form>
                </LoginStyleComponents.SignUpContainer>
                <LoginStyleComponents.SignInContainer signingIn={signIn}>
                    <LoginStyleComponents.Form onSubmit={handleSubmitSignIn}>
                        <LoginStyleComponents.Title>Sign In</LoginStyleComponents.Title>
                        <LoginStyleComponents.StyleInput type="text" placeholder="Email Address" value={emailForSignIn}
                                                         onChange={(e) => setEmailForSignIn(e.target.value)}/>
                        <LoginStyleComponents.StylePasswordInput
                            placeholder="Password"
                            value={passwordForSignIn}
                            onChange={(e) => setPasswordForSignIn(e.target.value)}
                            iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                        />
                        <LoginStyleComponents.Anchor>
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </LoginStyleComponents.Anchor>
                        <Button size={"large"} type={"primary"} shape="round" loading={isLogInPending}
                                onClick={handleSubmitSignIn}>
                            Sign In
                        </Button>
                        <Divider>OR</Divider>
                        <Button type="primary" size={"large"} shape="round" icon={<GoogleOutlined/>}
                                onClick={continueWithGoogle}>Continue With
                            Google</Button>

                    </LoginStyleComponents.Form>
                </LoginStyleComponents.SignInContainer>
                <LoginStyleComponents.OverlayContainer signingIn={signIn}>
                    <LoginStyleComponents.Overlay signingIn={signIn}>
                        <LoginStyleComponents.LeftOverlayPanel signingIn={signIn}>
                            <LoginStyleComponents.Title>Welcome Back!</LoginStyleComponents.Title>
                            <LoginStyleComponents.Paragraph>
                                To keep connected with us please login with your personal info
                            </LoginStyleComponents.Paragraph>
                            <LoginStyleComponents.GhostButton size={"large"} shape="round"
                                                              onClick={() => setSignIn(true)}>
                                Sign In
                            </LoginStyleComponents.GhostButton>
                        </LoginStyleComponents.LeftOverlayPanel>
                        <LoginStyleComponents.RightOverlayPanel signingIn={signIn}>
                            <LoginStyleComponents.Title>
                                ProjeX
                            </LoginStyleComponents.Title>
                            <LoginStyleComponents.Paragraph>
                                Create a new account unless you already have one, and start journey with us
                            </LoginStyleComponents.Paragraph>
                            <LoginStyleComponents.GhostButton size={"large"} shape="round"
                                                              onClick={() => setSignIn(false)}>
                                Sign Up
                            </LoginStyleComponents.GhostButton>
                        </LoginStyleComponents.RightOverlayPanel>
                    </LoginStyleComponents.Overlay>
                </LoginStyleComponents.OverlayContainer>
            </LoginStyleComponents.Container>
        </LoginStyleComponents.ParentContainer>);
}

export default Login;