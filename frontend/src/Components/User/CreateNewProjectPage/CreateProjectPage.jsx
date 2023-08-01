import React, {useEffect, useState} from 'react';
import apiRequest from '../../../Utils/apiRequest';
import * as CreateProjectComponents from "./Style"
import Toast from "../../../Shared/Components/Toast"
import {displayErrorMessage, displaySuccessMessage} from "../../../Shared/notify"
import {v4 as uuidv4} from 'uuid';
import {useNavigate} from "react-router-dom";
import NavBar from "../../Dashboard/Navbar";
import GenericSelectField from "../../Dashboard/SelectFields/GenericSelectField";
import ImageUploader from "../ImageUploader";
import UserSelectField from "../../Dashboard/SelectFields/UserSelectField";
import {modules} from "../../../Shared/Const/ReactQuillToolbarOptions";

function CreateProject() {

    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [companyData, setCompanyData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const uniqueProjectKey = uuidv4();
    const [selectedCompany, setSelectedCompany] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedProjectLead, setSelectedProjectLead] = useState([]);
    const [selectedProjectAssignees, setSelectedProjectAssignees] = useState([]);

    let authToken = localStorage.getItem('auth_token');

    const navigate = useNavigate();

    const handleTextChange = (value) => {
        setText(value);
    }
    const handleImageChange = (image) => {
        setImage(image);
    }
    const handleSelectedCompanyChange = (value) => {
        setSelectedCompany(parseInt(value));
    };

    const handleSelectedCategoryChange = (value) => {
        setSelectedCategory(parseInt(value));
    };

    const handleSelectedProjectLeadChange = (value) => {
        setSelectedProjectLead(parseInt(value));
    };


    useEffect(() => {
        const fetchCompanies = async () => {
            const response =
                await apiRequest
                    .get(`/api/companies/`, {
                        headers: {
                            Authorization: `Token ${authToken}`
                        },
                    });
            setCompanyData(response.data);
        };

        const fetchCategories = async () => {
            const response =
                await apiRequest
                    .get(`/api/project_categories/`, {
                        headers: {
                            Authorization: `Token ${authToken}`,
                        },
                    });
            setCategoryData(response.data);
        };

        const fetchUsers = async () => {
            const response =
                await apiRequest.get(`/api/users_list/`, {
                    headers: {
                        Authorization: `Token ${authToken}`,
                    },
                });
            setUsersData(response.data);
        };
        fetchCompanies().then() // @todo handle the exception on Company fetch
        fetchCategories().then() // @todo handle the exception on Categories fetch
        fetchUsers().then() // @todo handle the exception on Users fetch
    }, []);

    const companyOptions = companyData ? companyData.map(
        (company) => ({label: company.company_name, value: company.id,})
    ) : [];


    const categoriesOptions = categoryData ? categoryData.map(
        (category) => ({label: category.category, value: category.id,})
    ) : [];

    const userOptions = usersData ? usersData.map(
        (user) => ({
            username: user.username, id: user.id, iconUrl: user.userprofile?.image,
        })
    ) : [];


    function generateSlug(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')        // Replace spaces with -
            .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
            .replace(/\-\-+/g, '-')      // Replace multiple - with single -
            .replace(/^-+/, '')          // Trim - from start of text
            .replace(/-+$/, '');         // Trim - from end of text
    }


    function handleSubmit(event) {
        event.preventDefault();
        const form = event.target;

        const formData = new FormData()
        if (image !== null) {
            formData.append("icon", image);
        }
        formData.append("name", form.elements.project.value);
        formData.append("slug", generateSlug(form.elements.project.value));
        formData.append("key", uniqueProjectKey);
        selectedProjectAssignees.forEach((assignee, index) => {
            formData.append('assignees', assignee);
        });
        formData.append("project_lead", selectedProjectLead);
        formData.append("description", text);
        formData.append("company", selectedCompany);
        formData.append("category", selectedCategory);
        apiRequest
            .post(`/api/projects/`, formData, {
                headers: {
                    'Authorization': `Token ${authToken}`,
                },
            })
            .then(response => {
                // handle the response
                displaySuccessMessage(`Successfully create new project!`);
                navigate('/project');
            })
            .catch(error => {
                displayErrorMessage(error);
            });
    }

    return (
        <div>
            <NavBar/>
            <Toast/>
            <CreateProjectComponents.PageWrapper>
                <CreateProjectComponents.Header>
                    <CreateProjectComponents.Details>Details</CreateProjectComponents.Details>
                </CreateProjectComponents.Header>
                <CreateProjectComponents.FormWrapper onSubmit={handleSubmit} method="POST">
                    <ImageUploader onImageChange={handleImageChange}/>
                    <CreateProjectComponents.LabelForProject
                        htmlFor="project">Project:</CreateProjectComponents.LabelForProject>
                    <CreateProjectComponents.Input type="text" id="project" name="project"
                                                   placeholder="Enter project name"/>
                    <CreateProjectComponents.LabelForDescriptionBoc
                        htmlFor="key">Description:</CreateProjectComponents.LabelForDescriptionBoc>
                    <CreateProjectComponents.StyledReactQuill modules={modules} id="exampleEditor" value={text}
                                                              onChange={handleTextChange}/>
                    <CreateProjectComponents.LabelForCompany
                        htmlFor="category">Company:</CreateProjectComponents.LabelForCompany>
                    <GenericSelectField
                        onSelectChange={handleSelectedCompanyChange}
                        options={companyOptions}
                        isMultiple={false}
                        placeholder={"Unassigned"}
                        width="50%"/>
                    <CreateProjectComponents.Description>Make sure your project lead has access to issues in the
                        project.</CreateProjectComponents.Description>
                    <CreateProjectComponents.LabelforCategory
                        htmlFor="category">Category:</CreateProjectComponents.LabelforCategory>
                    <GenericSelectField
                        onSelectChange={handleSelectedCategoryChange}
                        options={categoriesOptions}
                        isMultiple={false}
                        placeholder={"Unassigned"}
                        width="50%"/>
                    <CreateProjectComponents.LabelforLead htmlFor="category">Project
                        Lead:</CreateProjectComponents.LabelforLead>
                    <UserSelectField
                        onSelectChange={handleSelectedProjectLeadChange}
                        users={userOptions}
                        isMultiple={false}
                        placeholder={"Unassigned"}
                        width="50%"/>
                    <CreateProjectComponents.SaveButton>Save</CreateProjectComponents.SaveButton>
                </CreateProjectComponents.FormWrapper>
            </CreateProjectComponents.PageWrapper>
        </div>
    );
}

export default CreateProject;
