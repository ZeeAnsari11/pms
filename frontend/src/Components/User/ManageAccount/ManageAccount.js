import React, {useState} from 'react';
import styled from 'styled-components';
import {faCircleInfo, faEarthAfrica, faImage} from '@fortawesome/free-solid-svg-icons';
import Editable from '../../Dashboard/Editable/Editable';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {color, font, mixin} from "../../Dashboard/Sidebar/utils/styles";
import Dropdown from "./ManageAccountDropDown";


const Wrapper = styled.div`
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  max-width: 585px;

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
  font-size: 1em;
  margin-top: 30px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`;

const ImageWrapper = styled.div`
  margin-top: 10px;
  background-color: #FFFFFF;
  width: 100%;
  height: 212px;
  border-radius: 3px;
  box-shadow: var(--ds-shadow-raised, 0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px 1px rgba(9, 30, 66, 0.13));

  @media (max-width: 768px) {
    height: 120px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const AboutWrapper = styled.div`
  padding-top: 20px;
  margin-top: 10px;
  height: 605px;
  width: 100%;
  background-color: #FFFFFF;
  border-radius: 3px;
  box-shadow: var(--ds-shadow-raised, 0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px 1px rgba(9, 30, 66, 0.13));

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 480px) {
    height: 300px;
  }
`;

const ContentWrapper = styled.div`
  margin-top: 10px;
  height: 99px;
  width: 100%;
  background-color: #FFFFFF;
  border-radius: 3px;
  box-shadow: var(--ds-shadow-raised, 0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px 1px rgba(9, 30, 66, 0.13));
`;

const InsideContentWrapper = styled.div`
  margin: 25px;
  height: 60px;
`;

const ContentEmailAddressWrapper = styled.div`
  width: 50%;
  height: 100%;

`;

const ContentAccessWrapper = styled.div`
  height: 100%;
  float: right;
  margin-top: -63px;
  width: 49%;
`;


const CoverPictureWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 112px;
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
  bottom: -20%;
  left: 20%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url('/image.png');
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


const EmptySide = styled.div`
  width: 100%;
  height: 100px;
  background-color: #FFFFFF;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;

`;

const ViewAccess = styled.div`
  font-size: 12px;
  padding-left: 8px;
  margin-bottom: -20px;
  color: rgb(107, 119, 140);
  line-height: 16px;
  width: 200px;
  float: right;
  font-weight: revert;
`;

const ViewAccessForContent = styled.div`
  font-size: 12px;
  margin-bottom: -20px;
  padding-left: 80px;
  color: rgb(107, 119, 140);
  line-height: 16px;
  width: 200px;
  float: right;
  font-weight: revert;
`;

const ColumnsForAboutDetails = styled.div`
  display: flex;
  margin-left: 20px;
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

const VisibilityOption = styled.div`
  opacity: 0.5;
`;


const ButtonWrapper = styled.div`
  margin-left: 1px;
  display: inline-block;
  box-sizing: border-box;
  max-width: 100%;
  border: 2px solid transparent;
  border-radius: 3px;
  transition: background 0.2s ease 0s;
  width: 310px;
  height: 40px;
  background-color: transparent;

  &:hover {
    background-color: #EBECF0;
  }
`;

const ButtonText = styled.span`
  margin-right: 180px;
  font-size: 15px;
`;

const HoverTextWrapper = styled.div`
  padding-top: 5px;
`;

const LinkItem = styled.div`
  position: relative;
  display: flex;
  padding: 8px 12px;
  border-radius: 3px;


  ${mixin.clickable}
  ${props =>
          !props.to ? `cursor: not-allowed;` : `&:hover { background: ${color.backgroundLight}; }`}
  i {
    margin-right: 15px;
    font-size: 20px;
  }

  &.active {
    color: ${color.primary};
    background: ${color.backgroundLight};

    i {
      color: ${color.primary};
    }
  }
`;

const CircleInfoIcon = styled.span`
  position: relative;
  display: flex;
  border-radius: 3px;
  padding-left: 190px;
  margin-top: -12px;


  ${mixin.clickable}
  ${props =>
          !props.to ? `cursor: not-allowed;` : `&:hover { background: ${color.backgroundLight}; }`}
  i {
    margin-right: 15px;
    font-size: 20px;
  }

  &.active {
    color: ${color.primary};
    background: ${color.backgroundLight};

    i {
      color: ${color.primary};
    }
  }
`;

const HoverMessage = styled.div`
  margin-top: 35px;
  margin-right: 290px;
  margin-left: 130px;
  display: inline-block;
  position: absolute;
  top: 7px;
  left: -157px;
  right: 68px;
  width: 317px;
  padding: 5px 0px 5px 8px;
  border-radius: 5px;
  text-transform: uppercase;
  color: ${color.textDark};
  background: ${color.backgroundMedium};
  opacity: 0;
  ${font.size(10)};

  ${CircleInfoIcon}:hover & {
    opacity: 1;
  }
`;

const NotImplemented = styled.div`
  margin-top: 35px;
  margin-right: 190px;
  display: inline-block;
  position: absolute;
  top: 7px;
  left: -157px;
  right: 68px;
  width: 317px;
  padding: 5px 0px 5px 8px;
  border-radius: 5px;
  text-transform: uppercase;
  color: ${color.textDark};
  background: ${color.backgroundMedium};
  opacity: 0;
  ${font.size(10)};

  ${LinkItem}:hover & {
    opacity: 1;
  }
`;

const RightColumn = styled.div`
  width: 200px;
`;

const AccessOption = styled.div`
  width: 100%;
  margin-top: 33px;
  margin-bottom: 29px;
`;

const TopPaddingForImageWhoCanSee = styled.div`
  padding: 10px;
  height: 60%;
  width: 40%;
  margin-left: 332px;
`;

const WrapperForDropDownButton = styled.div`
  margin-top: 25px;
  width: 85%;
  margin-left: 40px;
`;

const EmailAddress = styled.p`
  font-size: 14px;
  font-weight: 400;
`;

const WhoCanSeeForContent = styled.p`
  font-size: 12px;
  padding-left: 30px;
  margin-top: 0px;
`;

const ContentDropDownWrapper = styled.div`
  padding-top: 5px;
  width: 74%;
  float: right;
  height: 66%;
  margin-right: -24px;
`;


const ProfileVisibility = () => {

    const [isEditable, setIsEditable] = useState(false);
    const options = ['Option 1', 'Option 2', 'Option 3'];
    return (
        <Wrapper>
            <Heading>Profile and visibility</Heading>
            <Text>Manage your personal information, and control which information other people see and apps may
                access.</Text>
            <SubHeading>Profile photo and header image</SubHeading>
            <ImageWrapper>
                <CoverPictureWrapper>
                    <CircleImage>
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
                <EmptySide>
                    <TopPaddingForImageWhoCanSee>
                        <ViewAccess>
                            <span>Who can see your profile photo? </span> <CircleInfoIcon>

                            <FontAwesomeIcon icon={faCircleInfo}/>

                            <HoverTextWrapper><HoverMessage>The full name you provide is visible to anyone who can
                                view your
                                content, including people outside of your organisation. Accessible by
                                installed apps.
                            </HoverMessage></HoverTextWrapper>
                        </CircleInfoIcon>
                        </ViewAccess>
                        <WrapperForDropDownButton>
                            <Dropdown options={options}></Dropdown>
                        </WrapperForDropDownButton>
                    </TopPaddingForImageWhoCanSee>
                </EmptySide>
            </ImageWrapper>
            <SubHeading>About you</SubHeading>
            <AboutWrapper>
                <ViewAccess>
                    <span>Who can see this?</span>
                </ViewAccess>

                <ColumnsForAboutDetails>
                    <LeftColumns>
                        <LeftColumnsInner>
                            <LeftColumnsInnerSecond>
                                <LabelHeadingWrapper>
                                    <HeadingLabel>Full name</HeadingLabel>
                                </LabelHeadingWrapper>

                                <InputFieldWrapper>
                                    <InputFieldInner>
                                        <InputFieldSecondInner>
                                            <AlignEdiableField>

                                                <Editable text={"Kaleem Shahzad"}
                                                          placeholder={"Kaleem Shahzad"}
                                                />
                                            </AlignEdiableField>
                                        </InputFieldSecondInner>
                                    </InputFieldInner>
                                </InputFieldWrapper>
                            </LeftColumnsInnerSecond>
                        </LeftColumnsInner>
                    </LeftColumns>
                    <RightColumn>
                        <AccessOption>
                            <LinkItem>
                                <VisibilityOption><FontAwesomeIcon icon={faEarthAfrica}/> Anyone </VisibilityOption>
                                <HoverTextWrapper><NotImplemented>The full name you provide is visible to anyone who can
                                    view your
                                    content, including people outside of your organisation. Accessible by
                                    installed apps.
                                </NotImplemented></HoverTextWrapper>
                            </LinkItem>
                        </AccessOption>
                    </RightColumn>
                </ColumnsForAboutDetails>
                <ColumnsForAboutDetails>
                    <LeftColumns>
                        <LeftColumnsInner>
                            <LeftColumnsInnerSecond>
                                <LabelHeadingWrapper>
                                    <HeadingLabel>Public name</HeadingLabel>
                                </LabelHeadingWrapper>

                                <InputFieldWrapper>
                                    <InputFieldInner>
                                        <InputFieldSecondInner>
                                            <AlignEdiableField>

                                                <Editable text={"Kaleem Shahzad"}
                                                          placeholder={"Kaleem Shahzad"}
                                                />
                                            </AlignEdiableField>
                                        </InputFieldSecondInner>
                                    </InputFieldInner>
                                </InputFieldWrapper>
                            </LeftColumnsInnerSecond>
                        </LeftColumnsInner>
                    </LeftColumns>
                    <RightColumn>
                        <AccessOption>
                            <LinkItem>
                                <VisibilityOption><FontAwesomeIcon icon={faEarthAfrica}/> Anyone </VisibilityOption>
                                <HoverTextWrapper><NotImplemented>The full name you provide is visible to anyone who can
                                    view your
                                    content, including people outside of your organisation. Accessible by
                                    installed apps.
                                </NotImplemented></HoverTextWrapper>
                            </LinkItem>
                        </AccessOption>
                    </RightColumn>
                </ColumnsForAboutDetails>
                <ColumnsForAboutDetails>
                    <LeftColumns>
                        <LeftColumnsInner>
                            <LeftColumnsInnerSecond>
                                <LabelHeadingWrapper>
                                    <HeadingLabel>Job title</HeadingLabel>
                                </LabelHeadingWrapper>

                                <InputFieldWrapper>
                                    <InputFieldInner>
                                        <InputFieldSecondInner>
                                            <AlignEdiableField>

                                                <Editable text={"Web Developer"}
                                                          placeholder={"Web Developer"}
                                                />
                                            </AlignEdiableField>
                                        </InputFieldSecondInner>
                                    </InputFieldInner>
                                </InputFieldWrapper>
                            </LeftColumnsInnerSecond>
                        </LeftColumnsInner>
                    </LeftColumns>
                    <RightColumn>
                        <AccessOption>
                            <LinkItem>
                                <VisibilityOption><FontAwesomeIcon icon={faEarthAfrica}/> Anyone </VisibilityOption>
                                <HoverTextWrapper><NotImplemented>The full name you provide is visible to anyone who can
                                    view your
                                    content, including people outside of your organisation. Accessible by
                                    installed apps.
                                </NotImplemented></HoverTextWrapper>
                            </LinkItem>
                        </AccessOption>
                    </RightColumn>
                </ColumnsForAboutDetails>
                <ColumnsForAboutDetails>
                    <LeftColumns>
                        <LeftColumnsInner>
                            <LeftColumnsInnerSecond>
                                <LabelHeadingWrapper>
                                    <HeadingLabel>Department</HeadingLabel>
                                </LabelHeadingWrapper>

                                <InputFieldWrapper>
                                    <InputFieldInner>
                                        <InputFieldSecondInner>
                                            <AlignEdiableField>

                                                <Editable text={"Your Department"}
                                                          placeholder={"Department"}
                                                />
                                            </AlignEdiableField>
                                        </InputFieldSecondInner>
                                    </InputFieldInner>
                                </InputFieldWrapper>
                            </LeftColumnsInnerSecond>
                        </LeftColumnsInner>
                    </LeftColumns>
                    <RightColumn>
                        <AccessOption>
                            <LinkItem>
                                <VisibilityOption><FontAwesomeIcon icon={faEarthAfrica}/> Anyone </VisibilityOption>
                                <HoverTextWrapper><NotImplemented>The full name you provide is visible to anyone who can
                                    view your
                                    content, including people outside of your organisation. Accessible by
                                    installed apps.
                                </NotImplemented></HoverTextWrapper>
                            </LinkItem>
                        </AccessOption>
                    </RightColumn>
                </ColumnsForAboutDetails>
                <ColumnsForAboutDetails>
                    <LeftColumns>
                        <LeftColumnsInner>
                            <LeftColumnsInnerSecond>
                                <LabelHeadingWrapper>
                                    <HeadingLabel>Organisation</HeadingLabel>
                                </LabelHeadingWrapper>

                                <InputFieldWrapper>
                                    <InputFieldInner>
                                        <InputFieldSecondInner>
                                            <AlignEdiableField>

                                                <Editable text={"Pakistan Lahore"}
                                                          placeholder={"Pakistan Lahore"}
                                                />
                                            </AlignEdiableField>
                                        </InputFieldSecondInner>
                                    </InputFieldInner>
                                </InputFieldWrapper>
                            </LeftColumnsInnerSecond>
                        </LeftColumnsInner>
                    </LeftColumns>
                    <RightColumn>
                        <AccessOption>
                            <LinkItem>
                                <VisibilityOption><FontAwesomeIcon icon={faEarthAfrica}/> Anyone </VisibilityOption>
                                <HoverTextWrapper><NotImplemented>The full name you provide is visible to anyone who can
                                    view your
                                    content, including people outside of your organisation. Accessible by
                                    installed apps.
                                </NotImplemented></HoverTextWrapper>
                            </LinkItem>
                        </AccessOption>
                    </RightColumn>
                </ColumnsForAboutDetails>
                <ColumnsForAboutDetails>
                    <LeftColumns>
                        <LeftColumnsInner>
                            <LeftColumnsInnerSecond>
                                <LabelHeadingWrapper>
                                    <HeadingLabel>Based in</HeadingLabel>
                                </LabelHeadingWrapper>

                                <InputFieldWrapper>
                                    <InputFieldInner>
                                        <InputFieldSecondInner>
                                            <AlignEdiableField>

                                                <Editable text={"Pakistan Lahore"}
                                                          placeholder={"Pakistan Lahore"}
                                                />
                                            </AlignEdiableField>
                                        </InputFieldSecondInner>
                                    </InputFieldInner>
                                </InputFieldWrapper>
                            </LeftColumnsInnerSecond>
                        </LeftColumnsInner>
                    </LeftColumns>
                    <RightColumn>
                        <AccessOption>
                            <LinkItem>
                                <Dropdown options={options}></Dropdown>
                            </LinkItem>
                        </AccessOption>
                    </RightColumn>
                </ColumnsForAboutDetails>


            </AboutWrapper>
            <SubHeading>Contact</SubHeading>
            <ContentWrapper>
                <InsideContentWrapper>
                    <ContentEmailAddressWrapper>
                        <LabelHeadingWrapper>
                            <HeadingLabel>Email address</HeadingLabel>
                        </LabelHeadingWrapper>
                        <EmailAddress>kaleemshahzad131@gmail.com</EmailAddress>
                    </ContentEmailAddressWrapper>

                    <ContentAccessWrapper>
                        <ViewAccessForContent>
                            <WhoCanSeeForContent>Who can see this?</WhoCanSeeForContent>
                        </ViewAccessForContent>
                        <ContentDropDownWrapper>
                            <Dropdown options={options}></Dropdown>
                        </ContentDropDownWrapper>
                    </ContentAccessWrapper>
                </InsideContentWrapper>
            </ContentWrapper>
        </Wrapper>
    );
};

export default ProfileVisibility;
