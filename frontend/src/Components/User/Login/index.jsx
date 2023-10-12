import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from "react-router-dom";
import {userLogin, registerUser} from '../../../Store/Slice/auth/authActions'
import 'react-toastify/dist/ReactToastify.css';
import Toast from "../../../Shared/Components/Toast"
import * as LoginStyleComponents from "./Style"
import {displayErrorMessage, displaySuccessMessage} from "../../../Shared/notify"
import {EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined} from '@ant-design/icons';
import {Button, Divider} from 'antd';
import {StatusCodes} from "http-status-codes";
import apiRequest from "../../../Utils/apiRequest";
import {REACT_APP_GOOGLE_AUTH_REDIRECT_URL} from "../../../Utils/envConstants";

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {loading} = useSelector((state) => state.auth);

    const [signIn, setSignIn] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameForSignIn, setUsernameForSignIn] = useState('');
    const [passwordForSignIn, setPasswordForSignIn] = useState('');


    const handleSubmitSignIn = async (e) => {
        e.preventDefault();
        await dispatch(userLogin({username: usernameForSignIn, password: passwordForSignIn})).unwrap()
            .then(response => {
                response.status === StatusCodes.OK && navigate('/project')
            })
            .catch(error => {
                displayErrorMessage(error)
            })
    };


    const continueWithGoogle = async () => {
        try {
            const redirectUri = `${REACT_APP_GOOGLE_AUTH_REDIRECT_URL}`;
            const response = await apiRequest.get(`/auth/o/google-oauth2/?redirect_uri=${encodeURIComponent(redirectUri)}`);
            window.location.replace(response.data.authorization_url);
        } catch (error) {
            if (error.response && error.response.data.message) {
                displayErrorMessage(error.response.data.message)
            } else {
                displayErrorMessage(error.message)
            }
        }
    };

    const handleSubmitSignUp = async (e) => {
        e.preventDefault();
        if (!username || !email || !password) {
            displayErrorMessage('Please fill in all fields.');
            return;
        }
        await dispatch(registerUser({username: username, email: email, password: password})).unwrap()
            .then(response => {
                    response.status === StatusCodes.CREATED &&
                    displaySuccessMessage(`Thank you for registering. Activate your account via the email link. Contact us for help.`)
                }
            )
            .catch(error => {
                if (error !== null && typeof (error) === 'object') {
                    const errorFields = ['username', 'email', 'password'];
                    errorFields.forEach((field) => {
                        if (error[field]) {
                            error[field].forEach((errorMsg) => {
                                displayErrorMessage(`${errorMsg}`)
                            })
                        }
                    });
                }
                if (error !== null && typeof (error) !== 'object' && !Array.isArray(error)) {
                    displayErrorMessage(error)
                }
            })
    }

    return (
        <LoginStyleComponents.ParentContainer>
            <Toast/>
            <LoginStyleComponents.Container>
                <LoginStyleComponents.SignUpContainer signingIn={signIn}>
                    <LoginStyleComponents.Form onSubmit={handleSubmitSignUp}>
                        <LoginStyleComponents.Title>Create Account</LoginStyleComponents.Title>
                        <LoginStyleComponents.StyleInput type="text" placeholder="Enter Username" value={username}
                                                         onChange={(e) => setUsername(e.target.value)}/>
                        <LoginStyleComponents.StyleInput type="email" placeholder="Email" value={email}
                                                         onChange={(e) => setEmail(e.target.value)}/>
                        <LoginStyleComponents.StylePasswordInput placeholder="Password" value={password}
                                                                 onChange={(e) => setPassword(e.target.value)}
                                                                 iconRender={(visible) => (visible ? <EyeTwoTone/> :
                                                                     <EyeInvisibleOutlined/>)}
                        />
                        <Button
                            size={"large"} type={"primary"} shape="round" loading={loading}
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
                        <LoginStyleComponents.StyleInput type="text" placeholder="Enter your Username"
                                                         value={usernameForSignIn}
                                                         onChange={(e) => setUsernameForSignIn(e.target.value)}/>
                        <LoginStyleComponents.StylePasswordInput
                            placeholder="Password"
                            value={passwordForSignIn}
                            onChange={(e) => setPasswordForSignIn(e.target.value)}
                            iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                        />
                        <LoginStyleComponents.Anchor>
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </LoginStyleComponents.Anchor>
                        <Button size={"large"} type={"primary"} shape="round" loading={loading}
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