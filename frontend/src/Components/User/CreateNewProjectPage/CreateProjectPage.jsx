import React, {useEffect, useState} from 'react';
import apiRequest from '../../../Utils/apiRequest';
import * as CreateProjectComponents from "./Style"
import Toast from "../../../Shared/Components/Toast"
import {displayErrorMessage, displaySuccessMessage} from "../../../Shared/notify"
import {useNavigate} from "react-router-dom";
import NavBar from "../../Dashboard/Navbar";
import GenericSelectField from "../../Dashboard/SelectFields/GenericSelectField";
import ImageUploader from "../ImageUploader";
import {modules} from "../../../Shared/Const/ReactQuillToolbarOptions";
import {Avatar, Select, Tooltip} from "antd";
import {StatusCodes} from "http-status-codes";
import ErrorPage from "../../Error/ErrorPage";
import {useIsAdminOrStaffUser} from "../../../Store/Selector/Selector";
import {InfoCircleOutlined} from "@ant-design/icons";
import {fetchCompaniesList} from "../../../api/list/companies";
import {fetchCategoriesList} from "../../../api/list/categories";
import {fetchUsersList} from "../../../api/list/users";
import {useDispatch} from "react-redux";
import {createProject, generateUniqueSlug, verifyUniqueKey} from "../../../Store/Slice/project/projectActions";

function CreateProject() {
    const dispatch = useDispatch()

    const [text, setText] = useState('');
    const [slug, setSlug] = useState('');
    const [slugError, setSlugError] = useState(false);
    const [image, setImage] = useState(null);
    const [companyData, setCompanyData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedProjectLead, setSelectedProjectLead] = useState([]);


    const IsAdminOrStaffUser = useIsAdminOrStaffUser();
    let hasError = false;

    const {Option} = Select;

    const navigate = useNavigate();

    useEffect(() => {
        fetchCompaniesList().then((companiesList) => {
            setCompanyData(companiesList.data);
        }) // @todo handle the exception on Company fetch
        fetchCategoriesList().then((categoriesList) => {
            setCategoryData(categoriesList.data)
        }) // @todo handle the exception on Categories fetch
        fetchUsersList().then((usersList) => {
            setUsersData(usersList.data);
        }) // @todo handle the exception on Users fetch
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


    const validateUniqueKey = async (text) => {
        dispatch(verifyUniqueKey({text: text})).unwrap()
            .then(
                response => {
                    setSlug(response.data.unique_slug);
                    setSlugError(false);
                }
            )
            .catch(
                error => {
                    displayErrorMessage(error);
                    setSlugError(true);
                }
            );
    }

    const getUniqueSlug = async (text) => {
        dispatch(generateUniqueSlug({text: text})).unwrap()
            .then(response => setSlug(response.data.unique_slug))
            .catch(
                error => {
                    displayErrorMessage(error);
                }
            );
    }

    function handleSubmit(event) {
        if (slugError) {
            displayErrorMessage('Please resolve all the error first')
            return;
        }
        event.preventDefault();
        const form = event.target;

        const formData = new FormData()
        if (image !== null) {
            formData.append("icon", image);
        }
        formData.append("name", form.elements.project.value);
        formData.append("slug", form.elements.slug.value);
        formData.append("project_lead", selectedProjectLead);
        formData.append("description", text);
        formData.append("company", selectedCompany);
        formData.append("category", selectedCategory);
        dispatch(createProject({formData: formData})).unwrap()
            .then(response => {
                displaySuccessMessage(`Successfully create new project!`);
                navigate('/project');
            })
            .catch(error => {
                displayErrorMessage(error);
            });
    }

    if (!IsAdminOrStaffUser) {
        return (
            <>
                <NavBar/>
                <ErrorPage status={403}/>
            </>
        );
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
                    <ImageUploader onImageChange={(image) => setImage(image)}/>
                    <CreateProjectComponents.LabelForProject
                        htmlFor="project">Project:</CreateProjectComponents.LabelForProject>
                    <CreateProjectComponents.StyledInput type="text" id="project" name="project"
                                                         placeholder="Enter project name"
                                                         onBlur={(e) => getUniqueSlug(e.target.value)}
                    />
                    <CreateProjectComponents.LabelForKey
                        htmlFor="project">Key:</CreateProjectComponents.LabelForKey>
                    <CreateProjectComponents.StyledInput type="text" id="slug" name="slug" value={slug}
                                                         placeholder="Enter project key"
                                                         suffix={
                                                             <Tooltip title="Key should be unique">
                                                                 <InfoCircleOutlined/>
                                                             </Tooltip>
                                                         }
                                                         onChange={((e) => setSlug(e.target.value))}
                                                         onBlur={(e) => validateUniqueKey(e.target.value)}
                                                         status={slugError ? 'error' : null}
                    />
                    <CreateProjectComponents.LabelForDescriptionBoc
                        htmlFor="description">Description:</CreateProjectComponents.LabelForDescriptionBoc>
                    <CreateProjectComponents.StyledReactQuill modules={modules} id="exampleEditor" value={text}
                                                              onChange={(value => setText(value))}/>
                    <CreateProjectComponents.LabelForCompany
                        htmlFor="company">Company:</CreateProjectComponents.LabelForCompany>
                    <GenericSelectField
                        onSelectChange={(value) => setSelectedCompany(parseInt(value))}
                        options={companyOptions}
                        isMultiple={false}
                        placeholder={"Unassigned"}
                        width="50%"/>
                    <CreateProjectComponents.Description>Make sure your project lead has access to issues in the
                        project.</CreateProjectComponents.Description>
                    <CreateProjectComponents.LabelforCategory
                        htmlFor="category">Category:</CreateProjectComponents.LabelforCategory>
                    <GenericSelectField
                        onSelectChange={(value) => setSelectedCategory(parseInt(value))}
                        options={categoriesOptions}
                        isMultiple={false}
                        placeholder={"Unassigned"}
                        width="50%"/>
                    <CreateProjectComponents.LabelforLead htmlFor="category">Project
                        Lead:</CreateProjectComponents.LabelforLead>
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
                        {userOptions.map((item) => (
                            <Option key={item.id} value={item.id} label={item.username}>
                                {
                                    item.iconUrl ?
                                        <div>
                                            <Avatar draggable={true} style={{background: "#10899e"}}
                                                    alt={item.username}
                                                    src={`${process.env.REACT_APP_DOMAIN}${item.iconUrl}`}/>{" "}
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
                    <CreateProjectComponents.SaveButton>Save</CreateProjectComponents.SaveButton>
                </CreateProjectComponents.FormWrapper>
            </CreateProjectComponents.PageWrapper>
        </div>
    );
}

export default CreateProject;
