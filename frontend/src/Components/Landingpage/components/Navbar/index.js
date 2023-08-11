import React, {useState, useEffect} from 'react';
import {FaBars} from 'react-icons/fa';
import {IconContext} from 'react-icons/lib';
import {animateScroll as scroll} from 'react-scroll';
import {
    MenuIcon,
    Nav,
    NavbarContainer,
    NavItem,
    NavLink,
    NavLogo,
    NavMenu,
    NavBtn,
    NavBtnLink,
    LogoImage,
    CustomModal
} from './NavbarElements';
import Login from "../../../User/Login";

const Navbar = ({toggle}) => {
    const [scrollNav, setScrollNav] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const changeNav = () => {
        if (window.scrollY >= 80) {
            setScrollNav(true);
        } else {
            setScrollNav(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeNav);
    }, []);

    const toggleHome = () => {
        scroll.scrollToTop();
    };

    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <IconContext.Provider value={{color: '#000'}}>
                <Nav scrollNav={scrollNav}>
                    <NavbarContainer>
                        <NavLogo to='/' onClick={toggleHome}>
                            <LogoImage src="/Projex-Logo.webp"/>
                        </NavLogo>
                        <MenuIcon onClick={toggle}>
                            <FaBars/>
                        </MenuIcon>
                        <NavMenu>
                            <NavItem>
                                <NavLink to='about' smooth={true} duration={500} spy={true} exact='true'
                                         offset={-80}>About</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to='discover' smooth={true} duration={500} spy={true} exact='true'
                                         offset={-80}>Discover</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to='services' smooth={true} duration={500} spy={true} exact='true'
                                         offset={-80}>Services</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to='pricing' smooth={true} duration={500} spy={true} exact='true'
                                         offset={-80}>Pricing</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to='signup' smooth={true} duration={500} spy={true} exact='true' offset={-80}>Sign
                                    Up</NavLink>
                            </NavItem>
                        </NavMenu>
                        <NavBtn>
                            <NavBtnLink onClick={showModal}>Sign In</NavBtnLink>
                        </NavBtn>
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
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    )
        ;
};

export default Navbar;
