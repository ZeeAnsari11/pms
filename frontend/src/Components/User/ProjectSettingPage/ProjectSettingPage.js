import React from 'react';
import styled from 'styled-components';
import {HiDotsHorizontal} from 'react-icons/hi'
import Dropdown from "../../Dashboard/Dropdown";
import {Link} from "react-router-dom";
import Selector from '../../../Shared/Components/Select';

const PageWrapper = styled.div`
  background-color: #fff;
  height: 100vh;
  padding: 0 20% 0 20%;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const Details = styled.h1`
  margin: 0;
`;

const OptionButton = styled.button`
  background-color: transparent;
  border: none;
  color: #000;
  cursor: pointer;
  font-size: 2rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #00C7E6;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20%;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 4%;
`;

const Input = styled.input`
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1rem;
  //width: 40%;
  margin-bottom: 2%;
  background-color: #FAFBFC;
  width: 359px;


  :hover {
    background-color: #EBECF0;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const UploadButton = styled.button`
  background-color: #F5F6F8;
  border-radius: 5%;
  border: none;
  color: #050303;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #ECEDF0;
  }
`;

const Select = styled.select`
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 2%;
  background-color: #FAFBFC;
  width: 380px;


  :hover {
    background-color: #EBECF0;
  }
`;

const Option = styled.option`
  padding: 0.5rem;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-right: 325px;
`;

const LabelForKey = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-right: 342px;
`;

const Labelforlead = styled.label`
  font-weight: bold;
  margin-bottom: 1px;
  margin-right: 278px;

`;

const Description = styled.p`
  font-size: 0.7rem;
  color: #555;
  //margin-top: 0.5rem;
  margin-top: -15px;
`;
const LabelforDefaultassignee
 = styled.label`
  font-weight: bold;
  margin-bottom: 1px;
  margin-right: 245px;
`;

const SaveButton = styled.button`
  background-color: #0062FF;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-right: 280px;

  &:hover {
    background-color: #3e81ed;
  }
`;


function ProjectSettingPage() {

    const items = [
        {
            label: <Link to="/Hello">Move to trash</Link>,
            key: '0',
        },
    ];

    return (
        <PageWrapper>
            <Header>
                <Details>Details</Details>
                <Dropdown items={items} icon={<HiDotsHorizontal size={24}/>}/>
            </Header>
            <ImageWrapper>
                <Image src="https://i.pravatar.cc/300" alt="Profile Picture"/>
            </ImageWrapper>
            <ButtonWrapper>
                <UploadButton>Change icon</UploadButton>
            </ButtonWrapper>
            <FormWrapper>
                <Label htmlFor="name">Name:</Label>
                <Input type="text" id="name" value="New Project" name="name" placeholder="Enter project name"/>
                <LabelForKey htmlFor="key">Key:</LabelForKey>
                <Input type="text" id="key" value="NP" name="key" placeholder="Enter project key"/>
                <Labelforlead htmlFor="category">Project lead:</Labelforlead>
                <Selector/>
                <Description>Make sure your project lead has access to issues in the project.</Description>
                <LabelforDefaultassignee htmlFor="category">Default assignee</LabelforDefaultassignee>
                <Selector/>
                <SaveButton>Save</SaveButton>
            </FormWrapper>
        </PageWrapper>
    );
}

export default ProjectSettingPage;
