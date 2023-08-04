import React, {useEffect, useState} from 'react';
import NavBar from "../../Dashboard/Navbar";
import ProfilePhotouploader from "../Manage/ProfilePhotouploader";
import GenericSelectField from "../../Dashboard/SelectFields/GenericSelectField";
import UserSidebar from "../../Dashboard/Sidebar/UserSidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Toast from "../../../Shared/Components/Toast"
import {displayErrorMessage, displaySuccessMessage} from "../../../Shared/notify"
import {faImage} from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from "react-router-dom";
import * as ManageAccountComponents from './ManageAccountStyle';
import apiRequest from '../../../Utils/apiRequest';
import {useCurrentUserProfileData} from "../../../Store/Selector/Selector";

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
    const userData = useCurrentUserProfileData();

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


    const titleMessageWhenDisable = "This field is disabled. Enabled for Admin User Only";

    const fetchData = async () => {
        try {

            const [companiesListResponse] = await Promise.all([
                apiRequest.get(`/api/companies`, {
                    headers: {Authorization: `Token ${authToken}`}
                })
            ]);
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
            setUserId(userData?.id)
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
        if (isUserOrganizationChanged) {
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
                })
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
            <Toast/>
            <ManageAccountComponents.Wrapper>
                <ManageAccountComponents.FormWrapper onSubmit={handleSubmit} encType="multipart/form-data"
                                                     method="POST">

                    <ManageAccountComponents.ImageWrapper>
                        <ManageAccountComponents.CoverPictureWrapper>
                            <ManageAccountComponents.CircleImage>
                                <ProfilePhotouploader onImageChange={handleImageChange} id="image"
                                                      imagePath={`${process.env.REACT_APP_HOST}/${userData?.image}`}/>
                                <ManageAccountComponents.UpdateProfile className="update-cover">
                                    <FontAwesomeIcon icon={faImage} fontSize={"30px"} onClick={() => {
                                    }}/>
                                </ManageAccountComponents.UpdateProfile>
                            </ManageAccountComponents.CircleImage>
                            <ManageAccountComponents.UpdateCover className="update-cover">
                                <FontAwesomeIcon icon={faImage} fontSize={"35px"} onClick={() => {
                                }}/>
                                Update your cover photo
                            </ManageAccountComponents.UpdateCover>
                        </ManageAccountComponents.CoverPictureWrapper>
                    </ManageAccountComponents.ImageWrapper>
                    <ManageAccountComponents.SectionsWrapper>
                        <ManageAccountComponents.AboutWrapper>
                            <ManageAccountComponents.SubHeading>About you</ManageAccountComponents.SubHeading>
                            <ManageAccountComponents.ColumnsForAboutDetails>
                                <ManageAccountComponents.Label htmlFor="name">Name:</ManageAccountComponents.Label>
                                <ManageAccountComponents.StyledInput value={userName} disabled
                                                                     title={titleMessageWhenDisable}
                                                                     onChange={handleUserNameChange}/>
                            </ManageAccountComponents.ColumnsForAboutDetails>
                            <ManageAccountComponents.ColumnsForAboutDetails>
                                <ManageAccountComponents.Label htmlFor="email">Email:</ManageAccountComponents.Label>
                                <ManageAccountComponents.StyledInput value={userEmail} disabled
                                                                     title={titleMessageWhenDisable}
                                                                     onChange={handleUserEmailChange}/>
                            </ManageAccountComponents.ColumnsForAboutDetails>
                            <ManageAccountComponents.ColumnsForAboutDetails>
                                <ManageAccountComponents.Label htmlFor="name">Joining
                                    Date:</ManageAccountComponents.Label>
                                <ManageAccountComponents.StyledInput value={userJoiningDate} disabled
                                                                     title={titleMessageWhenDisable}
                                                                     onChange={handleUserJoiningDateChange}/>
                            </ManageAccountComponents.ColumnsForAboutDetails>
                            <ManageAccountComponents.ColumnsForAboutDetails>
                                <ManageAccountComponents.Label htmlFor="name">Job title:</ManageAccountComponents.Label>
                                <ManageAccountComponents.StyledInput value={userjobTitle} bordered size={"large"}
                                                                     onChange={handleUserJobTitleChange}/>
                            </ManageAccountComponents.ColumnsForAboutDetails>
                            <ManageAccountComponents.ColumnsForAboutDetails>
                                <ManageAccountComponents.Label
                                    htmlFor="name">Department:</ManageAccountComponents.Label>
                                <ManageAccountComponents.StyledInput value={userDepartment}
                                                                     onChange={handleUserDepartmentChange}/>
                            </ManageAccountComponents.ColumnsForAboutDetails>
                            <ManageAccountComponents.ColumnsForAboutDetails>
                                <ManageAccountComponents.Label
                                    htmlFor="name">Organization:</ManageAccountComponents.Label>
                                <GenericSelectField
                                    options={companiesOptions}
                                    isMultiple={false}
                                    width={'50%'}
                                    height={'32px'}
                                    placeholder={"Select your Company"}
                                    defaultValue={`${userOrganization}`}
                                    onSelectChange={handleUserOrganizationChange}
                                />
                            </ManageAccountComponents.ColumnsForAboutDetails>
                            <ManageAccountComponents.ColumnsForAboutDetails>
                                <ManageAccountComponents.Label htmlFor="name">Based in:</ManageAccountComponents.Label>
                                <ManageAccountComponents.StyledInput value={userLocation}
                                                                     title={titleMessageWhenDisable}
                                                                     onChange={handleUserLocationChange}/>
                            </ManageAccountComponents.ColumnsForAboutDetails>
                        </ManageAccountComponents.AboutWrapper>
                        <ManageAccountComponents.ContentWrapper>
                            <ManageAccountComponents.SubHeading>Platform Setting</ManageAccountComponents.SubHeading>
                            <ManageAccountComponents.InsideContentWrapper>
                                <ManageAccountComponents.LabelHeadingWrapper>
                                    <ManageAccountComponents.HeadingLabel>Email notification for issue
                                        activity</ManageAccountComponents.HeadingLabel>
                                </ManageAccountComponents.LabelHeadingWrapper>
                                <ManageAccountComponents.TaskList>
                                    <GenericSelectField
                                        options={emailOptions}
                                        isMultiple={false}
                                        placeholder={"Unassigned"}
                                        defaultValue={`${emailIssueNotification}`}
                                        onSelectChange={handleEmailIssueNotification}
                                    />
                                </ManageAccountComponents.TaskList>
                                <ManageAccountComponents.ConfigureMessage>Get email updates for issue activity
                                    when:</ManageAccountComponents.ConfigureMessage>
                                <ManageAccountComponents.CheckboxWrapper>
                                    <ManageAccountComponents.CheckboxLabel htmlFor="reporter">
                                        <input type="checkbox" defaultChecked={userData?.is_reporter} id="reporter"
                                               onClick={handleIsReporterChange}/>
                                        You're the <strong>reporter</strong>
                                    </ManageAccountComponents.CheckboxLabel>

                                    <ManageAccountComponents.CheckboxLabel htmlFor="assignees">
                                        <input type="checkbox" defaultChecked={userData?.is_assignee} id="assignee"
                                               onClick={handleIsassigneeChange}/>
                                        You're the <strong>assignee</strong> for the issue
                                    </ManageAccountComponents.CheckboxLabel>
                                </ManageAccountComponents.CheckboxWrapper>
                                <ManageAccountComponents.ConfigureMessage>You may also receive other email notifications
                                    like those configured
                                    by
                                    your
                                    Jira
                                    admin and updates for filter
                                    subscriptions.</ManageAccountComponents.ConfigureMessage>
                                <ManageAccountComponents.ConfigureMessage><Link to="/profile">Learn more about email
                                    notifications</Link></ManageAccountComponents.ConfigureMessage>
                            </ManageAccountComponents.InsideContentWrapper>

                            <ManageAccountComponents.InsideContentWrapper>
                                <ManageAccountComponents.LabelHeadingWrapper>
                                    <ManageAccountComponents.HeadingLabel>Email notifications
                                        format</ManageAccountComponents.HeadingLabel>
                                </ManageAccountComponents.LabelHeadingWrapper>
                                <ManageAccountComponents.TaskList>
                                    <GenericSelectField
                                        options={notificationFormatOptions}
                                        placeholder={"Unassigned"}
                                        isMultiple={false}
                                        defaultValue={`${emailNotificationFormat}`}
                                        onSelectChange={handleEmailNotificationFormat}
                                    />
                                </ManageAccountComponents.TaskList>
                            </ManageAccountComponents.InsideContentWrapper>
                        </ManageAccountComponents.ContentWrapper>
                    </ManageAccountComponents.SectionsWrapper>
                    <ManageAccountComponents.SaveButton>Save</ManageAccountComponents.SaveButton>
                </ManageAccountComponents.FormWrapper>
            </ManageAccountComponents.Wrapper>
        </div>
    );
};

export default ProfileVisibility;
