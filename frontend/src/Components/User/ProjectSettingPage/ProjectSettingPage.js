import React, {useState, useRef} from 'react';
import styled from 'styled-components';
import {HiDotsHorizontal} from 'react-icons/hi'
import Dropdown from "../../Dashboard/Dropdown";
import {Link, useLocation} from "react-router-dom";
import {Button, Modal as UploadIconModal, notification} from 'antd';
import Selector from '../../../Shared/Components/Select';
import Dragger from "../DragAndDrop/DragAndDrop";
import FileUploaderButton from "../PhotoUploader/PhotoUploader";
import NotificationModal from '../Notification/Notification';
import NavBar from "../../Dashboard/Navbar";
import ReactQuill from "react-quill";
import Sidebar from '../../Dashboard/Sidebar'
import UserSelectField from "../../Dashboard/SelectFields/UserSelectField";

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

const NameInput = styled.input`
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


const KeyInput = styled.input`
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

const UrlInput = styled.input`
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

const LabelForUrl = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-right: 342px;
`;

const LabelForDescription = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-right: 280px;
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

    const [modalVisible, setModalVisible] = useState(false);

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleConfirm = () => {
        // Do something when confirm button is clicked
        setModalVisible(false);
    };

    const showModalForNotification = () => {
        setModalVisible(true);
    }

    const items = [{
        label: <Link onClick={showModalForNotification}>Move to trash </Link>, key: '0',
    },];

    const [visibleForIcon, setVisibleForIcon] = useState(false);

    const [image, setImage] = useState(null);

    const [select, setSelect] = useState(null);

    const [description, setDescription] = useState('');


    const handleUpload = (file) => {
        setImage(file);
        setVisibleForIcon(false);
    };

    const handleDescriptionChange = (value) => {
        setDescription(value);
    }

    const handleUploadfForDragAndDrop = (file) => {
        setImage(file);
        setVisibleForIcon(false);
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


    const modalStyle = {
        borderRadius: 0, height: '1000px', cancelButton: {backgroundColor: 'red'}
    };

    const LinkedIssue1 = [
        {value: 'option1', label: 'blocks'},
        {value: 'option2', label: 'is blocked by'},
        {value: 'option3', label: 'clones'},
        {value: 'option4', label: 'is cloned by'},
        {value: 'option5', label: 'duplicates'},
        {value: 'option6', label: 'is duplicated by'},
        {value: 'option7', label: 'relates to'},

    ];

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
                <NotificationModal
                    visible={modalVisible}
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                    title="Confirm delete project?"
                    content="Are you sure about deleting this project?"
                />
                <UploadIconModal title={<h3 style={{fontSize: '18px', marginTop: '-5px'}}>Choose an icon</h3>}
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
                                         backgroundColor: 'red', color: 'black', border: 'black',

                                     }, className: 'cancel-button',
                                 }}
                >
                    <Dragger handleUploadfForDragAndDrop={handleUploadfForDragAndDrop}/>
                    <p style={{marginLeft: '225px'}}>or</p>
                    <FileUploaderButton handleUpload={handleUpload}/>

                </UploadIconModal>
                <Header>
                    <Details>Details</Details>
                </Header>

                {image && select ? (<ImageWrapper>
                    <Image src={'http://localhost:3000/Images/' + image} alt="Profile Picture"/>
                </ImageWrapper>) : (<ImageWrapper>
                    <Image src={'http://localhost:3000/Images/NoImage.jpeg'} alt="No Profile Picture"/>
                </ImageWrapper>)}
                <ButtonWrapper>
                    <UploadButton onClick={showModalForIcon}>Change icon</UploadButton>
                </ButtonWrapper>

                <FormWrapper>
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
