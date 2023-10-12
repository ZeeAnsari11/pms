import React, {useEffect, useState} from 'react';
import * as UserProfileComponents from './Style';
import {faBriefcase, faCalendar, faEdit, faSitemap} from '@fortawesome/free-solid-svg-icons';
import { displayErrorMessage } from '../../../Shared/notify'
import Toast from '../../../Shared/Components/Toast'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Editable from '../Editable/Editable';
import NavBar from '../../Dashboard/Navbar';
import axios from 'axios';
import {REACT_APP_DOMAIN} from "../../../Utils/envConstants";

const UserProfilePage = () => {
    const [userData, setUserData] = useState({});

    let authToken = localStorage.getItem('auth_token')

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${REACT_APP_DOMAIN}/api/userprofile/`, {
                    headers: {"Authorization": `Token ${authToken}`}
                });
                setUserData(response.data);

            } catch (error) {
                displayErrorMessage(error);
            }
        }
        fetchUserData();
    }, []);

    return (
        <div>
            <NavBar/>
            <Toast />
            <UserProfileComponents.ProfileWrapper>
                <UserProfileComponents.ProfileHeader>
                    <UserProfileComponents.ProfileImage src={`${userData?.image}`} alt="Profile Picture"/>
                    {/*<ProfileImage>{userData?.user?.image}</ProfileImage>*/}
                    <div>
                        <UserProfileComponents.ProfileName>{userData?.user?.username}</UserProfileComponents.ProfileName>
                        <UserProfileComponents.ProfileEmail>{userData?.user?.email}</UserProfileComponents.ProfileEmail>
                    </div>
                    <UserProfileComponents.EditIcon className="fas fa-edit">
                        <FontAwesomeIcon icon={faEdit}/>
                    </UserProfileComponents.EditIcon>
                </UserProfileComponents.ProfileHeader>
                <UserProfileComponents.ProfileDetailsWrapper>
                    <UserProfileComponents.PersonalDetailHeading>Personal Information</UserProfileComponents.PersonalDetailHeading>
                    <UserProfileComponents.HorizontalLine></UserProfileComponents.HorizontalLine>
                    <UserProfileComponents.ProfileDetailsLabel>Work</UserProfileComponents.ProfileDetailsLabel>
                    <UserProfileComponents.ProfileDetailsValue><FontAwesomeIcon icon={faBriefcase}/> Organization </UserProfileComponents.ProfileDetailsValue>
                    <Editable placeholder={"Enter Organization Name"} frontendText={userData?.company?.company_name}/>
                    {/*<span>{userData?.company?.company_name}</span>*/}
                    <UserProfileComponents.ProfileDetailsValue><FontAwesomeIcon icon={faSitemap}/> Department </UserProfileComponents.ProfileDetailsValue>
                    <Editable placeholder={"Enter Department Name"} frontendText={"Enter Department Name"}/>
                    {/*<span>{userData?.department}</span>*/}
                    <UserProfileComponents.DateValue><FontAwesomeIcon icon={faCalendar}/> Started work on </UserProfileComponents.DateValue>
                    {/*<DatePicker style={{marginLeft: "20px"}} onChange={handleDateChange}/>*/}
                    <span>{userData?.joining_date}</span>
                </UserProfileComponents.ProfileDetailsWrapper>
            </UserProfileComponents.ProfileWrapper>
        </div>
    );
};

export default UserProfilePage;
