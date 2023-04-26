import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import Selector from '../../../Shared/Components/Select';
import {Modal as UploadIconModal} from 'antd';
import Dragger from '../DragAndDrop/DragAndDrop';
import FileUploaderButton from '../PhotoUploader/PhotoUploader';
import axios from "axios";
import {text} from "@fortawesome/fontawesome-svg-core";
import NavBar from "../../Dashboard/Navbar";

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
  margin-top: 50px;
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
  width: 55%;
  max-width: 45%;

  .ql-toolbar {
    //width: 100%;
    position: relative;
    z-index: 1;
    margin-left: -14px;
    width: 109%;
  }

  .ql-container {
    box-sizing: border-box;
    //width: 100%;
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
    margin-left: -14px;
    width: 109%;

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

    let authToken = localStorage.getItem('auth_token')

    const [visibleForIcon, setVisibleForIcon] = useState(false);

    const [image, setImage] = useState(null);

    const [select, setSelect] = useState(null);

    const [text, setText] = useState('');

    const handleTextChange = (value) => {
        setText(value);
    }

    const handleUpload = (file) => {
        setImage(file);
        setVisibleForIcon(false);
    };

    const handleUploadfForDragAndDrop = (file) => {
        setImage(file);
        setVisibleForIcon(false);
    }

    const Onpreview = (file) => {
        setImage(file);
    }

    const showModalForIcon = () => {
        setVisibleForIcon(true);
        setSelect(1);
    };

    const handleOkForIcon = () => {
        setVisibleForIcon(false);
    };

    const handleCancelForIcon = () => {
        setVisibleForIcon(false);
        setImage(null);
    };

    const handleCloseForIcon = () => {
        setVisibleForIcon(false);
    };

    const modalStyle = {
        borderRadius: 0,
        height: '1000px',
        cancelButton: {backgroundColor: 'red'}
    };

    function handleSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const data = {
            "icon": 'backend/media/attachments/projects/icons/crocodile.png',
            "name": form.elements.project.value,
            "slug": "",
            "key": form.elements.key.value,
            "assignee": [2],
            "project_lead": 1,
            "description": text,
            "company": 1,
            "project_category": 1
        };

        fetch('http://127.0.0.1:8000/api/projects/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}`,
            },
            body: JSON.stringify(data)
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
    return (
        <div>
            <NavBar />
        <PageWrapper >
            <UploadIconModal title={
                <h3 style={{fontSize: '18px', marginTop: '-5px'}}>Choose an icon</h3>
            }
                             open={visibleForIcon}
                             onOk={handleOkForIcon}
                             onCancel={handleCancelForIcon}
                             okText="Select"
                             cancelText="Delete existing"
                             style={modalStyle}
                             maskClosable={false}
                             closable={false}
                             cancelButtonProps={{
                                 style: {
                                     backgroundColor: 'red',
                                     color: 'black',
                                     border: 'black',

                                 },
                                 className: 'cancel-button',
                             }}
            >
                <Dragger handleUploadfForDragAndDrop={handleUploadfForDragAndDrop}/>
                <p style={{marginLeft: '225px'}}>or</p>
                <FileUploaderButton handleUpload={handleUpload}/>

            </UploadIconModal>
            <Header>
                <Details>Project Details</Details>
            </Header>

            {image && select ? (
                <ImageWrapper>
                    <Image src={'http://localhost:3000/Images/' + image} alt="Profile Picture"/>
                </ImageWrapper>
            ) : (
                <ImageWrapper>
                    <Image src={'http://localhost:3000/Images/NoImage.jpeg'} alt="No Profile Picture"/>
                </ImageWrapper>
            )}
            <ButtonWrapper>
                <UploadButton onClick={showModalForIcon}>Change icon</UploadButton>
            </ButtonWrapper>
            <FormWrapper onSubmit={handleSubmit} encType="multipart/form-data" method="POST">
                <LabelForProject htmlFor="project">Project:</LabelForProject>
                <Input type="text" id="project" name="project" placeholder="Enter project name"/>
                <LabelForKey htmlFor="key">Key:</LabelForKey>
                <Input type="text" id="key" name="key" placeholder="Enter project key"/>
                <LabelForDescriptionBoc htmlFor="key">Description:</LabelForDescriptionBoc>
                <StyledReactQuill id="exampleEditor" value={text} onChange={handleTextChange}/>
                <LabelForCompany htmlFor="category">Company:</LabelForCompany>
                <Selector/>
                <Description>Make sure your project lead has access to issues in the project.</Description>
                <LabelforDefaultassignee htmlFor="category">Catagory:</LabelforDefaultassignee>
                <Selector/>
                <LabelforLead htmlFor="category">Project Lead:</LabelforLead>
                <Selector/>
                <SaveButton>Save</SaveButton>
            </FormWrapper>
        </PageWrapper>
            </div>
    );
}

export default CreateProject;
