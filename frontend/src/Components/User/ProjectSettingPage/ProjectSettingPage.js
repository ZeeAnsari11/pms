import React from 'react';
import styled from 'styled-components';
import {useLocation} from "react-router-dom";
import NavBar from "../../Dashboard/Navbar";
import Sidebar from '../../Dashboard/Sidebar'
import UserSelectField from "../../Dashboard/SelectFields/UserSelectField";
import ImageUploader from "../ImageUploader";


const PageWrapper = styled.div`
  background-color: #fff;
  height: 100vh;
  padding: 0 20% 0 20%;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
`;

const Details = styled.h1`
  margin: 50px;
`;

const NameInput = styled.input`
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 2%;
  background-color: #FAFBFC;
  width: 359px;
  
  :hover {
    background-color: #EBECF0;
  }
`;

const KeyInput = styled.input`
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 2%;
  background-color: #FAFBFC;
  width: 359px;
  
  :hover {
    background-color: #EBECF0;
  }
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
  margin-bottom: 0.5rem;
  margin-top: 10px;
  margin-right: 278px;
`;

const Description = styled.p`
  font-size: 0.7rem;
  color: #555;
  margin-top: 5px;
`;

const LabelforDefaultassignee = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
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
  margin-right: 310px;
  margin-bottom: 10px;

  &:hover {
    background-color: #3e81ed;
  }
`;


function ProjectSettingPage() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);


    const users = [
        {id: 1, username: "Hashim Doe"},
        {id: 2, username: "Jane Doe"},
        {id: 3, username: "Bob Smith"},
    ];

    const project = {
        name: searchParams.get('name'),
        category: searchParams.get('category')
    }
    return (
        <div>
            <NavBar/>
            <Sidebar project={project}/>
            <PageWrapper>

                <Header>
                    <Details>Details</Details>
                </Header>

                <FormWrapper>
                    <ImageUploader id="image"/>
                    <Label htmlFor="name">Name:</Label>
                    <NameInput type="text" id="name" name="name" placeholder="Project name"/>
                    <LabelForKey htmlFor="key">Key:</LabelForKey>
                    <KeyInput type="text" id="key" name="key" placeholder="Project key"/>
                    <Labelforlead htmlFor="category">Project lead:</Labelforlead>
                    <UserSelectField users={users} defaultValue={`${users[0].username}`} width="50%"/>
                    <Description>Make sure your project lead has access to issues in the project.</Description>
                    <LabelforDefaultassignee htmlFor="category">Default assignee</LabelforDefaultassignee>
                    <UserSelectField users={users} defaultValue={`${users[1].username}`} width="50%"/>
                    <SaveButton>Save</SaveButton>
                </FormWrapper>
            </PageWrapper>
        </div>
    );
}


export default ProjectSettingPage;
