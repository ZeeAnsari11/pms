import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {AiFillCloseCircle} from "react-icons/ai";
import {TbStatusChange} from "react-icons/tb";
import GenericSelectField from "../SelectFields/GenericSelectField";
import ReactQuill from "react-quill";
import {FiUser, FiUsers} from "react-icons/fi";
import UserSelectField from "../SelectFields/UserSelectField";
import {File} from "react-feather";
import FileUpload from "../FileAttachement/FileUpload";
import axios from "axios";
import EstimateTimer from "../EstimateTimer/EstimateTimer";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const LinkedIssue1 = [
    {value: 'option1', label: 'blocks'},
    {value: 'option2', label: 'is blocked by'},
    {value: 'option3', label: 'clones'},
    {value: 'option4', label: 'is cloned by'},
    {value: 'option5', label: 'duplicates'},
    {value: 'option6', label: 'is duplicated by'},
    {value: 'option7', label: 'relates to'},

];

const LinkedIssue2 = [
    {value: 'option1', label: 'NP-2'},
    {value: 'option2', label: 'NP-1'},
    {value: 'option3', label: 'Np-3'},
];


const CardInfoBoxClose = styled.div`
  float: right;
  margin-top: -15px;
  margin-right: -15px;
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
  padding: 24px;
  overflow: auto;
  max-height: 75vh;
  width: 60%;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  margin: 0 0 18px 0;
`;

const ModalContent = styled.div`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 16px;
`;

const CardInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 60%;
  //padding-bottom: 5px;
`;

const CardInfoBoxTitle = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
`;

const TaskList = styled.div`
  margin: 8px 0 15px;
`;

const Divider = styled.div`
  border-bottom: 1px solid #ccc;
`;

const SummaryInput = styled.input`
  font-size: 16px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #D9D9D9;
  margin-bottom: 16px;
  width: 96%;
  background: #FFFFFF;
`;

const Task = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const CardInfoBoxCustom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 25px;
  padding-top: 30px;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const SaveButton = styled.button`
  margin-top: 10px;
  background-color: #0077ff;
  color: white;
  font-size: 16px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: fit-content;

  &:hover {
    background-color: #0066cc;
  }

  &:focus {
    outline: none;
  }
`;

const MyModalComponent = ({onClose}) => {
    let authToken = localStorage.getItem('auth_token')
    const [summary, setSummary] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState('');
    const [values, setValues] = useState("");

    const [IssueType, setIssueType] = useState('');
    const [Status, setStatus] = useState('');
    const [Labels, setLabels] = useState('');
    const [Priority, setPriority] = useState('');

    const [Users, setUsers] = useState('');
    const [Reporter, setReporter] = useState('');
    const [currentUserData, setCurrentUserData] = useState({});
    const [currentUserId, setCurrentUserId] = useState({});

    const [EstimateHours, setEstimateHours] = useState("");

    const [selectedProject, setSelectedProject] = useState('');
    const [selectedIssueType, setSelectedIssueType] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedLabels, setSelectedLabels] = useState('');
    const [selectedPriority, setSelectedPriority] = useState('');
    const [selectedUsers, setSelectedUsers] = useState('');
    const [selectedReporter, setSelectedReporter] = useState('');

    const [files, setFiles] = useState([]);
    const [project, setProject] = useState('');

    console.log("File", files)

    const handleFilesChange = (newFiles) => {
        setFiles(newFiles);
    };

    const handleSummaryChange = (event) => {
        setSummary(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleDescriptionChange = (value) => {
        setDescription(value);
    }

    const handleProjectChange = async (value) => {
        setSelectedProject(parseInt(value));
    }


    useEffect(() => {
        const fetchDependentProjectTypes = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/project_type/?project=${selectedProject}`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setIssueType(response.data);
        };


        const fetchDependentProjectStatuses = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/project_status/?project=${selectedProject}`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setStatus(response.data);
        };

        const fetchDependentProjectLabels = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/project_labels/?project=${selectedProject}`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setLabels(response.data);
        };

        const fetchDependentUserOptions = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/projects/${selectedProject}/assignees/`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setUsers(response.data);
        };

        fetchDependentUserOptions();
        fetchDependentProjectStatuses();
        fetchDependentProjectTypes();
        fetchDependentProjectLabels();
    }, [selectedProject]);
    console.log("DependentProjectTypes:", IssueType)

    const handleStatusChange = (value) => {
        setSelectedStatus(parseInt(value));
    }

    const handlePriorityChange = (value) => {
        setSelectedPriority(value);
    }

    const handleIssueTypeChange = (value) => {
        setSelectedIssueType(parseInt(value));
    };

    const handleLabelChange = (value) => {
        setSelectedLabels(parseInt(value));
        console.log("Labels", selectedLabels)
    };

    const handleUserChange = (value) => {
        setSelectedUsers(parseInt(value));
        console.log("Users", selectedUsers)
    };

    const handleReporterChange = (value) => {
        setSelectedReporter(parseInt(value));
        console.log("Reporter", selectedReporter)
    };


    useEffect(() => {
        const fetchProject = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/projects/`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setProject(response.data);
        };

        const fetchCurrentUserData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_HOST}/api/userprofile/`, {
                    headers: {"Authorization": `Token ${authToken}`}
                });
                setCurrentUserData(response.data[0]);
                setCurrentUserId(response.data[0].id)

            } catch (error) {
                console.error(error);
            }
        }

        fetchProject();
        fetchCurrentUserData();
    }, []);
    console.log("Projects:", project)


    const projectOptions = project
        ? project.map((project) => ({
            label: project.name,
            value: project.id,
        }))
        : [];

    const IssueTypeoptions = IssueType
        ? IssueType.map((IssueType) => ({
            label: IssueType.type,
            value: IssueType.id,
        }))
        : [];

    const Statusoptions = Status
        ? Status.map((Status) => ({
            label: Status.status,
            value: Status.id,
        }))
        : [];


    const Priorityoptions = [
        {label: "Low", value: "Low"},
        {label: "Medium", value: "Medium"},
        {label: "High", value: "High"},
    ]

    const Labeloptions = Labels
        ? Labels.map((Labels) => ({
            label: Labels.name,
            value: Labels.id,
        }))
        : [];

    const Useroptions = Users
        ? Users.map((Users) => ({
            username: Users.username,
            id: Users.id,
        }))
        : [];

    console.log("User Options:", Useroptions)

    const Reporteroptions = Users
        ? Users.map((Users) => ({
            username: Users.username,
            id: Users.id,
        }))
        : [];

    console.log("Reporter Options:", Reporteroptions)

    const handleHoursChange = (totalHours) => {
        setEstimateHours(totalHours);
    };


    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("summary", summary);
        formData.append("description", description);
        files.forEach((file) => {
            formData.append("file", file);
        });
        formData.append("project", selectedProject);
        formData.append("reporter", selectedReporter);
        formData.append("type", selectedIssueType);
        formData.append("label", selectedLabels);
        formData.append("estimate", EstimateHours);
        formData.append("status", selectedStatus);
        formData.append("assignee", selectedUsers);
        formData.append("priority", selectedPriority);
        formData.append("created_by", currentUserId);
        formData.append("updated_by", currentUserId);

        fetch(`${process.env.REACT_APP_HOST}/api/issues/`, {
            method: "POST",
            headers: { Authorization: `Token ${authToken}`},
            body: formData,
        })
            .then((response) => {
                // handle the response
                console.log(response);
                onClose();
                console.log(formData);
            })
            .catch((error) => {
                // handle the error
                console.log(error);
            });
    }
    return (

        <ModalOverlay>
            <ModalContainer>
                <CardInfoBoxClose>
                    <AiFillCloseCircle
                        size={30}
                        onClick={onClose}
                        style={{cursor: "pointer"}}
                    />
                </CardInfoBoxClose>
                <ModalTitle>Create Issue</ModalTitle>
                <ModalContent>
                    <FormWrapper onSubmit={handleSubmit} encType="multipart/form-data" method="POST">
                        <CardInfoBox>
                            <CardInfoBoxTitle>
                                <TbStatusChange/>
                                Name
                            </CardInfoBoxTitle>
                            <TaskList>
                                <SummaryInput
                                    type="text"
                                    value={name}
                                    onChange={handleNameChange}
                                    required
                                />
                            </TaskList>
                        </CardInfoBox>
                        <CardInfoBox>
                            <CardInfoBoxTitle>
                                <TbStatusChange/>
                                Project
                            </CardInfoBoxTitle>
                            <TaskList>
                                <GenericSelectField
                                    options={projectOptions}
                                    isMultiple={false}
                                    placeholder={"Unassigned"}
                                    onSelectChange={handleProjectChange}/>
                            </TaskList>
                        </CardInfoBox>

                        <CardInfoBox>
                            <CardInfoBoxTitle>
                                <TbStatusChange/>
                                Type
                            </CardInfoBoxTitle>
                            <TaskList>
                                <GenericSelectField
                                    options={IssueTypeoptions}
                                    isMultiple={false}
                                    placeholder={"Unassigned"}
                                    onSelectChange={handleIssueTypeChange}/>
                            </TaskList>
                        </CardInfoBox>
                        <Divider/>
                        <CardInfoBox>
                            <CardInfoBoxTitle>
                                <TbStatusChange/>
                                Status
                            </CardInfoBoxTitle>
                            <TaskList>
                                <GenericSelectField
                                    options={Statusoptions}
                                    isMultiple={false}
                                    placeholder={"Unassigned"}
                                    onSelectChange={handleStatusChange}/>
                            </TaskList>
                        </CardInfoBox>
                        <CardInfoBox>
                            <CardInfoBoxTitle>
                                <TbStatusChange/>
                                Priority
                            </CardInfoBoxTitle>
                            <TaskList>
                                <GenericSelectField
                                    options={Priorityoptions}
                                    isMultiple={false}
                                    placeholder={"Unassigned"}
                                    onSelectChange={handlePriorityChange}/>
                            </TaskList>
                        </CardInfoBox>
                        <CardInfoBox>
                            <CardInfoBoxTitle>
                                <TbStatusChange/>
                                Summary
                            </CardInfoBoxTitle>
                            <TaskList>
                                <SummaryInput
                                    type="text"
                                    value={summary}
                                    onChange={handleSummaryChange}
                                    required
                                />
                            </TaskList>
                        </CardInfoBox>
                        <CardInfoBox>
                            <CardInfoBoxTitle>
                                <TbStatusChange/>
                                Description
                            </CardInfoBoxTitle>
                            <TaskList>
                                <ReactQuill value={description} onChange={handleDescriptionChange}/>
                            </TaskList>
                        </CardInfoBox>
                        <CardInfoBox>
                            <CardInfoBoxTitle>
                                <TbStatusChange/>
                                Original Estimate
                            </CardInfoBoxTitle>
                            <TaskList>
                                <EstimateTimer onHoursChange={handleHoursChange}/>
                                <p>An estimate of how much work remains until this issue will be resolved.</p>
                                <span>The format of this is ' *w *d *h *m ' (representing weeks, days, hours and minutes - where * can be any number).
                            Examples: 4d, 5h 30m, 60m and 4w 0d 0h 0m.</span>
                            </TaskList>
                        </CardInfoBox>

                        <CardInfoBox>
                            <CardInfoBoxTitle>
                                <FiUsers/>
                                Assignees
                            </CardInfoBoxTitle>
                            <TaskList>
                                <UserSelectField users={Useroptions} isMultiple={false} placeholder={"Unassigned"}
                                                    onChange={handleUserChange}/>
                            </TaskList>
                        </CardInfoBox>

                        <CardInfoBox>
                            <CardInfoBoxTitle>
                                <FiUsers/>
                                Labels
                            </CardInfoBoxTitle>
                            <TaskList>
                                <GenericSelectField
                                    options={Labeloptions}
                                    isMultiple={false}
                                    placeholder={" "}
                                    onSelectChange={handleLabelChange}/>
                            </TaskList>
                        </CardInfoBox>

                        <CardInfoBox>
                            <CardInfoBoxTitle>
                                <FiUser/>
                                Reporter
                            </CardInfoBoxTitle>
                            <UserSelectField users={Reporteroptions} isMultiple={false} placeholder={"Unassigned"}
                                                onChange={handleReporterChange}/>
                            <TaskList>
                                {values.reporter?.map((item) => (
                                    <Task key={item.id}>
                                        <p>{item.username}</p>
                                        <p>{item.picture}</p>
                                    </Task>
                                ))}
                            </TaskList>
                        </CardInfoBox>

                        <CardInfoBoxCustom>
                            <CardInfoBoxTitle>
                                <File/>
                                File Attachments
                            </CardInfoBoxTitle>
                            <FileUpload
                                onFilesChange={handleFilesChange}/>
                        </CardInfoBoxCustom>

                        <CardInfoBox>
                            <CardInfoBoxTitle>
                                <TbStatusChange/>
                                Linked Issues
                            </CardInfoBoxTitle>
                            <TaskList>
                                <GenericSelectField
                                    options={LinkedIssue1}
                                    isMultiple={false}
                                    defaultValue={"blocks"}/>
                            </TaskList>
                            <TaskList>
                                <GenericSelectField
                                    options={LinkedIssue2}
                                    isMultiple={false}
                                    placeholder={"Select Issue"}/>
                            </TaskList>
                        </CardInfoBox>
                        <SaveButton>Save</SaveButton>
                    </FormWrapper>
                </ModalContent>
            </ModalContainer>
        </ModalOverlay>
    )
};

export default MyModalComponent;