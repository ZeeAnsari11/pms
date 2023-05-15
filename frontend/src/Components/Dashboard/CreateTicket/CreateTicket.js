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
  border: 2px solid #ccc;
  margin-bottom: 16px;
  width: 96%;
  background: rgb(242 242 242);
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
    const [description, setDescription] = useState('');
    const [values, setValues] = useState("");
    const [IssueType, setIssueType] = useState('');
    const [Status, setStatus] = useState('');
    const [Labels, setLabels] = useState('');
    const [Users, setUsers] = useState('');
    const [hours, setHours] = useState("");
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedIssueType, setSelectedIssueType] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedLabels, setSelectedLabels] = useState('');
    const [selectedUsers, setSelectedUsers] = useState('');
    const [selectedReporter, setSelectedReporter] = useState('');
    const [files, setFiles] = useState([]);
    const [project, setProject] = useState('');


    const handleFilesChange = (newFiles) => {
        setFiles(newFiles);
    };

    const handleSummaryChange = (event) => {
        setSummary(event.target.value);
    };
    const handleDescriptionChange = (value) => {
        setDescription(value);
    }

    const handleProjectChange = (value) => {
        setSelectedProject(parseInt(value));
    }

    const handleStatusChange = (value) => {
        setSelectedStatus(parseInt(value));
    }

    const handleIssueChange = (value) => {
        setSelectedIssueType(parseInt(value));
    };

    const handleLabelChange = (value) => {
        setSelectedLabels([parseInt(value)]);
        console.log("Labels", selectedLabels)
    };

    const handleUserChange = (value) => {
        setSelectedUsers([parseInt(value)]);
        console.log("Users", selectedUsers)
    };

    const handleReporterChange = (value) => {
        setSelectedReporter([parseInt(value)]);
        console.log("Reporter", selectedReporter)
    };


    useEffect(() => {
        const fetchProject = async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/projects/', {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setProject(response.data);
        };

        const fetchIssueType = async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/issues_type/', {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setIssueType(response.data);
        };

        const fetchStatusOptions = async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/issues_status/', {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setStatus(response.data);
        }

        const fetchLabelOptions = async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/labels/', {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setLabels(response.data);
        };

        const fetchUserOptions = async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/users_list/', {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setUsers(response.data);
        };

        fetchIssueType()
        fetchProject()
        fetchStatusOptions()
        fetchLabelOptions()
        fetchUserOptions()
    }, [authToken]);
    console.log("Projects:", project)


    const Projectoptions = project
        ? project.map((project) => ({
            label: project.name,
            value: project.id,
        }))
        : [];

    const IssueTypeoptions = IssueType
        ? IssueType.map((IssueType) => ({
            label: IssueType.issue_type,
            value: IssueType.id,
        }))
        : [];

    const Statusoptions = Status
        ? Status.map((Status) => ({
            label: Status.issue_status,
            value: Status.id,
        }))
        : [];

    const Labeloptions = Labels
        ? Labels.map((Labels) => ({
            label: Labels.label,
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

    const handleHoursChange = (totalHours) => {
        setHours(totalHours);
    };


    function handleSubmit(event) {
        event.preventDefault();

        const data = {
            "name": "testing",
            "summary": summary,
            "description": description,
            "file": files,
            "project": selectedProject,
            "reporter": selectedReporter,
            "type": selectedIssueType,
            "status": selectedStatus,
            "assignee": selectedUsers,

        };


        fetch('http://127.0.0.1:8000/api/issues/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}`,
            },
            body: data
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
                                Project
                            </CardInfoBoxTitle>
                            <TaskList>
                                <GenericSelectField
                                    options={Projectoptions}
                                    isMultiple={false}
                                    placeholder={"Unassigned"}
                                    onSelectChange={handleProjectChange}/>
                            </TaskList>
                        </CardInfoBox>

                        <CardInfoBox>
                            <CardInfoBoxTitle>
                                <TbStatusChange/>
                                Issue Type
                            </CardInfoBoxTitle>
                            <TaskList>
                                <GenericSelectField
                                    options={IssueTypeoptions}
                                    isMultiple={false}
                                    placeholder={"Unassigned"}
                                    onSelectChange={handleIssueChange}/>
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
                                Summary
                            </CardInfoBoxTitle>
                            <TaskList>
                                <SummaryInput
                                    type="text"
                                    value={summary}
                                    onChange={handleSummaryChange}
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
                                <UserSelectField users={Useroptions} isMultiple={true} placeholder={"Unassigned"}
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
                                    isMultiple={true}
                                    placeholder={" "}
                                    onSelectChange={handleLabelChange}/>
                            </TaskList>
                        </CardInfoBox>

                        <CardInfoBox>
                            <CardInfoBoxTitle>
                                <FiUser/>
                                Reporter
                            </CardInfoBoxTitle>
                            <UserSelectField users={Useroptions} isMultiple={false} placeholder={"Unassigned"}
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
                                    isMultiple={true}
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
