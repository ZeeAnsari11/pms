import React, {useEffect, useState} from 'react';
import * as ProjectSettingComponents from './Style';
import {useNavigate, useParams} from "react-router-dom";
import NavBar from "../../Dashboard/Navbar";
import ProjectSidebar from "../../Dashboard/Sidebar/ProjectSidebar";
import UserSelectField from "../../Dashboard/SelectFields/UserSelectField";
import apiRequest from '../../../Utils/apiRequest';
import ImageUploader from "../ImageUploader";


function ProjectSettingPage() {
    const [usersData, setUsersData] = useState([]);
    const [projectData, setProjectData] = useState({});
    const [projectLeadData, setProjectLeadData] = useState([]);
    const [icon, setIcon] = useState(null);
    const [selectedProjectLead, setSelectedProjectLead] = useState([]);
    const [name, setName] = useState(''); // Set initial value from project object
    const [key, setKey] = useState(''); // Set initial value from project object
    const [projectCategory, setProjectCategory] = useState(''); // Set initial value from project object
    const [image, setImage] = useState(null);


    const {projectId} = useParams()
    const navigate = useNavigate();

    let authToken = localStorage.getItem('auth_token')

    const defaultIconPath = "Images/NoImage.jpeg"

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await apiRequest
                .get(`/api/projects/${projectId}`, {
                    headers: {
                        Authorization: `Token ${authToken}`,
                    },
                });
            setProjectData(response.data);

        };

        const fetchUsers = async () => {
            const response = await apiRequest
                .get(`${process.env.REACT_APP_HOST}/api/users_list/`, {
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
        IconPath = `${process.env.REACT_APP_HOST}/Images/NoImage.jpeg`
    }


    const useroptions = usersData
        ? usersData.map((user) => ({
            username: user.username,
            id: user.id,
            iconUrl: user.userprofile?.image,
        }))
        : [];

    const handleSelectedProjectLeadChange = (value) => {
        setSelectedProjectLead(parseInt(value));
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


    function handleSubmit(event) {
        event.preventDefault();
        const projectobj = {
            "name": name,
            "key": key,
            "icon": image,
            "project_lead": selectedProjectLead,
        };

        apiRequest.patch(`/api/projects/${projectId}/`,
            projectobj,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${authToken}`,
                },
            })
            .then(response => {
                navigate(`/project/${projectId}/project-setting`);
            })
            .catch(error => {
                console.log(error);
            });
    }


    return (
        <div>
            <NavBar/>
            <ProjectSidebar/>
            <ProjectSettingComponents.PageWrapper>

                <ProjectSettingComponents.Header>
                    <ProjectSettingComponents.Details>Details</ProjectSettingComponents.Details>
                </ProjectSettingComponents.Header>

                <ProjectSettingComponents.FormWrapper onSubmit={handleSubmit} encType="multipart/form-data"
                                                      method="POST">
                    <ImageUploader id="image" imagePath={IconPath} onImageChange={handleImageChange}/>
                    <ProjectSettingComponents.Label htmlFor="name">Name:</ProjectSettingComponents.Label>
                    <ProjectSettingComponents.NameInput type="text" id="name" name="name" placeholder="Project name"
                                                        value={name}
                                                        onChange={handleNameChange}/>
                    <ProjectSettingComponents.LabelForKey htmlFor="key">Key:</ProjectSettingComponents.LabelForKey>
                    <ProjectSettingComponents.NameInput id="key" name="key" placeholder="Project key" value={key}
                                                        disabled bordered
                                                        onChange={handleKeyChange}/>
                    <ProjectSettingComponents.Labelforlead htmlFor="category">Project
                        lead:</ProjectSettingComponents.Labelforlead>
                    <UserSelectField users={useroptions}
                                     defaultValue={projectLeadData}
                                     onSelectChange={handleSelectedProjectLeadChange}
                                     width="50%"/>
                    <ProjectSettingComponents.Description>Make sure your project lead has access to issues in the
                        project.</ProjectSettingComponents.Description>
                    <ProjectSettingComponents.SaveButton>Save</ProjectSettingComponents.SaveButton>
                </ProjectSettingComponents.FormWrapper>
            </ProjectSettingComponents.PageWrapper>
        </div>
    );
}


export default ProjectSettingPage;
