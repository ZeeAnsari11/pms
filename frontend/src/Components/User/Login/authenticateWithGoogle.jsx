import React, { useState, useEffect } from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {googleAuthenticate, userLogin} from '../../../Store/Slice/auth/authActions'
import {useDispatch, useSelector} from "react-redux";
import {StatusCodes} from "http-status-codes";
import {displayErrorMessage} from "../../../Shared/notify";
import Loading from "../../../Utils/Loader";
import Url from "../../../Utils/Url";

const AuthenticateWithGoogle = () => {

    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const googleState = searchParams.get('state');
        const googleCode = searchParams.get('code');

         dispatch(googleAuthenticate({ state: googleState, code: googleCode })).unwrap()
            .then(response => {response.status === StatusCodes.CREATED && navigate('/project')})
            .catch(error => {navigate('/')})
    }, [location.search]);


    if (loading) {
        return (<Loading/>);
    }
};

export default AuthenticateWithGoogle;
