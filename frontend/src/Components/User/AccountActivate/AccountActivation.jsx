import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const ForgotPasswordContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 10px;
  border: 2px solid var(--primary-color);
  padding: 20px;
  width: 510px;
  height: 300px;
`;

const Button = styled.button`
  width: 255px;
  border: none;
  border-radius: 20px;
  background-color: var(--primary-color);
  cursor: pointer;
  transition: all 0.3s ease-in-out 0s;
  font-size: 13px;
  font-weight: bolder;
  padding: 12px 49px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-right: 55px;

  &:last-child {
    margin-left: 54px;
  }

  &:hover {
    background-color: #000000;
    color: #ffffff;
    border-color: whitesmoke;
  }
`;

const AccountActivation = () => {
    const [activated, setActivated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const uid = searchParams.get('uid');
        const token = searchParams.get('token');

        axios.post(`${process.env.REACT_APP_HOST}/api/auth/users/activation/`, {uid, token})
            .then(response => {
                if (response.status === 204) {
                    console.log('Your Account is activated');
                    setActivated(true);
                    sessionStorage.setItem('activated', 'true');
                } else {
                    console.error('Error sending password reset email:');
                }
            })
            .catch(error => {
                console.error('Error:');
            });
    }, [location.search]);

    useEffect(() => {
        const isActivated = sessionStorage.getItem('activated');
        if (isActivated) {
            setActivated(true);
        }
    }, []);

    const handleSignInClick = () => {
        navigate('/');
    };

    return (
        <ForgotPasswordContainer>
            {!activated && (
                <span style={{color: 'white', fontWeight: 'bold'}}>
          Please wait, your account is activating.
        </span>
            )}
            {activated && (
                <React.Fragment>
          <span style={{color: 'white', fontWeight: 'bold', marginBottom: '20px'}}>
            Congratulations! Your account has been activated.
          </span>
                    <Button onClick={handleSignInClick}>Go to Sign In Page</Button>
                </React.Fragment>
            )}
        </ForgotPasswordContainer>
    );
};

export default AccountActivation;
