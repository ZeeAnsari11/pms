import React, {useEffect, useState} from "react";
import {AiOutlineClose,} from "react-icons/ai";
import {TbStatusChange} from "react-icons/tb";
import GenericSelectField from "../SelectFields/GenericSelectField";
import {priorityOptions} from '../../../Shared/Const/Issues'
import ReactQuill from "react-quill";
import {FiUser, FiUsers} from "react-icons/fi";
import {File} from "react-feather";
import FileUpload from "../FileAttachement/FileUpload";
import axios from "axios";
import EstimateTimer from "../EstimateTimer/EstimateTimer";
import * as CreateTicketComponents from "./Style"
import tagRender from "../../../Shared/Components/tagRender";
import { Avatar, Select } from "antd";
import {modules} from "../../../Shared/Const/ReactQuillToolbarOptions";


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


const MyModalComponent = ({onClose}) => {
    const [isHovered, setIsHovered] = useState(false);

    const [summary, setSummary] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState('');
    const [values, setValues] = useState("");

    const [IssueType, setIssueType] = useState('');
    const [Status, setStatus] = useState('');
    const [Labels, setLabels] = useState('');

    const [Users, setUsers] = useState('');
    const [currentUserData, setCurrentUserData] = useState({});
    const [currentUserId, setCurrentUserId] = useState({});

    const [EstimateHours, setEstimateHours] = useState("");

    const [selectedProject, setSelectedProject] = useState('');
    const [selectedIssueType, setSelectedIssueType] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [selectedPriority, setSelectedPriority] = useState('');
    const [selectedUsers, setSelectedUsers] = useState('');
    const [selectedReporter, setSelectedReporter] = useState('');

    const [files, setFiles] = useState([]);
    const [project, setProject] = useState('');


    let authToken = localStorage.getItem('auth_token')
    const { Option } = Select;

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

    const handleLabelChange = (values) => {
        const labelKeys = values.map((value) => {
                return parseInt( value.key, 10 );
            });
        setSelectedLabels(labelKeys);
    };
    console.log("selectedLabels", selectedLabels)

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

    const labelOptions = Labels
        ? Labels.map((Labels) => ({
            key: Labels.id,
            label: Labels.name,
            value: Labels.color,
        }))
        : [];

    const Useroptions = Users
        ? Users.map((Users) => ({
            username: Users.username,
            id: Users.id,
            iconUrl: Users.userprofile?.image,

        }))
        : [];

    console.log("User Options:", Useroptions)

    const Reporteroptions = Users
        ? Users.map((Users) => ({
            username: Users.username,
            id: Users.id,
            iconUrl: Users.userprofile?.image,
        }))
        : [];

    console.log("Reporter Options:", Reporteroptions)

    const handleHoursChange = (totalHours) => {
        setEstimateHours(totalHours);
    };

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const CloseIconhoverStyles = {
        backgroundColor: isHovered ? '#F0F0F0' : 'white',
        transition: 'background-color 0.3s ease',
        cursor: 'pointer',
        marginRight: "5px",
        marginTop: "10px",
        padding: '2px',
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
        selectedLabels.forEach((label) => {
            formData.append("label", label);
        });
        formData.append("estimate", EstimateHours);
        formData.append("status", selectedStatus);
        formData.append("assignee", selectedUsers);
        formData.append("priority", selectedPriority);
        formData.append("created_by", currentUserId);
        formData.append("updated_by", currentUserId);

        fetch(`${process.env.REACT_APP_HOST}/api/issues/`, {
            method: "POST",
            headers: {Authorization: `Token ${authToken}`},
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

        <CreateTicketComponents.ModalOverlay>
            <CreateTicketComponents.ModalContainer>
                <CreateTicketComponents.CardInfoBoxClose>
                    <AiOutlineClose
                        size={20}
                        onClick={onClose}
                        style={CloseIconhoverStyles}
                        onMouseEnter={handleHover}
                        onMouseLeave={handleMouseLeave}
                    />
                </CreateTicketComponents.CardInfoBoxClose>
                <CreateTicketComponents.ModalTitle>Create Issue</CreateTicketComponents.ModalTitle>
                <CreateTicketComponents.ModalContent>
                    <CreateTicketComponents.FormWrapper onSubmit={handleSubmit} encType="multipart/form-data"
                                                        method="POST">
                        <CreateTicketComponents.CardInfoBox>
                            <CreateTicketComponents.CardInfoBoxTitle>
                                <TbStatusChange/>
                                Name
                            </CreateTicketComponents.CardInfoBoxTitle>
                            <CreateTicketComponents.TaskList>
                                <CreateTicketComponents.SummaryInput
                                    type="text"
                                    value={name}
                                    onChange={handleNameChange}
                                    required
                                />
                            </CreateTicketComponents.TaskList>
                        </CreateTicketComponents.CardInfoBox>
                        <CreateTicketComponents.CardInfoBox>
                            <CreateTicketComponents.CardInfoBoxTitle>
                                <TbStatusChange/>
                                Project
                            </CreateTicketComponents.CardInfoBoxTitle>
                            <CreateTicketComponents.TaskList>
                                <GenericSelectField
                                    options={projectOptions}
                                    isMultiple={false}
                                    placeholder={"Unassigned"}
                                    onSelectChange={handleProjectChange}
                                />
                            </CreateTicketComponents.TaskList>
                        </CreateTicketComponents.CardInfoBox>

                        <CreateTicketComponents.CardInfoBox>
                            <CreateTicketComponents.CardInfoBoxTitle>
                                <TbStatusChange/>
                                Type
                            </CreateTicketComponents.CardInfoBoxTitle>
                            <CreateTicketComponents.TaskList>
                                <GenericSelectField
                                    options={IssueTypeoptions}
                                    isMultiple={false}
                                    placeholder={"Unassigned"}
                                    onSelectChange={handleIssueTypeChange}/>
                            </CreateTicketComponents.TaskList>
                        </CreateTicketComponents.CardInfoBox>
                        <CreateTicketComponents.Divider/>
                        <CreateTicketComponents.CardInfoBox>
                            <CreateTicketComponents.CardInfoBoxTitle>
                                <TbStatusChange/>
                                Status
                            </CreateTicketComponents.CardInfoBoxTitle>
                            <CreateTicketComponents.TaskList>
                                <GenericSelectField
                                    options={Statusoptions}
                                    isMultiple={false}
                                    placeholder={"Unassigned"}
                                    onSelectChange={handleStatusChange}/>
                            </CreateTicketComponents.TaskList>
                        </CreateTicketComponents.CardInfoBox>
                        <CreateTicketComponents.CardInfoBox>
                            <CreateTicketComponents.CardInfoBoxTitle>
                                <TbStatusChange/>
                                Priority
                            </CreateTicketComponents.CardInfoBoxTitle>
                            <CreateTicketComponents.TaskList>
                                <GenericSelectField
                                    options={priorityOptions}
                                    isMultiple={false}
                                    placeholder={"Unassigned"}
                                    onSelectChange={handlePriorityChange}/>
                            </CreateTicketComponents.TaskList>
                        </CreateTicketComponents.CardInfoBox>
                        <CreateTicketComponents.CardInfoBox>
                            <CreateTicketComponents.CardInfoBoxTitle>
                                <TbStatusChange/>
                                Summary
                            </CreateTicketComponents.CardInfoBoxTitle>
                            <CreateTicketComponents.TaskList>
                                <CreateTicketComponents.SummaryInput
                                    type="text"
                                    value={summary}
                                    onChange={handleSummaryChange}
                                    required
                                />
                            </CreateTicketComponents.TaskList>
                        </CreateTicketComponents.CardInfoBox>
                        <CreateTicketComponents.CardInfoBox>
                            <CreateTicketComponents.CardInfoBoxTitle>
                                <TbStatusChange/>
                                Description
                            </CreateTicketComponents.CardInfoBoxTitle>
                            <CreateTicketComponents.TaskList>
                                <ReactQuill modules={modules} value={description} onChange={handleDescriptionChange}/>
                            </CreateTicketComponents.TaskList>
                        </CreateTicketComponents.CardInfoBox>
                        <CreateTicketComponents.CardInfoBox>
                            <CreateTicketComponents.CardInfoBoxTitle>
                                <TbStatusChange/>
                                Original Estimate
                            </CreateTicketComponents.CardInfoBoxTitle>
                            <CreateTicketComponents.TaskList>
                                <EstimateTimer onHoursChange={handleHoursChange}/>
                                <p>An estimate of how much work remains until this issue will be resolved.</p>
                                <span>The format of this is ' *w *d *h *m ' (representing weeks, days, hours and minutes - where * can be any number).
                            Examples: 4d, 5h 30m, 60m and 4w 0d 0h 0m.</span>
                            </CreateTicketComponents.TaskList>
                        </CreateTicketComponents.CardInfoBox>

                        <CreateTicketComponents.CardInfoBox>
                            <CreateTicketComponents.CardInfoBoxTitle>
                                <FiUsers/>
                                Assignee
                            </CreateTicketComponents.CardInfoBoxTitle>
                            <CreateTicketComponents.TaskList>
                                <Select
                                        showArrow
                                        filterOption
                                        onChange={(value) => setSelectedUsers(parseInt(value))}
                                        showSearch
                                        optionFilterProp="label"
                                        placeholder="Please select User"
                                        optionLabelProp="label"
                                        value={selectedUsers}
                                        style={{ width: "100%" }}
                                    >
                                    {Useroptions.map((item) => (
                                        <Option key={item.id} value={item.id} label={item.username}>
                                            {
                                                item.iconUrl ?
                                                    <div>
                                                        <Avatar draggable={true} style={{ background: "#10899e" }} alt={item.username} src={`${process.env.REACT_APP_HOST}/${item.iconUrl}`} />{" "}
                                                        {item.username}
                                                    </div> :
                                                    <div>
                                                        <Avatar> {item.username}</Avatar> {" "}{item.username}
                                                    </div>
                                            }
                                        </Option>
                                        ))}
                                    </Select>
                            </CreateTicketComponents.TaskList>
                        </CreateTicketComponents.CardInfoBox>

                        <CreateTicketComponents.CardInfoBox>
                            <CreateTicketComponents.CardInfoBoxTitle>
                                <FiUsers/>
                                Labels
                            </CreateTicketComponents.CardInfoBoxTitle>
                            <Select
                                    mode="multiple"
                                    showArrow
                                    tagRender={tagRender}
                                    style={{
                                        width: '100%',
                                    }}
                                    options={labelOptions}
                                    optionFilterProp="label"
                                    onChange={(value,key)=> {handleLabelChange(key)}}
                                    />
                        </CreateTicketComponents.CardInfoBox>

                        <CreateTicketComponents.CardInfoBox>
                            <CreateTicketComponents.CardInfoBoxTitle>
                                <FiUser/>
                                Reporter
                            </CreateTicketComponents.CardInfoBoxTitle>
                            <CreateTicketComponents.TaskList>
                                <Select
                                        showArrow
                                        filterOption
                                        onChange={(value) =>  setSelectedReporter(parseInt(value))}
                                        showSearch
                                        optionFilterProp="label"
                                        placeholder="Please select User"
                                        optionLabelProp="label"
                                        value={selectedReporter}
                                        style={{ width: "100%" }}
                                    >
                                    {Reporteroptions.map((item) => (
                                        <Option key={item.id} value={item.id} label={item.username}>
                                            {
                                                item.iconUrl ?
                                                    <div>
                                                        <Avatar draggable={true} style={{ background: "#10899e" }} alt={item.username} src={`${process.env.REACT_APP_HOST}/${item.iconUrl}`} />{" "}
                                                        {item.username}
                                                    </div> :
                                                    <div>
                                                        <Avatar> {item.username}</Avatar> {" "}{item.username}
                                                    </div>
                                            }
                                        </Option>
                                        ))}
                                    </Select>
                            </CreateTicketComponents.TaskList>
                        </CreateTicketComponents.CardInfoBox>

                        <CreateTicketComponents.CardInfoBoxCustom>
                            <CreateTicketComponents.CardInfoBoxTitle>
                                <File/>
                                File Attachments
                            </CreateTicketComponents.CardInfoBoxTitle>
                            <FileUpload
                                onFilesChange={handleFilesChange}/>
                        </CreateTicketComponents.CardInfoBoxCustom>

                        <CreateTicketComponents.CardInfoBox>
                            <CreateTicketComponents.CardInfoBoxTitle>
                                <TbStatusChange/>
                                Linked Issues
                            </CreateTicketComponents.CardInfoBoxTitle>
                            <CreateTicketComponents.TaskList>
                                <GenericSelectField
                                    options={LinkedIssue1}
                                    isMultiple={false}
                                    defaultValue={"blocks"}/>
                            </CreateTicketComponents.TaskList>
                            <CreateTicketComponents.TaskList>
                                <GenericSelectField
                                    options={LinkedIssue2}
                                    isMultiple={false}
                                    placeholder={"Select Issue"}/>
                            </CreateTicketComponents.TaskList>
                        </CreateTicketComponents.CardInfoBox>
                        <CreateTicketComponents.SaveButton>Save</CreateTicketComponents.SaveButton>
                    </CreateTicketComponents.FormWrapper>
                </CreateTicketComponents.ModalContent>
            </CreateTicketComponents.ModalContainer>
        </CreateTicketComponents.ModalOverlay>
    )
};

export default MyModalComponent;
