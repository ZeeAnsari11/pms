import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../../Store/Slice/User/loginSlice';
import {signUp} from '../../../Store/Slice/User/signupSlice';
import apiRequest from '../../../Utils/apiRequest';
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {colorCode} from "../../../Configurations/colors";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../../Utils/Loader"

export const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 678px;
  max-width: 100%;
  min-height: 400px;
`;

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${props =>
          props.signingIn !== true
                  ? `
  transform: translateX(100%);
	opacity: 1;
	z-index: 5;
	`
                  : null}
`;

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${props => (props.signingIn !== true ? `transform: translateX(100%);` : null)}
`;

export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;

export const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid whitesmoke;
  background-color: ${colorCode};
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #000000;
  }

`;

export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
  color: #ffffff;

  &:hover {
    background-color: #000000;
  }
`;

export const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${props =>
          props.signingIn !== true ? `transform: translateX(-100%);` : null}
`;

export const Overlay = styled.div`
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, ${colorCode}, ${colorCode});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${props => (props.signingIn !== true ? `transform: translateX(50%);` : null)}
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  left: -40px;
  ${props => (props.signingIn !== true ? `transform: translateX(0);` : null)}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: -40px;
  ${props => (props.signingIn !== true ? `transform: translateX(20%);` : null)}
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

export const StyledError = styled.p`
  font-size: 9px;
  font-weight: bold;
  color: whitesmoke;
`;

export const ParentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Set the height of the container to fill the viewport */
`;


function Login() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.login.authToken);
    const isLoginPending = useSelector((state) => state.login.loading);
    const isSignupPending = useSelector((state) => state.signUp.loading);
    const signupSuccessMessage = useSelector((state) => state.signUp.successMessage);

    const [signIn, setSignIn] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameForSignIn, setUsernameForSignIn] = useState('');
    const [passwordForSignIn, setPasswordForSignIn] = useState('');

    const navigate = useNavigate();

    const errorMessage = (message) => {
        toast.error(message, {
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

    const successMessage = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const handleSubmitSignIn = (e) => {
        e.preventDefault();

        dispatch(login({username: usernameForSignIn, password: passwordForSignIn}))
            .then((result) => {
                if (result.payload.auth_token) {
                    localStorage.setItem('auth_token', result.payload.auth_token); // Store auth token in local storage
                    navigate('/project');
                } else {
                    errorMessage('Incorrect username or password. Please try again.');
                }
            })
            .catch((error) => {
                console.log(error);
                errorMessage('Incorrect username or password. Please try again.');
            });
    };


    const handleSubmitSignUp = (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            errorMessage('Please fill in all fields.');
            return;
        }

        dispatch(signUp({name, email, password}))
            .then(() => {
                if (signupSuccessMessage) {
                    successMessage(signupSuccessMessage);
                }
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    if (error.response.data.username) {
                        const usernameErrors = error.response.data.username;
                        for (let i = 0; i < usernameErrors.length; i++) {
                            errorMessage(usernameErrors[i]);
                        }
                    }
                    if (error.response.data.password) {
                        const passwordErrors = error.response.data.password;
                        for (let i = 0; i < passwordErrors.length; i++) {
                            errorMessage(passwordErrors[i]);
                        }
                    }
                    if (error.response.data.email) {
                        const emailErrors = error.response.data.email;
                        for (let i = 0; i < emailErrors.length; i++) {
                            errorMessage(emailErrors[i]);
                        }
                    }
                } else {
                    errorMessage('An error occurred while signing up.');
                }
            });


    }

    return (
        <ParentContainer>
            {isLoginPending ? (
                <Loader/>
            ) : (
                <Container>
                    <SignUpContainer signingIn={signIn}>
                        <Form onSubmit={handleSubmitSignUp}>
                            <Title>Create Account</Title>
                            <Input type="text" placeholder="Name" value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                            <Input type="email" placeholder="Email" value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                            <Input type="password" placeholder="Password" value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                            <Button>Sign Up</Button>
                        </Form>
                    </SignUpContainer>
                    <SignInContainer signingIn={signIn}>
                        <Form onSubmit={handleSubmitSignIn}>
                            <Title>Sign In</Title>
                            <Input type="text" placeholder="Name" value={usernameForSignIn}
                                   onChange={(e) => setUsernameForSignIn(e.target.value)}/>
                            <Input type="password" placeholder="Password" value={passwordForSignIn}
                                   onChange={(e) => setPasswordForSignIn(e.target.value)}/>
                            <Anchor>
                                <Link to="/forgot-password">Forgot Password?</Link>
                                <br></br>
                                <br></br>
                            </Anchor>
                            <Button>Sign In</Button>
                        </Form>
                    </SignInContainer>
                    <OverlayContainer signingIn={signIn}>
                        <Overlay signingIn={signIn}>
                            <LeftOverlayPanel signingIn={signIn}>
                                <Title>Welcome Back!</Title>
                                <Paragraph>
                                    To keep connected with us please login with your personal info
                                </Paragraph>
                                <GhostButton onClick={() => setSignIn(true)}>
                                    Sign In
                                </GhostButton>
                            </LeftOverlayPanel>
                            <RightOverlayPanel signingIn={signIn}>
                                <Title>PHP Studios!</Title>
                                <Paragraph>
                                    Enter your personal details and start journey with us
                                </Paragraph>
                                <GhostButton onClick={() => setSignIn(false)}>
                                    Sign Up
                                </GhostButton>
                            </RightOverlayPanel>
                        </Overlay>
                    </OverlayContainer>
                </Container>
            )}
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