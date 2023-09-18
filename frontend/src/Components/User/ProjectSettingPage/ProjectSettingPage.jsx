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
import {ToastContainer} from 'react-toastify';
import {useDispatch} from "react-redux";
import {getProject, updateProject} from "../../../Store/Slice/project/projectActions";
import {fetchUsersList} from "../../../api/list/users";

const {Option} = Select;

function ProjectSettingPage() {
    const dispatch = useDispatch()

    const [usersData, setUsersData] = useState([]);
    const [projectData, setProjectData] = useState({});
    const [icon, setIcon] = useState(null);
    const [selectedProjectLead, setSelectedProjectLead] = useState([]);
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [image, setImage] = useState(null);


    const {projectId} = useParams()
    const navigate = useNavigate();

    const IsAdminOrStaffUser = useIsAdminOrStaffUser();

    const defaultIconPath = "/Images/NoImage.jpeg"

    useEffect(() => {
        const fetchProject = async () => {
            dispatch(getProject({projectId: projectId})).unwrap()
                .then(response => {
                    setProjectData(response.data);
                })
                .catch(error => {
                    displayErrorMessage(`Error occurred while fetching data: ${error}`);
                });
        };

        const fetchUsers = async () => {
            fetchUsersList()
                .then(response => {
                    setUsersData(response.data);
                })
                .catch(error => {
                    displayErrorMessage(`Error occurred while fetching data: ${error}`);
                });
        };
        fetchProject();
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
        IconPath = `${process.env.REACT_APP_DOMAIN}/${icon}`
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
        const formData = {'name': name, 'slug': slug, 'icon': image, 'project_lead': selectedProjectLead,};
        dispatch(updateProject({projectId: projectId, formData: formData})).unwrap()
            .then(response => {
                console.log(response);
                displaySuccessMessage(`Project Updated Successfully!`);
                navigate(`/project/${projectId}/project-setting`);
            })
            .catch(error => {
                displayErrorMessage(`Error occurred while Updating Project data: ${error}`);
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
                                                    src={`${process.env.REACT_APP_DOMAIN}/${item.iconUrl}`}/>{" "}
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
