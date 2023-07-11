import React, {useEffect, useState } from 'react';
import styled from 'styled-components';
import apiRequest from '../../../Utils/apiRequest';
import Toast from "../../../Shared/Components/Toast"
import { displayErrorMessage, displaySuccessMessage } from "../../../Shared/notify"
import {v4 as uuidv4} from 'uuid';
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import NavBar from "../../Dashboard/Navbar";
import GenericSelectField from "../../Dashboard/SelectFields/GenericSelectField";
import ImageUploader from "../ImageUploader";

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

const LabelForDescriptionBoc = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-right: 270px;
`;

const LabelforLead = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-top: 10px;
  margin-right: 265px;
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
  margin-top: 5px;
`;

const LabelforCategory
    = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-right: 288px;
`;


const LabelforAssignees
    = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-right: 288px;
  margin-top: 0.5rem;
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
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-right: 310px;

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

    const handleSelectedProjectAssigneesChange = (value) => {
        setSelectedProjectAssignees(value.map((value) => parseInt(value, 10)));
    };



    useEffect(() => {
        const fetchCompanies = async () => {
            const response =
                await apiRequest
                    .get(`/api/companies/`, {
                        headers: {
                            Authorization: `Token ${authToken}`},
                    } );
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
                } );
            setUsersData(response.data);
        };
        fetchCompanies().then() // @todo handle the exception on Company fetch
        fetchCategories().then() // @todo handle the exception on Categories fetch
        fetchUsers().then() // @todo handle the exception on Users fetch
    }, []);

    const companyOptions = companyData ? companyData.map(
        (company) => ({ label: company.company_name, value: company.id, })
    ) : [];


    const categoriesOptions = categoryData ? categoryData.map(
        (category) => ({ label: category.category, value: category.id, })
    ) : [];

    const userOptions = usersData ? usersData.map(
        (user) => ({ label: user.username, value: user.id, })
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
            } )
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
            <Toast />
            <PageWrapper>
                <Header>
                    <Details>Details</Details>
                </Header>
                <FormWrapper onSubmit={handleSubmit} method="POST">
                    <ImageUploader onImageChange={handleImageChange}/>
                    <LabelForProject htmlFor="project">Project:</LabelForProject>
                    <Input type="text" id="project" name="project" placeholder="Enter project name"/>
                    <LabelForDescriptionBoc htmlFor="key">Description:</LabelForDescriptionBoc>
                    <StyledReactQuill id="exampleEditor" value={text} onChange={handleTextChange}/>
                    <LabelForCompany htmlFor="category">Company:</LabelForCompany>
                    <GenericSelectField
                        onSelectChange={handleSelectedCompanyChange}
                        options={companyOptions}
                        isMultiple={false}
                        placeholder={"Unassigned"}
                        width="50%"/>
                    <Description>Make sure your project lead has access to issues in the project.</Description>
                    <LabelforCategory htmlFor="category">Category:</LabelforCategory>
                    <GenericSelectField
                        onSelectChange={handleSelectedCategoryChange}
                        options={categoriesOptions}
                        isMultiple={false}
                        placeholder={"Unassigned"}
                        width="50%"/>
                    <LabelforAssignees htmlFor="assignees">Assignee:</LabelforAssignees>
                    <GenericSelectField
                        onSelectChange={handleSelectedProjectAssigneesChange}
                        options={userOptions}
                        isMultiple={true}
                        placeholder={"Unassigned"}
                        width="50%"/>
                    <LabelforLead htmlFor="category">Project Lead:</LabelforLead>
                    <GenericSelectField
                        onSelectChange={handleSelectedProjectLeadChange}
                        options={userOptions}
                        isMultiple={false}
                        placeholder={"Unassigned"}
                        width="50%"/>
                    <SaveButton>Save</SaveButton>
                </FormWrapper>
            </PageWrapper>
        </div>
    );
}

export default CreateProject;
