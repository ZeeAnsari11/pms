import React, {useState} from "react";
import {
    NavbarContainer,
    LeftContainer,
    RightContainer,
    NavbarExtendedContainer,
    NavbarInnerContainer,
    NavbarLinkContainer,
    NavbarLink,
    Logo,
    OpenLinksButton,
    Button,
    NavbarLinkExtended,
} from "./styles";
import Dropdown from '../Dropdown/index'
import {projectitems, yourworkitems, teamitems, notificationsitems,helpitems} from "./Dropdownitems";
import {MdKeyboardArrowDown} from 'react-icons/md'
import {IoMdNotifications} from 'react-icons/io'
import {RxAvatar} from 'react-icons/rx'
import {AiFillQuestionCircle} from 'react-icons/ai'
import SearchBar from './SearchBar/index'

function NavBar() {
    const [extendNavbar, setExtendNavbar] = useState(false);

    return (
        <NavbarContainer extendNavbar={extendNavbar}>
            <NavbarInnerContainer>
                <LeftContainer>
                    <Logo src="https://lh3.google.com/u/0/d/1IxWCTZL5L9PRa1DwoKw8wu8EA7Ez_hT0=w2560-h848-iv1"
                          alt="PHPStudios"></Logo>
                    <NavbarLinkContainer>
                        {/*<NavbarLink to="/"> Projects</NavbarLink>*/}
                        {/*<NavbarLink to="/filters"> Filters</NavbarLink>*/}
                        {/*<NavbarLink to="/contact"> Dashboard</NavbarLink>*/}
                        {/*<NavbarLink to="/about"> About Us</NavbarLink>*/}
                        <OpenLinksButton
                            onClick={() => {
                                setExtendNavbar((curr) => !curr);
                            }}
                        >
                            {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
                        </OpenLinksButton>
                        <Dropdown items={yourworkitems} name="Your Work" icon={<MdKeyboardArrowDown size={20} style={{
                            marginRight: "10px", cursor: 'pointer',
                            marginLeft: "-7px"
                        }}/>}/>

                        <Dropdown items={projectitems} name='Projects' icon={<MdKeyboardArrowDown size={20} style={{
                            marginRight: "10px", cursor: 'pointer',
                            marginLeft: "-7px"
                        }}/>}/>
                        <Dropdown items={teamitems} name='Teams' icon={<MdKeyboardArrowDown size={20} style={{
                            marginRight: "10px", cursor: 'pointer',
                            marginLeft: "-8px"
                        }}/>}/>

                    </NavbarLinkContainer>
                    <Button><NavbarLink to='/create'>Create</NavbarLink></Button>
                </LeftContainer>
                <RightContainer>
                    {/*<Logo src={LogoImg}></Logo>*/}
                    <SearchBar />
                    <Dropdown minWidth="450px" items={notificationsitems} name={<IoMdNotifications size={24} style={{marginLeft: "10px"}}/>}/>
                    <Dropdown minWidth="350px" items={helpitems}
                              name={<AiFillQuestionCircle size={24} style={{marginLeft: "10px"}}/>}/>

                </RightContainer>
            </NavbarInnerContainer>
            {extendNavbar && (
                <NavbarExtendedContainer>
                    <NavbarLinkExtended to="/"> Projects</NavbarLinkExtended>
                    <NavbarLinkExtended to="/products"> Filters</NavbarLinkExtended>
                    <NavbarLinkExtended to="/contact"> Dashboard</NavbarLinkExtended>
                    <NavbarLinkExtended to="/about"> About Us</NavbarLinkExtended>
                </NavbarExtendedContainer>
            )}
        </NavbarContainer>
    );
}

export default NavBar;