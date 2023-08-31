import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {
    NavbarContainer,
    LeftContainer,
    RightContainer,
    NavbarExtendedContainer,
    NavbarInnerContainer,
    NavbarLinkContainer,
    Logo,
    OpenLinksButton,
    NavbarLinkExtended,
} from "./Styles";
import Dropdown from './NavBarDropdown'
import {
    adminUserProjectItems,
    simpleUserProjectItems,
    yourWorkItems,
    teamItems,
    notificationsItems,
    helpItems
} from "./Dropdownitems";
import {simpleUseraccountItems, adminUseraccountItems} from "../../User/Logout/index"
import {MdKeyboardArrowDown} from 'react-icons/md'
import {IoMdNotifications} from 'react-icons/io'
import {RxAvatar} from 'react-icons/rx'
import {AiFillQuestionCircle} from 'react-icons/ai'
import SearchBar from './SearchBar/index'
import {Link} from "react-router-dom";
import CreateTicket from "../CreateTicket/CreateTicket";
import Avatar from "react-avatar";
import {Button} from "antd"
import Loading from "../../../Utils/Loader";
import { useGetUserDetailsQuery } from '../../../Store/Slice/auth/authService'
import { setUserInfo } from '../../../Store/Slice/auth/authSlice'

function NavBar() {
    const dispatch = useDispatch()

    const { userInfo } = useSelector((state) => state.auth)
    const isSuperuser = userInfo?.user?.is_superuser;


    const [extendNavbar, setExtendNavbar] = useState(false);
    const [showModal, setShowModal] = useState(false);

      const { data, isFetching } =  useGetUserDetailsQuery('userDetails', {
          // perform a refetch every 15 mins
          pollingInterval: 900000,
      })

    console.log("User Data through the RTK query", data) // user object

    const handleCreateButtonClick = () => {
        setShowModal(true);
    }

    useEffect(() => {
        if (data) dispatch(setUserInfo(data))
    }, [data, dispatch])

    return (
        <>
            {showModal && (
                <CreateTicket
                    onClose={() => setShowModal(false)}
                />
            )}

            <NavbarContainer extendNavbar={extendNavbar}>
                <NavbarInnerContainer>
                    <LeftContainer>
                        <Link to="/project">
                            <Logo src='/Projex-Logo.webp' alt="ProjeX"></Logo>
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

                            <Dropdown items={isSuperuser ? adminUserProjectItems : simpleUserProjectItems}
                                        name='Projects' icon={<MdKeyboardArrowDown size={20} style={{
                                marginRight: "10px", cursor: 'pointer',
                                marginLeft: "-7px"
                            }}/>}/>
                            <Dropdown items={teamItems} name='Teams' icon={<MdKeyboardArrowDown size={20} style={{
                                marginRight: "10px", cursor: 'pointer',
                                marginLeft: "-8px"
                            }}/>}/>

                        </NavbarLinkContainer>
                        <Button type={"primary"} onClick={handleCreateButtonClick}>Create</Button>
                    </LeftContainer>
                    <RightContainer>
                        <SearchBar/>
                        <Dropdown minWidth="450px" items={notificationsItems}
                                    name={<IoMdNotifications size={24} style={{marginLeft: "10px"}}/>}/>
                        <Dropdown minWidth="350px" items={helpItems}
                                    name={<AiFillQuestionCircle size={24} style={{marginLeft: "10px"}}/>}/>
                        <Dropdown
                            items={isSuperuser ? adminUseraccountItems : simpleUseraccountItems}
                            name={
                                userInfo ? (
                                    <Avatar
                                        name={userInfo?.user?.username}
                                        src={`${process.env.REACT_APP_DOMAIN}${userInfo?.image}`}
                                        size={28}
                                        round={true}
                                        title={userInfo?.user?.email}
                                        color="#DE350B"
                                        style={{marginLeft: "10px"}}
                                    />
                                ) : (
                                    <RxAvatar size={24} style={{marginLeft: "10px"}}/>
                                )
                            }
                        />

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