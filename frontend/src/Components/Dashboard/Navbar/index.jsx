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
import {projectItems, yourWorkItems, teamItems, notificationsItems, helpItems} from "./Dropdownitems";
import { accountItems } from "../../User/Logout/index"
import {MdKeyboardArrowDown} from 'react-icons/md'
import {IoMdNotifications} from 'react-icons/io'
import {RxAvatar} from 'react-icons/rx'
import {AiFillQuestionCircle} from 'react-icons/ai'
import SearchBar from './SearchBar/index'
import {Link} from "react-router-dom";
import CreateTicket from "../CreateTicket/CreateTicket";

function NavBar() {
    const [extendNavbar, setExtendNavbar] = useState(false);
    const [showModal, setshowModal] = useState(false);

    const handleCreateButtonClick = () => {
        setshowModal(true);
    }

    return (
        <>
            {showModal && (
                <CreateTicket
                    onClose={() => setshowModal(false)}
                />
            )}

            <NavbarContainer extendNavbar={extendNavbar}>
                <NavbarInnerContainer>
                    <LeftContainer>
                        <Link to="/project">
                            <Logo src='http://localhost:3000/phpstudios_logo.png' alt="PHPStudios"></Logo>
                        </Link>
                        <NavbarLinkContainer>
                            <OpenLinksButton
                                onClick={() => {
                                    setExtendNavbar((curr) => !curr);
                                }}
                            >
                                {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
                            </OpenLinksButton>
                            <Dropdown items={yourWorkItems} name="Your Work"
                                        icon={<MdKeyboardArrowDown size={20} style={{
                                            marginRight: "10px", cursor: 'pointer',
                                            marginLeft: "-7px"
                                        }}/>}/>

                            <Dropdown items={projectItems} name='Projects' icon={<MdKeyboardArrowDown size={20} style={{
                                marginRight: "10px", cursor: 'pointer',
                                marginLeft: "-7px"
                            }}/>}/>
                            <Dropdown items={teamItems} name='Teams' icon={<MdKeyboardArrowDown size={20} style={{
                                marginRight: "10px", cursor: 'pointer',
                                marginLeft: "-8px"
                            }}/>}/>

                        </NavbarLinkContainer>
                        <Button onClick={handleCreateButtonClick}>Create</Button>
                    </LeftContainer>
                    <RightContainer>
                        <SearchBar/>
                        <Dropdown minWidth="450px" items={notificationsItems}
                                  name={<IoMdNotifications size={24} style={{marginLeft: "10px"}}/>}/>
                        <Dropdown minWidth="350px" items={helpItems}
                                  name={<AiFillQuestionCircle size={24} style={{marginLeft: "10px"}}/>}/>
                        <Dropdown items={accountItems} name={<RxAvatar size={24} style={{marginLeft: "10px"}}/>}/>
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
        </>
    );
}

export default NavBar;