import React, {useState} from "react";
import * as Components from "../../../StyledComponents/Components.js";
import {Link} from "react-router-dom";
import "./index.css"
import axios from 'axios';


function Login() {
    const [signIn, toggle] = React.useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            username: name, email: email, password: password,
        };

        // axios.post('http://0.0.0.0:8000/api/auth/users/', data)
        // .then(response => {
        //   console.log(response.data);
        // })
        // .catch(error => {
        //   console.error(error);
        // });

        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log(`data: ${data.username}`);
        console.log(`data: ${data.email}`);
        console.log(`data: ${data.password}`);
    }

    return (<div className="Container">
            <Components.Container>
                <Components.SignUpContainer signingIn={signIn}>
                    <Components.Form onSubmit={handleSubmit}>
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
                    <Components.Form>
                        <Components.Title>Sign In</Components.Title>
                        <Components.Input type="email" placeholder="Email"/>
                        <Components.Input type="password" placeholder="Password"/>
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
        </div>);
}

export default Login;