import React, {useState} from 'react';
import {
    SidebarContainer,
    Icon,
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
    SideBtnWrap,
    SidebarRoute,
    CustomModal
} from "./SidebarElements";
import Login from "../../../User/Login";

const Sidebar = ({isOpen, toggle}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon/>
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="about" onClick={toggle}>About</SidebarLink>
                    <SidebarLink to="discover" onClick={toggle}>Discover</SidebarLink>
                    <SidebarLink to="services" onClick={toggle}>Services</SidebarLink>
                    <SidebarLink to="pricing" onClick={toggle}>Pricing</SidebarLink>
                    <SidebarLink to="signup" onClick={toggle}>Sign Up</SidebarLink>
                </SidebarMenu>
                <SideBtnWrap>
                    <SidebarRoute onClick={showModal}>Sign In</SidebarRoute>
                </SideBtnWrap>
                <CustomModal
                    open={modalVisible}
                    onCancel={hideModal}
                    footer={null}
                    width={'fit-content'}
                    destroyOnClose
                    maskClosable={true}
                    closeIcon={false}
                >
                    <Login/>
                </CustomModal>
            </SidebarWrapper>
        </SidebarContainer>
    );
};

export default Sidebar;
