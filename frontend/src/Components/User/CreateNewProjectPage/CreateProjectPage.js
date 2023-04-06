import React from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import Selector from '../../../shared/Components/Select';

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
    background-color: #ECEDF0;
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

const StyledSelect = styled.select`
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 2%;
  background-color: ${({ isBlue }) => (isBlue ? "#0000FF" : "#FAFBFC")};
  color: ${({ isBlue }) => (isBlue ? "#FFFFFF" : "#000000")};
  width: 380px;

  :hover {
    background-color: ${({ isBlue }) => (isBlue ? "#0000DD" : "#EBECF0")};
  }
  
  option:checked {
    background-color: blue;
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

const LabelForProject = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-right: 305px;
`;


const LabelForKey = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-right: 332px;
`;

const LabelForDescriptionBoc = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-right: 270px;
`;


const LabelforLead = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-right: 265px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-right: 325px;
`;

const LabelForCompany = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-right: 287px;
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
  margin-bottom: 0.5rem;
  margin-right: 288px;
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

const StyledReactQuill = styled(ReactQuill)`
  width: 50%;
  max-width: 50%;
  .ql-toolbar {
    width: 100%;
    position: relative;
    z-index: 1;
  }

  .ql-container {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    font-size: 16px;
    line-height: 1.4;
    padding: 12px 15px;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 4px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    &:focus {
      outline: 0;
      border-color: #80bdff;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }
  padding-bottom: 10px;
`;


function CreateProject() {
    return (
        <PageWrapper>
            <Header>
                <Details>Project Details</Details>
                <OptionButton>...</OptionButton>
            </Header>
            <ImageWrapper>
                <Image src="https://i.pravatar.cc/300" alt="Profile Picture"/>
            </ImageWrapper>
            <ButtonWrapper>
                <UploadButton>Change icon</UploadButton>
            </ButtonWrapper>
            <FormWrapper>
                <LabelForProject htmlFor="project">Project:</LabelForProject>
                <Input type="text" id="project" value="Project Name" name="project" placeholder="Enter project name"/>
                <LabelForKey htmlFor="key">Key:</LabelForKey>
                <Input type="text" id="key" value="Key" name="key" placeholder="Enter project key"/>
                <LabelForDescriptionBoc htmlFor="key">Description:</LabelForDescriptionBoc>
                <StyledReactQuill id="example-editor" />
                <LabelForCompany htmlFor="category">Company:</LabelForCompany>
                <Selector />
                <Description>Make sure your project lead has access to issues in the project.</Description>
                <LabelforDefaultassignee htmlFor="category">Catagory:</LabelforDefaultassignee>
                <Selector />
                <LabelforLead htmlFor="category">Project Lead:</LabelforLead>
                <Selector />
                <SaveButton>Save</SaveButton>
            </FormWrapper>
        </PageWrapper>
    );
}

export default CreateProject;
