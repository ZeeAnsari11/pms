import React, {useEffect, useState} from 'react';
import * as ProjectSettingComponents from './Style';
import {useNavigate, useParams} from "react-router-dom";
import NavBar from "../../Dashboard/Navbar";
import ProjectSidebar from "../../Dashboard/Sidebar/ProjectSidebar";
import apiRequest from '../../../Utils/apiRequest';
import ImageUploader from "../ImageUploader";
import {Select, Avatar, Input} from 'antd'
import ErrorPage from "../../Error/ErrorPage";
import {useIsAdminOrStaffUser} from "../../../Store/Selector/Selector";
import {displayErrorMessage, displaySuccessMessage} from "../../../Shared/notify";
import {StatusCodes} from "http-status-codes";
import { ToastContainer } from 'react-toastify';

const {Option} = Select;

function ProjectSettingPage() {

    const [usersData, setUsersData] = useState([]);
    const [projectData, setProjectData] = useState({});
    const [icon, setIcon] = useState(null);
    const [selectedProjectLead, setSelectedProjectLead] = useState([]);
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [image, setImage] = useState(null);


    const {projectId} = useParams()
    const navigate = useNavigate();

    let authToken = localStorage.getItem('auth_token')
    const IsAdminOrStaffUser = useIsAdminOrStaffUser();

    const defaultIconPath = "/Images/NoImage.jpeg"

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
                .get(`${process.env.REACT_APP_API_URL}/api/users_list/`, {
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
            setSelectedProjectLead(projectData.project_lead.id);
        }
    }, [projectData]);


    useEffect(() => {
        if (projectData.name) {
            setName(projectData.name);
            setSlug(projectData.slug);
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
        IconPath = `${process.env.REACT_APP_API_URL}/${icon}`
    } else {
        IconPath = `/Images/NoImage.jpeg`
    }


    const useroptions = usersData
        ? usersData.map((user) => ({
            username: user.username,
            id: user.id,
            iconUrl: user.userprofile?.image,
        }))
        : [];


    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleKeyChange = (event) => {
        setSlug(event.target.value);
    };

    const handleImageChange = (image) => {
        setImage(image);
        setIcon(image);
    }


    function handleSubmit(event) {
        event.preventDefault();
        const projectObj = {'name': name, 'slug': slug, 'icon': image, 'project_lead': selectedProjectLead,};
        apiRequest.patch(`/api/projects/${projectId}/`,
            projectObj,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${authToken}`,
                },
            })
            .then(response => {
                console.log(response);
                displaySuccessMessage(`Project Updated Successfully!`);
                navigate(`/project/${projectId}/project-setting`);
            })
            .catch(error => {
                if (error.response.status === StatusCodes.FORBIDDEN) {
                    displayErrorMessage(error.response.data.detail)
                    return;
                }
                displayErrorMessage(error.message);
            });
    }

    if (!IsAdminOrStaffUser) {
        return (
            <>
                <NavBar/>
                <ProjectSidebar/>
                <ErrorPage status={403}/>
            </>
        );
    }

    return (
        <div>
            <NavBar/>
            <ToastContainer/>
            <ProjectSidebar/>
            <ProjectSettingComponents.PageWrapper>
                <ProjectSettingComponents.Header>
                    <ProjectSettingComponents.Details>Details</ProjectSettingComponents.Details>
                </ProjectSettingComponents.Header>
                <ProjectSettingComponents.FormWrapper onSubmit={handleSubmit} encType="multipart/form-data"
                                                      method="POST">
                    <ImageUploader id="image" imagePath={IconPath} onImageChange={handleImageChange}/>
                    <ProjectSettingComponents.Label htmlFor="name">Name:</ProjectSettingComponents.Label>
                    <Input
                        id="name"
                        placeholder="Project name"
                        value={name}
                        style={{width: "50%"}}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <ProjectSettingComponents.LabelForKey htmlFor="slug">Key:</ProjectSettingComponents.LabelForKey>
                    <Input
                        id="slug"
                        value={slug}
                        style={{width: "50%"}}
                        onChange={(event) => setSlug(event.target.value)}
                        disabled={true}
                    />
                    <ProjectSettingComponents.Labelforlead htmlFor="category">Project
                        lead:</ProjectSettingComponents.Labelforlead>
                    <Select
                        showArrow
                        filterOption
                        onChange={(value) => setSelectedProjectLead(parseInt(value))}
                        showSearch
                        optionFilterProp="label"
                        placeholder="Please select User"
                        optionLabelProp="label"
                        value={selectedProjectLead}
                        style={{width: "50%"}}
                    >
                        {useroptions.map((item) => (
                            <Option key={item.id} value={item.id} label={item.username}>
                                {
                                    item.iconUrl ?
                                        <div>
                                            <Avatar draggable={true} style={{background: "#10899e"}} alt={item.username}
                                                    src={`${process.env.REACT_APP_API_URL}/${item.iconUrl}`}/>{" "}
                                            {item.username}
                                        </div> :
                                        <div>
                                            <Avatar>
                                                {item.username}
                                            </Avatar> {" "}
                                            {item.username}
                                        </div>
                                }
                            </Option>
                        ))}
                    </Select>
                    <ProjectSettingComponents.Description>Make sure your project lead has access to issues in the
                        project.</ProjectSettingComponents.Description>
                    <ProjectSettingComponents.SaveButton>Save</ProjectSettingComponents.SaveButton>
                </ProjectSettingComponents.FormWrapper>
            </ProjectSettingComponents.PageWrapper>
        </div>
    );
}


export default ProjectSettingPage;
