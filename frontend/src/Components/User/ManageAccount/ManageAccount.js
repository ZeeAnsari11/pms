import React from 'react';
import styled from 'styled-components';

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
  font-size: 0.8em;
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

const CoverPictureWrapper = styled.div`
  width: 100%;
  height: 112px;
  background-color: #80ffa1;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
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
    width: 100%;
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

const HeadingLabel =  styled.span`
    font-weight: 600;
    padding: 0px;
`;


const ProfileVisibility = () => {
    return (
        <Wrapper>
            <Heading>Profile and visibility</Heading>
            <Text>Manage your personal information, and control which information other people see and apps may
                access.</Text>
            <SubHeading>Profile photo and header image</SubHeading>
            <ImageWrapper>
                <CoverPictureWrapper></CoverPictureWrapper>
                <EmptySide></EmptySide>
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
                            </LeftColumnsInnerSecond>
                        </LeftColumnsInner>
                    </LeftColumns>
                </ColumnsForAboutDetails>

            </AboutWrapper>
            <SubHeading>Contact</SubHeading>
            <ContentWrapper></ContentWrapper>
        </Wrapper>
    );
};

export default ProfileVisibility;
