import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import {FiAlertTriangle} from 'react-icons/fi'
import { Modal, Button } from 'antd';


const SessionAlertPage = ({hasAuthToken})  => {
    const [showModal, setShowModal] = useState(hasAuthToken);

    const navigate = useNavigate();

    const handleLogin = () => {
        setShowModal(false);
        navigate('/');
    };

    return (
        <>
            <Modal
                title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FiAlertTriangle size={40} style={{ fontSize: '56px', color: 'mediumvioletred' }} />
                        <h1 style={{ fontSize: '22px', marginLeft: '10px' }}>Your session has expired</h1>
                    </div>
                }
                centered
                open={showModal}
                closable={false}
                keyboard={false}
                footer={[
                    <Button key="login" type="primary" onClick={() => handleLogin()}>
                        Login
                    </Button>,
                ]}
            >
                <p>Please log in again to continue using the app.</p>
            </Modal>
        </>
    );
}


export default SessionAlertPage;
