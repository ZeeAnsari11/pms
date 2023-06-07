import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Link, useLocation, useParams} from "react-router-dom";
import NavBar from "../../Dashboard/Navbar";
import Sidebar from "../../Dashboard/Sidebar";
import UserSelectField from "../../Dashboard/SelectFields/UserSelectField";
import ImageUploader from "../ImageUploader";
import axios from "axios";
import {Input} from 'antd';

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
    let authToken = localStorage.getItem('auth_token')
    const [usersData, setUsersData] = useState([]);
    const [projectData, setProjectData] = useState({});
    const [projectLeadData, setProjectLeadData] = useState([]);
    const [projectAssigneesData, setProjectAssigneesData] = useState([]);
    const [icon, setIcon] = useState(null);
    const [selectedProjectLead, setSelectedProjectLead] = useState([]);
    const [selectedProjectAssignees, setSelectedProjectAssignees] = useState([]);

    const defaultIconPath = "Images/NoImage.jpeg"
    useEffect(() => {
        const fetchProjects = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/projects/${projectId}`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setProjectData(response.data);

        };

        const fetchUsers = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/users_list/`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setUsersData(response.data);
        };
        fetchProjects();
        fetchUsers();
    }, []);


    useEffect(() => {
        if (projectData.project_lead) {
            setProjectLeadData(projectData.project_lead.username);
        }
        if (projectData.assignee) {
            setProjectAssigneesData(projectData.assignee.username)
        }
    }, [projectData]);

    useEffect(() => {
        if (projectData.name) {
            setName(projectData.name);
            setKey(projectData.key);
            setProjectCategory(projectData.project_category)
        }
    }, [projectData]);


    useEffect(() => {
        if (projectData.icon != null) {
            setIcon(projectData.icon)
        }

        if (projectData.icon == null) {
            setIcon(defaultIconPath)
        }
    }, [projectData]);

    let IconPath = projectData.icon
    if (IconPath != null) {
        IconPath = `${process.env.REACT_APP_HOST}/${icon}`
    } else {
        IconPath = 'http://localhost:3000/Images/NoImage.jpeg'
    }


    console.log("Icon:", icon)
    console.log("Project Data:", projectData)
    console.log("Project Lead:", projectLeadData)
    console.log("Project Assignee:", projectAssigneesData)


    const [name, setName] = useState(''); // Set initial value from project object
    const [key, setKey] = useState(''); // Set initial value from project object
    const [projectCategory, setProjectCategory] = useState(''); // Set initial value from project object


    const location = useLocation();

    const {projectId} = useParams()

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

    const useroptions = usersData
        ? usersData.map((user) => ({
            username: user.username,
            id: user.id,
        }))
        : [];

    const handleSelectedProjectLeadChange = (value) => {
        setSelectedProjectLead(parseInt(value));
    };

    const handleSelectedProjectAssigneesChange = (value) => {
        setSelectedProjectAssignees(parseInt(value));
    };
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleKeyChange = (event) => {
        setKey(event.target.value);
    };

    const handleImageChange = (image) => {
        setImage(image);
        setIcon(image);
    }

    const project = {
        name: name,
        category: projectCategory?.category,
        icon: IconPath
    }

    function getProjectLeadUsername(projectLeadData, useroptions) {
        // Get the username of the project lead from the projectLeadData object.
        const projectLeadUsername = projectLeadData.username;

        // Loop through the useroptions object and find the user with the matching username.
        for (const user of useroptions) {
            if (user.username === projectLeadUsername) {
                // Return the username of the project lead.
                return user.username;
            }
        }

        // If the project lead username is not found in the useroptions object, return undefined.
        return undefined;
    }


    function handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const projectobj = {
            "name": name,
            "key": key,
            "icon": image,
            "project_lead": selectedProjectLead,
            "assignee": selectedProjectAssignees
        };

        axios({
            method: 'patch',
            url: `${process.env.REACT_APP_HOST}/api/projects/${projectId}/`,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${authToken}`,
            },
            data: projectobj
        })
            .then(response => {
                // handle the response
                console.log(response.data);
                window.location.href = window.location.href;
            })
            .catch(error => {
                // handle the error
                console.log(error);
            });
    }


    return (
        <div>
            <NavBar/>
            <Sidebar/>
            <PageWrapper>

                <Header>
                    <Details>Details</Details>
                </Header>

                <FormWrapper onSubmit={handleSubmit} encType="multipart/form-data" method="POST">
                    <ImageUploader id="image" imagePath={IconPath}
                                   onImageChange={handleImageChange}/>
                    <Label htmlFor="name">Name:</Label>
                    <NameInput type="text" id="name" name="name" placeholder="Project name" value={name}
                               onChange={handleNameChange}/>
                    <LabelForKey htmlFor="key">Key:</LabelForKey>
                    <Input style={{width: "50%", height: "35px"}} id="key" name="key" placeholder="Project key"
                           value={key} disabled bordered
                           onChange={handleKeyChange}/>
                    <Labelforlead htmlFor="category">Project lead:</Labelforlead>
                    <UserSelectField users={useroptions}
                                     defaultValue={projectLeadData}
                                     onSelectChange={handleSelectedProjectLeadChange}
                                     width="50%"/>
                    <Description>Make sure your project lead has access to issues in the project.</Description>
                    <LabelforDefaultassignee htmlFor="category">Default assignee</LabelforDefaultassignee>
                    <UserSelectField users={useroptions} defaultValue={`${projectAssigneesData}`}
                                     onSelectChange={handleSelectedProjectAssigneesChange}
                                     width="50%"/>
                    <SaveButton>Save</SaveButton>
                </FormWrapper>
            </PageWrapper>
        </div>
    );
}


export default ProjectSettingPage;
