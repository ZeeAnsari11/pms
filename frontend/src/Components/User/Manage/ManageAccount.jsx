import React, { useEffect, useState } from 'react';
import NavBar from "../../Dashboard/Navbar";
import ProfilePhotouploader from "../Manage/ProfilePhotouploader";
import GenericSelectField from "../../Dashboard/SelectFields/GenericSelectField";
import UserSidebar from "../../Dashboard/Sidebar/UserSidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Toast from "../../../Shared/Components/Toast"
import { displayErrorMessage, displaySuccessMessage } from "../../../Shared/notify"
import {faImage} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import apiRequest from '../../../Utils/apiRequest';
import {Input} from 'antd'

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  margin-left: 0;
  width: 100%;
  position: relative;


  @media (max-width: 768px) {
    margin-left: 20px;
    margin-right: 20px;
  }
`;


const SubHeading = styled.h2`
  font-size: 1.5em;
  //margin-top: 30px;
  margin-bottom: 35px;
  padding-left: 20px;

  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`;

const ImageWrapper = styled.div`
  margin-top: 10px;
  background-color: #FFFFFF;
  width: 100%;
  height: 212px;
  box-shadow: var(--ds-shadow-raised, 0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px 1px rgba(9, 30, 66, 0.13));

  @media (max-width: 768px) {
    height: 120px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const AboutWrapper = styled.div`
  padding-top: 20px;
  padding-left: 20px;
  margin-top: 35px;
  height: 605px;
  width: 100%;
  background-color: #FFFFFF;

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 480px) {
    height: 300px;
  }
`;

const ContentWrapper = styled.div`
  margin-top: 60px;
  height: 100%;
  width: 100%;
  background-color: #FFFFFF;
  //border-radius: 3px;
  //box-shadow: var(--ds-shadow-raised, 0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px 1px rgba(9, 30, 66, 0.13));
`;

const InsideContentWrapper = styled.div`
  margin: 25px;
`;

const CoverPictureWrapper = styled.div`
  position: relative;
  width: auto;
  height: 212px;
  margin-left: 200px;
  background-color: #80ffa1;
  background-image: url('/Images/CoverBackground.jpg');
  background-size: cover;
  background-position: center;
  transition: background-color 0.9s ease-in-out 0.9s;

  &:hover {
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(9, 30, 66, 0.54);
      backdrop-filter: blur(2px);
      transition-delay: 0s;
    }

    .update-cover {
      opacity: 1;
    }
  }
`;

const CircleImage = styled.div`
  position: absolute;
  border: #FFFFFF solid 2.5px;
  bottom: -25%;
  left: 10%;
  transform: translateX(-10%);
  width: 175px;
  height: 175px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;

  &:hover {
    transform: translateX(-30%) scale(1.1);
    transition: transform 0.4s ease-in-out;
  }

  &:hover {
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 50%;
      background-color: rgba(9, 30, 66, 0.54);
      backdrop-filter: blur(2px);
      transition-delay: 0s;
    }

    .update-cover {
      opacity: 1;
    }

`;

const UpdateCover = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  margin-left: 40px;

  & svg {
    margin-right: 5px;
  }
`;

const UpdateProfile = styled.div`
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  margin-left: 40px;

  & svg {
    margin-right: 5px;
  }
`;

const ColumnsForAboutDetails = styled.div`
  display: flex;
  margin-left: 20px;
  align-items: center;
  height: 40px;
`;


const LabelHeadingWrapper = styled.label`
  font-size: 14px;
  color: rgb(107, 119, 140);
  line-height: 16px;
  vertical-align: middle;
  margin-bottom: 4px;
`;

const HeadingLabel = styled.span`
  font-weight: 600;
  padding: 0px;
  font-size: 16px;
`;



const SectionsWrapper = styled.div`
  display: flex;
  border-radius: 3px;
  margin-left: 200px;
  box-shadow: var(--ds-shadow-raised, 0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px 1px rgba(9, 30, 66, 0.13));
`;


const CheckboxLabel = styled.label`
  margin-bottom: 7px;
`;

const ConfigureMessage = styled.p`
  margin-top: -5px;
  font-size: 0.9rem;
`;

const TaskList = styled.div`
  margin: 8px 0 15px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-top: -5px;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const SaveButton = styled.button`
  background-color: #0077ff;
  color: white;
  font-size: 16px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: fit-content;
  position: absolute;
  bottom: 20px;
  right: 20px;

  &:hover {
    background-color: #0066cc;
  }

  &:focus {
    outline: none;
  }
`;


const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.1rem;
  margin-right: 10px;
  width: 120px;

`;

const StyledInput = styled(Input)`
  width: 50%;
  height: 32px;
`;


const emailOptions = [
    {value: 'yes', label: 'Send me email notifications'},
    {value: 'no', label: 'Do not send me email notifications'},
];

const notificationFormatOptions = [
    {value: 'html', label: 'HTML'},
    {value: 'text', label: 'Text'},
];


const ProfileVisibility = () => {
    const [isImageChanged, setIsImageChanged] = useState(false);
    const [userData, setUserData] = useState({});
    const [userId, setUserId] = useState({});
    const [userName, setUserName] = useState('');
    const [userjobTitle, setUserJobTitle] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userDepartment, setUserDepartment] = useState('');
    const [userOrganization, setUserOrganization] = useState([]);
    const [isUserOrganizationChanged, setIsUserOrganizationChanged] = useState(false);
    const [userLocation, setUserLocation] = useState('');
    const [userJoiningDate, setUserJoiningDate] = useState('');
    const [emailIssueNotification, setEmailIssueNotification] = useState('');
    const [emailNotificationFormat, setEmailNotificationFormat] = useState('');
    const [IsreporterData, setIsreporterData] = useState('');
    const [IsassigneeData, setIsassigneeData] = useState('');
    const [userImage, setUserImage] = useState(null);
    const [companies, setCompanies] = useState('');

    let authToken = localStorage.getItem('auth_token');
    const navigate = useNavigate();


    let IconPath = userData?.image

    const titleMessageWhenDisable = "This field is disabled. Enabled for Admin User Only";

    const fetchData = async () => {
        try {

            const [userDataResponse, companiesListResponse] = await Promise.all([
                apiRequest.get(`/api/userprofile/`, {
                    headers: { Authorization: `Token ${authToken}` }
                }),
                apiRequest.get(`/api/companies`, {
                    headers: { Authorization: `Token ${authToken}` }
                })
            ]);
            setUserData(userDataResponse.data[0]);
            setUserId(userDataResponse.data[0].id);
            setCompanies(companiesListResponse.data);
        } catch (error) {
            displayErrorMessage(error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (userData != null) {
            setUserImage(userData?.image)
            setUserName(userData?.user?.username)
            setUserEmail(userData?.user?.email)
            setUserJobTitle(userData?.job_title)
            setUserDepartment(userData?.department)
            setUserOrganization(userData?.company?.company_name)
            setUserLocation(userData?.company?.city)
            setUserJoiningDate(userData?.joining_date)
            setIsreporterData(userData?.is_reporter)
            setIsassigneeData(userData?.is_assignee)
            setEmailIssueNotification(userData?.send_email)
            setEmailNotificationFormat(userData?.email_format)
        }
    }, [userData]);

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };
    const handleUserEmailChange = (event) => {
        setUserEmail(event.target.value);
    };
    const handleUserJobTitleChange = (event) => {
        setUserJobTitle(event.target.value);
    };
    const handleUserDepartmentChange = (event) => {
        setUserDepartment(event.target.value);
    };
    const handleUserOrganizationChange = (value) => {
        setIsUserOrganizationChanged(true);
        setUserOrganization(parseInt(value));
    };
    const handleUserLocationChange = (event) => {
        setUserLocation(event.target.value);
    };
    const handleUserJoiningDateChange = (event) => {
        setUserJoiningDate(event.target.value);
    };

    const handleIsReporterChange = () => {
        setIsreporterData(!userData.is_reporter);
    };

    const handleIsassigneeChange = () => {
        setIsassigneeData(!userData.is_assignee);
    };

    const handleEmailIssueNotification = (value) => {
        setEmailIssueNotification(value);
    };

    const handleEmailNotificationFormat = (value) => {
        setEmailNotificationFormat(value);
    };

    const companiesOptions = companies ? companies.map((company) => ({
        label: company.company_name,
        value: company.id,
    }))
    : [];

    const handleImageChange = (image) => {
        setUserImage(image);
        setIsImageChanged(true);
    }


    function handleSubmit(event) {
        event.preventDefault();

        const manageAccountData = {
            "is_reporter": IsreporterData,
            "is_assignee": IsassigneeData,
            "send_email": emailIssueNotification,
            "email_format": emailNotificationFormat,
            "job_title": userjobTitle,
            "department": userDepartment,
        }
        if (isImageChanged) {
            manageAccountData.image = userImage;
        }
        if (isUserOrganizationChanged){
            manageAccountData.company = userOrganization
        }

        apiRequest
            .patch(`/api/userprofile/${userId}/`,
                manageAccountData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Token ${authToken}`,
                    }
                } )
            .then(response => {
                displaySuccessMessage(`Successfully update the user profile!`);
                navigate('/manage-account');
            })
            .catch(error => {
            displayErrorMessage(error);
            });
    }

    return (
        <div>
            <NavBar/>
            <UserSidebar/>
            <Toast />
            <Wrapper>
                <FormWrapper onSubmit={handleSubmit} encType="multipart/form-data" method="POST">

                    <ImageWrapper>
                        <CoverPictureWrapper>
                            <CircleImage>
                                <ProfilePhotouploader onImageChange={handleImageChange} id="image" imagePath={IconPath}/>
                                <UpdateProfile className="update-cover">
                                    <FontAwesomeIcon icon={faImage} fontSize={"30px"} onClick={() => {
                                    }}/>
                                </UpdateProfile>
                            </CircleImage>
                            <UpdateCover className="update-cover">
                                <FontAwesomeIcon icon={faImage} fontSize={"35px"} onClick={() => {
                                }}/>
                                Update your cover photo
                            </UpdateCover>
                        </CoverPictureWrapper>
                    </ImageWrapper>
                    <SectionsWrapper>
                        <AboutWrapper>
                            <SubHeading>About you</SubHeading>
                            <ColumnsForAboutDetails>
                                <Label htmlFor="name">Name:</Label>
                                <StyledInput value={userName} disabled title={titleMessageWhenDisable} onChange={handleUserNameChange}/>
                            </ColumnsForAboutDetails>
                            <ColumnsForAboutDetails>
                                <Label htmlFor="email">Email:</Label>
                                <StyledInput value={userEmail} disabled title={titleMessageWhenDisable} onChange={handleUserEmailChange}/>
                            </ColumnsForAboutDetails>
                            <ColumnsForAboutDetails>
                                <Label htmlFor="name">Joining Date:</Label>
                                <StyledInput value={userJoiningDate} disabled title={titleMessageWhenDisable} onChange={handleUserJoiningDateChange}/>
                            </ColumnsForAboutDetails>
                            <ColumnsForAboutDetails>
                                <Label htmlFor="name">Job title:</Label>
                                <StyledInput value={userjobTitle} bordered size={"large"} onChange={handleUserJobTitleChange}/>
                            </ColumnsForAboutDetails>
                            <ColumnsForAboutDetails>
                                <Label htmlFor="name">Department:</Label>
                                <StyledInput value={userDepartment} onChange={handleUserDepartmentChange}/>
                            </ColumnsForAboutDetails>
                            <ColumnsForAboutDetails>
                                <Label htmlFor="name">Organization:</Label>
                                <GenericSelectField
                                        options={companiesOptions}
                                        isMultiple={false}
                                        width={'50%'}
                                        height={'32px'}
                                        placeholder={"Select your Company"}
                                        defaultValue={`${userOrganization}`}
                                        onSelectChange={handleUserOrganizationChange}
                                    />
                            </ColumnsForAboutDetails>
                            <ColumnsForAboutDetails>
                                <Label htmlFor="name">Based in:</Label>
                                <StyledInput value={userLocation} title={titleMessageWhenDisable} onChange={handleUserLocationChange}/>
                            </ColumnsForAboutDetails>
                        </AboutWrapper>
                        <ContentWrapper>
                            <SubHeading>Platform Setting</SubHeading>
                            <InsideContentWrapper>
                                <LabelHeadingWrapper>
                                    <HeadingLabel>Email notification for issue activity</HeadingLabel>
                                </LabelHeadingWrapper>
                                <TaskList>
                                    <GenericSelectField
                                        options={emailOptions}
                                        isMultiple={false}
                                        placeholder={"Unassigned"}
                                        defaultValue={`${emailIssueNotification}`}
                                        onSelectChange={handleEmailIssueNotification}
                                    />
                                </TaskList>
                                <ConfigureMessage>Get email updates for issue activity when:</ConfigureMessage>
                                <CheckboxWrapper>
                                    <CheckboxLabel htmlFor="reporter">
                                        <input type="checkbox" defaultChecked={userData?.is_reporter} id="reporter" onClick={handleIsReporterChange}/>
                                        You're the <strong>reporter</strong>
                                    </CheckboxLabel>

                                    <CheckboxLabel htmlFor="assignees">
                                        <input type="checkbox" defaultChecked={userData?.is_assignee} id="assignee"
                                               onClick={handleIsassigneeChange}/>
                                        You're the <strong>assignee</strong> for the issue
                                    </CheckboxLabel>
                                </CheckboxWrapper>
                                <ConfigureMessage>You may also receive other email notifications like those configured
                                    by
                                    your
                                    Jira
                                    admin and updates for filter subscriptions.</ConfigureMessage>
                                <ConfigureMessage><Link to="/profile">Learn more about email
                                    notifications</Link></ConfigureMessage>
                            </InsideContentWrapper>

                            <InsideContentWrapper>
                                <LabelHeadingWrapper>
                                    <HeadingLabel>Email notifications format</HeadingLabel>
                                </LabelHeadingWrapper>
                                <TaskList>
                                    <GenericSelectField
                                        options={notificationFormatOptions}
                                        placeholder={"Unassigned"}
                                        isMultiple={false}
                                        defaultValue={`${emailNotificationFormat}`}
                                        onSelectChange={handleEmailNotificationFormat}
                                    />
                                </TaskList>
                            </InsideContentWrapper>
                        </ContentWrapper>
                    </SectionsWrapper>
                    <SaveButton>Save</SaveButton>
                </FormWrapper>
            </Wrapper>
        </div>
    );
};

export default ProfileVisibility;
