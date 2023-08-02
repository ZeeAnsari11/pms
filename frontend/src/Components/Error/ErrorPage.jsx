import React from 'react';
import {Button, Result} from 'antd';
import {useNavigate} from "react-router-dom";


const ErrorPage = ({status}) => {
    const navigate = useNavigate();
    let message;

    switch (status) {
        case 403:
            message = 'Sorry, you are not authorized to access this page.';
            break;
        case 404:
            message = 'Sorry, the page you visited does not exist.';
            break;
        case 500:
            message = 'Sorry, something went wrong.';
            break;
        default:
            message = 'Sorry, An unexpected error occurred.';
            break;
    }

    const handleBackHome = () => {
        navigate('/project');
    }
    return (
        <div style={{paddingTop: "20px"}}>
            <Result
                status={status}
                title={status}
                subTitle={message}
                extra={<Button type="primary" onClick={handleBackHome}>Back Home</Button>}
            />
        </div>
    );
};

export default ErrorPage;
