import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {faCircleInfo, faEarthAfrica, faImage} from '@fortawesome/free-solid-svg-icons';
import Editable from '../../Dashboard/Editable/Editable';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import GenericSelectField from "../../Dashboard/SelectFields/GenericSelectField";
import {Link, useParams} from "react-router-dom";
import NavBar from "../../Dashboard/Navbar";
import Sidebar from "../../Dashboard/Sidebar";
import ImageUploader from "../ImageUploader";
import ProfilePhotouploader from "./ProfilePhotouploader";


const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  margin-left: 15%;

  @media (max-width: 768px) {
    margin-left: 20px;
    margin-right: 20px;
  }
`;

const Heading = styled.h1`
  font-size: 1.5em;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

const Text = styled.p`
  font-size: 1em;
  margin-top: 0;

  @media (max-width: 768px) {
    font-size: 0.6em;
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
  //border-radius: 3px;
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
  width: 55%;
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
  width: 45%;
  background-color: #FFFFFF;
  //border-radius: 3px;
  //box-shadow: var(--ds-shadow-raised, 0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px 1px rgba(9, 30, 66, 0.13));
`;

const InsideContentWrapper = styled.div`
  margin: 25px;
`;

const ContentEmailAddressWrapper = styled.div`
  width: 50%;
  height: 100%;

`;

const CoverPictureWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 212px;
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
    transform: translateX(-50%) scale(1.1);
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

const LeftColumns = styled.div`
  -webkit-box-flex: 1;
  flex-grow: 1;
  margin-left: 8px;
`;

const LeftColumnsInner = styled.div`
  display: flex;
  align-items: flex-start;
  color: rgb(23, 43, 77);
`;

const LeftColumnsInnerSecond = styled.div`
  width: 90%;
  margin-right: -8px;
  display: flex;
  flex-direction: column;
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

const InputFieldWrapper = styled.div`
  margin: -8px 8px 0px -8px;
`;

const InputFieldInner = styled.div`
  margin-top: 8px;
`;

const InputFieldSecondInner = styled.div`
  line-height: 1;
`;

const AlignEdiableField = styled.div`
  width: 55%;
  height: 50px;
`;

const RightColumn = styled.div`
  width: 200px;
`;

const EmailAddress = styled.p`
  font-size: 14px;
  font-weight: 400;
`;


const SectionsWrapper = styled.div`
  display: flex;
  border-radius: 3px;
  box-shadow: var(--ds-shadow-raised, 0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px 1px rgba(9, 30, 66, 0.13));
`;

const Allignment = styled.div`
  display: flex;
  align-items: center;
`;

const Span = styled.div`
  padding-left: 20px;
  width: 250px;
  margin-top: 38px;
`;

const CheckboxLabel = styled.label`
  margin-bottom: 7px;
`;

const ConfigureMessage = styled.p`
  margin-top: -5px;
  font-size: 0.9rem;
`;

const CardInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 60%;
  //padding-bottom: 5px;
`;

const CardInfoBoxTitle = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
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

  &:hover {
    background-color: #0066cc;
  }

  &:focus {
    outline: none;
  }
`;



const email = [
    {value: 'option1', label: 'Send me email notifications'},
    {value: 'option2', label: 'Do not send me email notifications'},
];

const notificationFormat = [
    {value: 'option1', label: 'HTML'},
    {value: 'option2', label: 'Text'},
];


const ProfileVisibility = () => {

    const [isEditable, setIsEditable] = useState(false);
    const [userData, setUserData] = useState({});
    const [projectData, setProjectData] = useState({});
    const [projectIcon, setProjectIcon] = useState('');
    const [image, setImage] = useState(null);
    const handleImageChange = (image) => {
        setImage(image);
    }
    const [name, setName] = useState(''); // Set initial value from project object
    const [projectCategory, setProjectCategory] = useState(''); // Set initial value from project object
    const {projectId} = useParams()

    let IconPath = projectData.icon
    if (IconPath != null) {
        IconPath = `${process.env.REACT_APP_HOST}/${projectIcon}`
    } else {
        IconPath = 'http://localhost:3000/Images/NoImage.jpeg'
    }

    let authToken = localStorage.getItem('auth_token')

    const project = {
        name: name,
        category: projectCategory.project_category,
        icon: IconPath,
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_HOST}/api/userprofile/`, {
                    headers: {"Authorization": `Token ${authToken}`}
                });
                setUserData(response.data);

            } catch (error) {
                console.error(error);
            }
        }
        const fetchProjects = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/projects/${projectId}`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setProjectData(response.data);

        };
        fetchProjects();
        fetchUserData();
    }, []);

    function handleSubmit(event) {
        event.preventDefault();

        const data = {
            // "image": image,
            "department": userData?.department,
            "job_title": userData?.job_title,
            "is_reporter": false,
            "is_assignee": false,
            "send_email": "yes",
            "email_format": "html"
        }
        console.log(data, "DATA")
        fetch('http://127.0.0.1:8000/api/userprofile/', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}`,
            },
            body: JSON.stringify(data) // Serialize the data object as JSON
        })
            .then(response => {
                // handle the response
                console.log(data)
            })
            .catch(error => {
                // handle the error
                console.log(error)
            });
    }
    console.log("Logged in user", userData)



    return (
        <div>
            <NavBar/>
            <Sidebar project={project}/>
            <Wrapper>
                <FormWrapper onSubmit={handleSubmit} encType="multipart/form-data" method="POST">

                    <ImageWrapper>
                        <CoverPictureWrapper>
                            <CircleImage>
                                <ProfilePhotouploader onImageChange={handleImageChange} id="image"
                                                      imagePath={userData?.image}/>
                                <UpdateProfile className="update-cover">
                                    <FontAwesomeIcon icon={faImage} fontSize={"30px"} onClick={() => {
                                        console.log("Clicked")
                                    }}/>
                                </UpdateProfile>
                            </CircleImage>
                            <UpdateCover className="update-cover">
                                <FontAwesomeIcon icon={faImage} fontSize={"35px"} onClick={() => {
                                    console.log("Clicked")
                                }}/>
                                Update your cover photo
                            </UpdateCover>
                        </CoverPictureWrapper>
                    </ImageWrapper>
                    <SectionsWrapper>
                        <AboutWrapper>
                            <SubHeading>About you</SubHeading>
                            <ColumnsForAboutDetails>
                                <LeftColumns>
                                    <LeftColumnsInner>
                                        <LeftColumnsInnerSecond>
                                            <Allignment>
                                                <LabelHeadingWrapper>
                                                    <HeadingLabel>Full name:</HeadingLabel>
                                                </LabelHeadingWrapper>

                                                <InputFieldWrapper>
                                                    <InputFieldInner>
                                                        <InputFieldSecondInner>
                                                            <AlignEdiableField>

                                                                <Editable text={userData?.user?.username}
                                                                          placeholder={userData?.user?.username}
                                                                          fontSize="16px"
                                                                          padding='6px 0px 0px 30px'
                                                                          width="270px"
                                                                />
                                                            </AlignEdiableField>
                                                        </InputFieldSecondInner>
                                                    </InputFieldInner>
                                                </InputFieldWrapper>
                                            </Allignment>
                                        </LeftColumnsInnerSecond>
                                    </LeftColumnsInner>
                                </LeftColumns>
                            </ColumnsForAboutDetails>
                            <ColumnsForAboutDetails>
                                <LeftColumns>
                                    <LeftColumnsInner>
                                        <LeftColumnsInnerSecond>
                                            <Allignment>
                                                <LabelHeadingWrapper>
                                                    <HeadingLabel>Public name:</HeadingLabel>
                                                </LabelHeadingWrapper>

                                                <InputFieldWrapper>
                                                    <InputFieldInner>
                                                        <InputFieldSecondInner>
                                                            <AlignEdiableField>

                                                                <Editable text={userData?.user?.username}
                                                                          placeholder={userData?.user?.username}
                                                                          fontSize="16px"
                                                                          padding='6px 0px 0px 30px'
                                                                          width="270px"
                                                                />
                                                            </AlignEdiableField>
                                                        </InputFieldSecondInner>
                                                    </InputFieldInner>
                                                </InputFieldWrapper>
                                            </Allignment>
                                        </LeftColumnsInnerSecond>
                                    </LeftColumnsInner>
                                </LeftColumns>
                            </ColumnsForAboutDetails>
                            <ColumnsForAboutDetails>
                                <LeftColumns>
                                    <LeftColumnsInner>
                                        <LeftColumnsInnerSecond>
                                            <Allignment>
                                                <LabelHeadingWrapper>
                                                    <HeadingLabel>Email:</HeadingLabel>
                                                </LabelHeadingWrapper>

                                                <InputFieldWrapper>
                                                    <InputFieldInner>
                                                        <InputFieldSecondInner>
                                                            <AlignEdiableField>
                                                                <Span>{userData?.user?.email}</Span>
                                                            </AlignEdiableField>
                                                        </InputFieldSecondInner>
                                                    </InputFieldInner>
                                                </InputFieldWrapper>
                                            </Allignment>
                                        </LeftColumnsInnerSecond>
                                    </LeftColumnsInner>
                                </LeftColumns>
                            </ColumnsForAboutDetails>
                            <ColumnsForAboutDetails>
                                <LeftColumns>
                                    <LeftColumnsInner>
                                        <LeftColumnsInnerSecond>
                                            <Allignment>
                                                <LabelHeadingWrapper>
                                                    <HeadingLabel>Job title:</HeadingLabel>
                                                </LabelHeadingWrapper>

                                                <InputFieldWrapper>
                                                    <InputFieldInner>
                                                        <InputFieldSecondInner>
                                                            <AlignEdiableField>

                                                                <Editable text={userData?.job_title}
                                                                          placeholder={userData?.job_title}
                                                                          fontSize="16px"
                                                                          padding='6px 0px 0px 30px'
                                                                          width="227px"

                                                                />
                                                            </AlignEdiableField>
                                                        </InputFieldSecondInner>
                                                    </InputFieldInner>
                                                </InputFieldWrapper>
                                            </Allignment>
                                        </LeftColumnsInnerSecond>
                                    </LeftColumnsInner>
                                </LeftColumns>
                                <RightColumn>
                                </RightColumn>
                            </ColumnsForAboutDetails>
                            <ColumnsForAboutDetails>
                                <LeftColumns>
                                    <LeftColumnsInner>
                                        <LeftColumnsInnerSecond>
                                            <Allignment>
                                                <LabelHeadingWrapper>
                                                    <HeadingLabel>Department:</HeadingLabel>
                                                </LabelHeadingWrapper>

                                                <InputFieldWrapper>
                                                    <InputFieldInner>
                                                        <InputFieldSecondInner>
                                                            <AlignEdiableField>

                                                                <Editable text={userData?.department}
                                                                          placeholder={userData?.department}
                                                                          fontSize="16px"
                                                                          padding='6px 0px 0px 30px'
                                                                          width="270px"
                                                                />
                                                            </AlignEdiableField>
                                                        </InputFieldSecondInner>
                                                    </InputFieldInner>
                                                </InputFieldWrapper>
                                            </Allignment>
                                        </LeftColumnsInnerSecond>
                                    </LeftColumnsInner>
                                </LeftColumns>
                            </ColumnsForAboutDetails>
                            <ColumnsForAboutDetails>
                                <LeftColumns>
                                    <LeftColumnsInner>
                                        <LeftColumnsInnerSecond>
                                            <Allignment>
                                                <LabelHeadingWrapper>
                                                    <HeadingLabel>Organization:</HeadingLabel>
                                                </LabelHeadingWrapper>

                                                <InputFieldWrapper>
                                                    <InputFieldInner>
                                                        <InputFieldSecondInner>
                                                            <AlignEdiableField>

                                                                <Editable text={userData?.company?.company_name}
                                                                          placeholder={userData?.company?.company_name}
                                                                          fontSize="16px"
                                                                          padding='6px 0px 0px 30px'
                                                                          width="270px"
                                                                />
                                                            </AlignEdiableField>
                                                        </InputFieldSecondInner>
                                                    </InputFieldInner>
                                                </InputFieldWrapper>
                                            </Allignment>
                                        </LeftColumnsInnerSecond>
                                    </LeftColumnsInner>
                                </LeftColumns>
                            </ColumnsForAboutDetails>
                            <ColumnsForAboutDetails>
                                <LeftColumns>
                                    <LeftColumnsInner>
                                        <LeftColumnsInnerSecond>
                                            <Allignment>
                                                <LabelHeadingWrapper>
                                                    <HeadingLabel>Based in:</HeadingLabel>
                                                </LabelHeadingWrapper>

                                                <InputFieldWrapper>
                                                    <InputFieldInner>
                                                        <InputFieldSecondInner>
                                                            <AlignEdiableField>

                                                                <Editable text={userData?.company?.city}
                                                                          placeholder={userData?.company?.city}
                                                                          fontSize="16px"
                                                                          padding='6px 0px 0px 30px'
                                                                          width="270px"

                                                                />
                                                            </AlignEdiableField>
                                                        </InputFieldSecondInner>
                                                    </InputFieldInner>
                                                </InputFieldWrapper>
                                            </Allignment>
                                        </LeftColumnsInnerSecond>
                                    </LeftColumnsInner>
                                </LeftColumns>
                            </ColumnsForAboutDetails>
                            <ColumnsForAboutDetails>
                                <LeftColumns>
                                    <LeftColumnsInner>
                                        <LeftColumnsInnerSecond>
                                            <Allignment>
                                                <LabelHeadingWrapper>
                                                    <HeadingLabel>Joining Date:</HeadingLabel>
                                                </LabelHeadingWrapper>

                                                <InputFieldWrapper>
                                                    <InputFieldInner>
                                                        <InputFieldSecondInner>
                                                            <AlignEdiableField>
                                                                <Span>{userData?.joining_date}</Span>
                                                            </AlignEdiableField>
                                                        </InputFieldSecondInner>
                                                    </InputFieldInner>
                                                </InputFieldWrapper>
                                            </Allignment>
                                        </LeftColumnsInnerSecond>
                                    </LeftColumnsInner>
                                </LeftColumns>
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
                                        options={email}
                                        isMultiple={false}
                                        placeholder={"Unassigned"}
                                        defaultValue={"Send me email notifications"}/>
                                </TaskList>
                                <ConfigureMessage>Get email updates for issue activity when:</ConfigureMessage>
                                <CheckboxWrapper>
                                    <CheckboxLabel htmlFor="reporter">
                                        <input type="checkbox" defaultChecked={true} id="reporter"/>
                                        You're the <strong>reporter</strong>
                                    </CheckboxLabel>

                                    <CheckboxLabel htmlFor="assignee">
                                        <input type="checkbox" defaultChecked={true} id="assignee"/>
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
                                        options={notificationFormat}
                                        isMultiple={false}
                                        defaultValue={"HTML"}/>
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
