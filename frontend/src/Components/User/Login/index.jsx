import React, {useState} from "react";
import {useDispatch} from 'react-redux';
import {login} from '../../../Store/Slice/User/loginSlice';
import {signUp} from '../../../Store/Slice/User/signupSlice';
import {Link, useNavigate} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Toast from "../../../Shared/Components/Toast"
import Loader from "../../../Utils/Loader"
import * as LoginStyleComponents from "./Style"
import {displayErrorMessage, displaySuccessMessage} from "../../../Shared/notify"
import {AxiosError} from "axios";
import {StatusCodes} from "http-status-codes";
import {DataSyncer} from "../../../Store/Slice/DataSyncerSlice";
import {useIsLogInPending, useIsSingUpPending} from "../../../Store/Selector/Selector";

function Login() {
    const dispatch = useDispatch();

    const isLogInPending = useIsLogInPending();
    const isSingUpPending = useIsSingUpPending();

    const [signIn, setSignIn] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameForSignIn, setUsernameForSignIn] = useState('');
    const [passwordForSignIn, setPasswordForSignIn] = useState('');

    const navigate = useNavigate();

    const handleSubmitSignIn = (e) => {
        e.preventDefault();

        dispatch(login({username: usernameForSignIn, password: passwordForSignIn})).unwrap()
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
            {isLogInPending || isSingUpPending ? (
                <Loader/>
            ) : (
                <LoginStyleComponents.Container>
                    <LoginStyleComponents.SignUpContainer signingIn={signIn}>
                        <LoginStyleComponents.Form onSubmit={handleSubmitSignUp}>
                            <LoginStyleComponents.Title>Create Account</LoginStyleComponents.Title>
                            <LoginStyleComponents.Input type="text" placeholder="Name" value={name}
                                                        onChange={(e) => setName(e.target.value)}/>
                            <LoginStyleComponents.Input type="email" placeholder="Email" value={email}
                                                        onChange={(e) => setEmail(e.target.value)}/>
                            <LoginStyleComponents.Input type="password" placeholder="Password" value={password}
                                                        onChange={(e) => setPassword(e.target.value)}/>
                            <LoginStyleComponents.Button>Sign Up</LoginStyleComponents.Button>
                        </LoginStyleComponents.Form>
                    </LoginStyleComponents.SignUpContainer>
                    <LoginStyleComponents.SignInContainer signingIn={signIn}>
                        <LoginStyleComponents.Form onSubmit={handleSubmitSignIn}>
                            <LoginStyleComponents.Title>Sign In</LoginStyleComponents.Title>
                            <LoginStyleComponents.Input type="text" placeholder="Name" value={usernameForSignIn}
                                                        onChange={(e) => setUsernameForSignIn(e.target.value)}/>
                            <LoginStyleComponents.Input type="password" placeholder="Password" value={passwordForSignIn}
                                                        onChange={(e) => setPasswordForSignIn(e.target.value)}/>
                            <LoginStyleComponents.Anchor>
                                <Link to="/forgot-password">Forgot Password?</Link>
                                <br></br>
                                <br></br>
                            </LoginStyleComponents.Anchor>
                            <LoginStyleComponents.Button>Sign In</LoginStyleComponents.Button>
                        </LoginStyleComponents.Form>
                    </LoginStyleComponents.SignInContainer>
                    <LoginStyleComponents.OverlayContainer signingIn={signIn}>
                        <LoginStyleComponents.Overlay signingIn={signIn}>
                            <LoginStyleComponents.LeftOverlayPanel signingIn={signIn}>
                                <LoginStyleComponents.Title>Welcome Back!</LoginStyleComponents.Title>
                                <LoginStyleComponents.Paragraph>
                                    To keep connected with us please login with your personal info
                                </LoginStyleComponents.Paragraph>
                                <LoginStyleComponents.GhostButton onClick={() => setSignIn(true)}>
                                    Sign In
                                </LoginStyleComponents.GhostButton>
                            </LoginStyleComponents.LeftOverlayPanel>
                            <LoginStyleComponents.RightOverlayPanel signingIn={signIn}>
                                <LoginStyleComponents.Title>Nexius</LoginStyleComponents.Title>
                                <LoginStyleComponents.Paragraph>
                                    Enter your personal details and start journey with us
                                </LoginStyleComponents.Paragraph>
                                <LoginStyleComponents.GhostButton onClick={() => setSignIn(false)}>
                                    Sign Up
                                </LoginStyleComponents.GhostButton>
                            </LoginStyleComponents.RightOverlayPanel>
                        </LoginStyleComponents.Overlay>
                    </LoginStyleComponents.OverlayContainer>
                </LoginStyleComponents.Container>
            )}
        </LoginStyleComponents.ParentContainer>);
}

export default Login;