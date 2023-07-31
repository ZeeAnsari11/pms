import React, {useEffect, useRef, useState} from "react";
import {NavLink, useParams} from 'react-router-dom';
import Modal from "../Modal/Modal";
import FileUpload from "../FileAttachement/FileUpload";
import { CheckSquare, File, List, Trash } from "react-feather";
import Editable from "../Editable/Editable";
import Description from "../TextEditor/TextEditor"
import Comment from "../Comment/Comment"
import Worklog from "../Worklog/Worklog";
import 'react-quill/dist/quill.snow.css';
import UserSelectField from '../SelectFields/UserSelectField'
import GenericSelectField from '../SelectFields/GenericSelectField'
import TrackingField from '../TimeTracking/index'
import {AiOutlineClose} from 'react-icons/ai'
import {priorityOptions} from '../../../Shared/Const/Issues'
import {TbStatusChange,TbExchange} from 'react-icons/tb'
import {FiUser} from 'react-icons/fi'
import {CgOptions} from 'react-icons/cg'
import {RxStopwatch} from 'react-icons/rx'
import {TiTags} from "react-icons/ti";
import {IoIosTimer} from 'react-icons/io'
import axios from "axios";
import * as CardInfoComponents from "./Style"
import EstimateTimer from "../EstimateTimer/EstimateTimer";
import tagRender from "../../../Shared/Components/tagRender";
import { Select } from "antd";

function CardInfo(props) {
    let authToken = localStorage.getItem('auth_token')
    const DefaultIssueLabel = props.card?.labels
        ? props.card?.labels.map((IssueType) => ({
            key: IssueType.id,
            label: IssueType.name,
            value: IssueType.color,
        }))
        : [];

    const [isHovered, setIsHovered] = useState(false);

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [selectedComment, setSelectedComment] = useState(null);
    const [showComments, setShowComments] = useState(true);
    const [worklogs, setWorklogs] = useState([]);
    const [showWorklog, setShowWorklog] = useState(false);
    const [selectedWorklog, setSelectedWorklog] = useState(null);

    const [IssuesData, setIssuesData] = useState([]);
    const [IssueLabels, setIssueLabels] = useState('');

    const [IssueType, setIssueType] = useState('');
    const [IssueStatus, setIssueStatus] = useState('');

    const [selectedIssueStatus, setSelectedIssueStatus] = useState('');
    const [selectedIssueType, setSelectedIssueType] = useState('');
    const [selectedPriority, setSelectedPriority] = useState('');
    const [selectedLabels, setSelectedLabels] = useState([]);

    const [selectedAssignee, setSelectedAssignee] = useState('');
    const [selectedReporter, setSelectedReporter] = useState('');

    const [estimateHours, setEstimateHours] = useState("");

    const [Users, setUsers] = useState('');
    const [currentUserData, setCurrentUserData] = useState({});
    const [currentUserEmail, setCurrentUserEmail] = useState({});

    const [files, setFiles] = useState([]);

    const handleLabelChange = (values) => {
        const labelKeys = values.map((value) => {
                return parseInt( value.key, 10 );
            });
        setSelectedLabels(labelKeys);
    };

    const getComments = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/comments/?issue=${props.card?.id}`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setComments(response.data)
        } catch (error) {
            console.log(error);
            throw new Error('Failed to fetch comments');
        }
    };

    const getWorklogs = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/worklogs/?issue=${props.card?.id}`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setWorklogs(response.data)
        } catch (error) {
            console.log(error);
            throw new Error('Failed to fetch comments');
        }
    };

    useEffect(() => {
        const fetchCurrentUserEmail = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_HOST}/api/auth/users/me/`, {
                    headers: {"Authorization": `Token ${authToken}`}
                });
                setCurrentUserEmail(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchCurrentUserEmail();
    }, []);

    useEffect(() => {
        const fetchIssueData = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/issues/${props.card?.id}`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setIssuesData(response.data);
        };
        const fetchComments = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/comments/?issue=${props.card?.id}`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setComments(response.data);
        };
        const fetchWorklogs = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/worklogs/?issue=${props.card?.id}`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setWorklogs(response.data);
        };

        const fetchDependentUserOptions = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/projects/${props.card.project}/assignees/`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setUsers(response.data);
        };


        const fetchDependentProjectTypes = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/project_type/?project=${props.card.project}`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setIssueType(response.data);
        };


        const fetchDependentProjectStatuses = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/project_status/?project=${props.card.project}`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setIssueStatus(response.data);
        };

        const fetchDependentProjectLabels = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/project_labels/?project=${projectId}`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setIssueLabels(response.data);
        };

        const fetchCurrentUserDataFromUserList = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_HOST}/api/userprofile/?user__email__iexact=${currentUserEmail}`, {
                    headers: {"Authorization": `Token ${authToken}`}
                });
                setCurrentUserData(response.data[0]);
            } catch (error) {
                console.error(error);
            }
        }
        fetchIssueData();
        fetchDependentProjectLabels();
        fetchDependentUserOptions();
        fetchDependentProjectStatuses();
        fetchDependentProjectTypes();
        fetchCurrentUserDataFromUserList();
        fetchComments();
        fetchWorklogs();

    }, []);
    console.log("currentUserEmail:", currentUserEmail)
    console.log("selectedLabels:", selectedLabels)


    useEffect(() => {
        if (currentUserEmail) {
            const fetchCurrentUserDataFromUserList = async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_HOST}/api/userprofile/?user__email__iexact=${currentUserEmail.email}`, {
                        headers: {"Authorization": `Token ${authToken}`}
                    });
                    setCurrentUserData(response.data[0]);
                } catch (error) {
                    console.error(error);
                }
            }
            fetchCurrentUserDataFromUserList();
        }
    }, [currentUserEmail]);


    useEffect(() => {
        if (IssuesData?.id) {
            setSelectedReporter(IssuesData?.reporter?.id)
            setSelectedAssignee(IssuesData?.assignee?.id)
            setSelectedIssueType(IssuesData?.type?.id)
            setSelectedIssueStatus(IssuesData?.status?.id)
            setSelectedPriority(IssuesData?.priority)
            setEstimateHours(IssuesData?.estimate)
            setSelectedLabels(IssuesData?.label?.map((label) => label.id) || []);
        }
    }, [IssuesData]);

    useEffect(() => {
    }, [])
    const selectedLabelsOptions = selectedLabels.map((label) => ({
        label: label.label,
        value: label.value,
        color: label.color,
    }));


    console.log("selectedLabelsOptions:", selectedLabelsOptions)

    const handleCommentSubmit = (event) => {
        event.preventDefault();

        const commentData = {
            body: newComment,
            issue: props.card?.id,
            user: currentUserData?.id,
        };

        axios
            .post(`${process.env.REACT_APP_HOST}/api/comments/`, commentData, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setComments([...comments, response.data]);
                getComments();
                setNewComment("");
            })
            .catch((error) => {
                // Handle error
                console.log(error);
            });
    };


    const handleNewCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentDelete = (index) => {
        axios
            .delete(`${process.env.REACT_APP_HOST}/api/comments/${index}/`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            })
            .then((response) => {
                // Comment deleted successfully, update the state or perform any necessary actions
                setComments((prevComments) =>
                    prevComments.filter((_, i) => i !== index)
                );
                getComments();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCommentEdit = (index, comment, key) => {
        if (selectedComment === null) {
            setSelectedComment(index);
        } else if (selectedComment === index) {
            const updatedComment = {...comment, body: comment};

            const commentData = {
                body: updatedComment.body,
                issue: props.card?.id,
                user: currentUserData?.id,
            };

            axios
                .patch(
                    `${process.env.REACT_APP_HOST}/api/comments/${index}/`,
                    commentData,
                    {
                        headers: {
                            Authorization: `Token ${authToken}`,
                        },
                    }
                )
                .then((response) => {
                    // Handle successful response
                    console.log(response.data);

                    const updatedComments = [...comments];
                    updatedComments[index] = response.data?.body; // Replace the comment at the specified index
                    setComments(
                        comments.map((c, i) => (i === index ? comment : c))
                    );
                    setSelectedComment(null);
                    getComments();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const [description, setDescription] = useState(props.card?.desc);
    const handleDescChange = (newDesc) => {
        setDescription(newDesc);
    };

    const [showDescription, setShowDescription] = useState(false);
    const descriptionBoxRef = useRef(null);

    // State to hold the card information
    const [values, setValues] = useState({...props.card, user: []});

    const addTask = (value) => {
        const task = {
            id: Date.now() + Math.random(),
            text: value,
            complete: false
        }

        setValues({...values, tasks: [...values.tasks, task]});
    };
    const removeTask = (id) => {
        const tempTasks = values.tasks?.filter(item => item.id !== id);
        setValues({...values, tasks: tempTasks});
    };
    const updateTask = (id, complete) => {
        const index = values.tasks?.findIndex((item) => item.id === id);
        if (index < 0) return;

        const tempTasks = [...values.tasks];
        tempTasks[index].complete = complete;
        setValues({...values, tasks: tempTasks});
    };


    const IssueTypeoptions = IssueType
        ? IssueType.map((IssueType) => ({
            label: IssueType.type,
            value: IssueType.id,
        }))
        : [];

    const statusOptions = IssueStatus
        ? IssueStatus.map((Status) => ({
            label: Status.status,
            value: Status.id,
        }))
        : [];

    const fileArray = props.card?.file
    const prefix = "http://localhost:8000";
    const combinedArray = fileArray.map((file) => `${prefix}${file}`);

    console.log(combinedArray);

    const Useroptions = Users
        ? Users.map((Users) => ({
            username: Users.username,
            id: Users.id,
            iconUrl: Users.userprofile?.image,
        }))
        : [];

    const labelOptions = IssueLabels
        ? IssueLabels.map((Labels) => ({
            key: Labels.id,
            label: Labels.name,
            value: Labels.color,
        }))
        : [];

    console.log("labelOptions:", labelOptions)

    const CloseIconhoverStyles = {
        backgroundColor: isHovered ? '#F0F0F0' : 'white',
        transition: 'background-color 0.3s ease',
        cursor: 'pointer',
        padding: '2px',
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (descriptionBoxRef.current && !descriptionBoxRef.current.contains(event.target)) {
                setShowDescription(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [descriptionBoxRef]);

    useEffect(() => {
        props.updateCard(props.card.id, props.boardId, values)
    }, [values])

    const handleCloseModalSubmit = () => {
        props.onClose();

        const formData = new FormData();
        formData.append("type", selectedIssueType);
        formData.append("status", selectedIssueStatus);
        formData.append("assignee", selectedAssignee);
        formData.append("reporter", selectedReporter);
        formData.append("priority", selectedPriority);
        formData.append("description", description);
        formData.append("estimate", estimateHours);
        formData.append("name", values.title);
        files.forEach((file) => {
            formData.append("file", file);
        });
        selectedLabels.forEach((label) => {
            formData.append("label", label);
        });


        axios({
            method: 'patch',
            url: `${process.env.REACT_APP_HOST}/api/issues/${props.card.id}/`,
            headers: {
                'Authorization': `Token ${authToken}`,
            },
            data: formData
        })
            .then(response => {
                // handle the response
                console.log(response.data);
            })
            .catch(error => {
                // handle the error
                console.log(error);
            });

    }
    const {projectId} = useParams()


    return (
        <Modal onClose={() => handleCloseModalSubmit()}>
            <div style={{width: "55%"}}>
                <div className="modal-header">
                    <CardInfoComponents.StyledSlug>
                        <NavLink to={`/project/${projectId}/browse/issue/${props.card?.id}`} target="_blank">
                            <b>{props.card?.slug.toUpperCase()}</b>
                        </NavLink>
                    </CardInfoComponents.StyledSlug>
                </div>
                <CardInfoComponents.ModalTitleStyling>
                    <Editable
                        text={values.title}
                        default={values.title}
                        placeholder={"Enter Title"}
                        fontWeight={"bold"}
                        buttonText="Set Title"
                        onSubmit={(value) => setValues({...values, title: value})}
                        bold={props.bold}
                    />
                </CardInfoComponents.ModalTitleStyling>
                <div>
                    <CardInfoComponents.CardInfoBoxCustom>
                        <CardInfoComponents.CardInfoBoxTitle>
                            <List/>
                            Card Description
                        </CardInfoComponents.CardInfoBoxTitle>
                        <Description initialValue={values.desc} onSave={handleDescChange}/>
                    </CardInfoComponents.CardInfoBoxCustom>
                    <CardInfoComponents.CardInfoBoxCustom>
                        <CardInfoComponents.CardInfoBoxTitle>
                            <File/>
                            File Attachments
                        </CardInfoComponents.CardInfoBoxTitle>
                        <FileUpload onFilesChange={(value) => setFiles(value)} fileAttachmentArray={combinedArray}/>
                    </CardInfoComponents.CardInfoBoxCustom>
                </div>
                <CardInfoComponents.CardInfoBox>
                    <CardInfoComponents.CardInfoBoxTitle>
                        <CheckSquare/>
                        Tasks
                    </CardInfoComponents.CardInfoBoxTitle>
                    <CardInfoComponents.TaskList>
                        {values.tasks?.map((item) => (
                            <CardInfoComponents.Task key={item.id}>
                                <input type="checkbox"
                                       defaultChecked={item.complete}
                                       onChange={(event) =>
                                           updateTask(item.id, event.target.checked)}
                                />
                                <p>{item.text}</p>
                                <Trash onClick={() => removeTask(item.id)}/>
                            </CardInfoComponents.Task>
                        ))}
                    </CardInfoComponents.TaskList>
                    <CardInfoComponents.ModalTitle>
                        <Editable
                            text={"Add New Task"}
                            placeholder={"Enter New Task"}
                            buttonText="Save Task"
                            fontWeight={"bold"}
                            hoverBackgroundColor={"#EBECF0"}
                            onSubmit={(value) => addTask(value)}
                        />
                    </CardInfoComponents.ModalTitle>
                </CardInfoComponents.CardInfoBox>
                <CardInfoComponents.CardInfoBox style={{marginTop: '15px'}}>

                    <>
                        <CardInfoComponents.CardInfoBoxCustom>
                            <CardInfoComponents.CardInfoBoxTitle>Activity</CardInfoComponents.CardInfoBoxTitle>
                            <div style={{display: 'flex', gap: '8px', borderRadius: '4px'}}>
                                <CardInfoComponents.ActivityButton active={showComments} onClick={() => {
                                    setShowComments(true);
                                    setShowWorklog(false);
                                    setSelectedWorklog(null);
                                }}>
                                    Comments
                                </CardInfoComponents.ActivityButton>
                                <CardInfoComponents.ActivityButton active={showWorklog} onClick={() => {
                                    setShowWorklog(true);
                                    setShowComments(false);
                                    setSelectedComment(null);
                                }}>
                                    Work log
                                </CardInfoComponents.ActivityButton>
                            </div>
                        </CardInfoComponents.CardInfoBoxCustom>
                        {showComments && (
                            <CardInfoComponents.CardInfoBoxCustom>
                                <CardInfoComponents.CardInfoBoxTitle>Comments</CardInfoComponents.CardInfoBoxTitle>
                                <CardInfoComponents.FormContainer onSubmit={handleCommentSubmit}>
                                    <CardInfoComponents.CommentInput
                                        type="text"
                                        placeholder="Leave a comment"
                                        value={newComment}
                                        onChange={handleNewCommentChange}
                                    />
                                    <CardInfoComponents.CommentButton
                                        type="submit">Send</CardInfoComponents.CommentButton>
                                </CardInfoComponents.FormContainer>
                                <ul>
                                    {comments.map((comment, index) => (
                                        <Comment
                                            key={index}
                                            comment={comment?.body}
                                            created_at={comment?.created_at}
                                            index={comment?.id}
                                            created_by={comment?.user}
                                            commentUserId={comment?.user?.id}
                                            currentUser={currentUserData}
                                            onDelete={handleCommentDelete}
                                            onEdit={handleCommentEdit}
                                            selectedComment={selectedComment}
                                        />
                                    ))}
                                </ul>
                            </CardInfoComponents.CardInfoBoxCustom>
                        )}
                        {showWorklog && (
                            <CardInfoComponents.CardInfoBoxCustom>
                                <CardInfoComponents.CardInfoBoxTitle>Worklog</CardInfoComponents.CardInfoBoxTitle>
                                <ul style={{marginTop: "-30px", marginBottom: "50px"}}>
                                    {worklogs.map((worklog, index) => (
                                        <Worklog
                                            created_at={worklog?.created_at}
                                            worklogDate={worklog.date}
                                            worklogTime={worklog.time}
                                            created_by={worklog?.user}
                                            worklogUserId={worklog?.user?.id}
                                            currentUser={currentUserData}
                                            key={index}
                                            index={worklog?.id}
                                            worklog={worklog}
                                            onDelete={() => getWorklogs()}
                                            onEdit={() => getWorklogs()}
                                            selectedWorklog={selectedWorklog}
                                        />
                                    ))}
                                </ul>
                            </CardInfoComponents.CardInfoBoxCustom>
                        )}
                    </>
                </CardInfoComponents.CardInfoBox>
            </div>
            <div style={{width: "35%", float: "right"}}>

                <CardInfoComponents.CardInfoClose>
                    <CardInfoComponents.CardInfoBoxClose>
                        <AiOutlineClose
                            size={20}
                            onClick={handleCloseModalSubmit}
                            style={CloseIconhoverStyles}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        />
                    </CardInfoComponents.CardInfoBoxClose>
                </CardInfoComponents.CardInfoClose>
                <CardInfoComponents.CardInfoBox>
                    <CardInfoComponents.CardInfoBoxTitle>
                        <TbExchange/>
                        Type
                    </CardInfoComponents.CardInfoBoxTitle>
                    <CardInfoComponents.TaskList>
                        <GenericSelectField
                            options={IssueTypeoptions}
                            isMultiple={false}
                            placeholder={"Unassigned"}
                            defaultValue={props.card?.type?.type}
                            onSelectChange={(value) => setSelectedIssueType(parseInt(value))}
                        />
                    </CardInfoComponents.TaskList>

                </CardInfoComponents.CardInfoBox>

                <CardInfoComponents.CardInfoBox>
                    <CardInfoComponents.CardInfoBoxTitle>
                        <TbStatusChange/>
                        Status
                    </CardInfoComponents.CardInfoBoxTitle>
                    <CardInfoComponents.TaskList>
                        <GenericSelectField
                            options={statusOptions}
                            isMultiple={false}
                            placeholder={"Unassigned"}
                            defaultValue={props.card?.status?.status}
                            onSelectChange={(value) => setSelectedIssueStatus(parseInt(value))}
                        />
                    </CardInfoComponents.TaskList>

                </CardInfoComponents.CardInfoBox>
                <CardInfoComponents.CardInfoBox>
                    <CardInfoComponents.CardInfoBoxTitle>
                        <FiUser/>
                        Assignee
                    </CardInfoComponents.CardInfoBoxTitle>
                    <CardInfoComponents.TaskList>
                        <UserSelectField defaultValue={props.card?.assignee?.username} users={Useroptions}
                                         isMultiple={false}
                                         placeholder={"Unassigned"}
                                         onSelectChange={(value) => setSelectedAssignee(parseInt(value))}
                        />
                    </CardInfoComponents.TaskList>
                </CardInfoComponents.CardInfoBox>
                <CardInfoComponents.CardInfoBox>
                    <CardInfoComponents.CardInfoBoxTitle>
                        <FiUser/>
                        Reporter
                    </CardInfoComponents.CardInfoBoxTitle>
                    <CardInfoComponents.TaskList>
                        <UserSelectField defaultValue={props.card?.reporter?.username} users={Useroptions}
                                            isMultiple={false}
                                            placeholder={"Unassigned"}
                                            onSelectChange={(value) => setSelectedReporter(parseInt(value))}
                        />
                    </CardInfoComponents.TaskList>
                </CardInfoComponents.CardInfoBox>

                <CardInfoComponents.CardInfoBox>
                    <CardInfoComponents.CardInfoBoxTitle>
                        <CgOptions/>
                        Priority
                    </CardInfoComponents.CardInfoBoxTitle>
                    <CardInfoComponents.TaskList>
                        <GenericSelectField options={priorityOptions} defaultValue={props.card?.priority}
                                            isMultiple={false} placeholder={"Unassigned"}
                                            onSelectChange={(value) => setSelectedPriority(value)}
                        />
                    </CardInfoComponents.TaskList>
                </CardInfoComponents.CardInfoBox>

                <CardInfoComponents.CardInfoBox>
                    <CardInfoComponents.CardInfoBoxTitle>
                        <TiTags/>
                        Labels
                    </CardInfoComponents.CardInfoBoxTitle>
                    <Select
                        mode="multiple"
                        showArrow
                        tagRender={tagRender}
                        style={{
                            width: '100%',
                        }}
                        defaultValue={DefaultIssueLabel}
                        options={labelOptions}
                        optionFilterProp="label"
                        onChange={(value,key)=> {handleLabelChange(key)}}
                        placeholder="Select Labels"
                    />
                </CardInfoComponents.CardInfoBox>
                <CardInfoComponents.CardInfoBox>
                    <CardInfoComponents.CardInfoBoxTitle>
                        <IoIosTimer/>
                        Original Estimate
                    </CardInfoComponents.CardInfoBoxTitle>
                    <div>
                        <EstimateTimer defaultValue={props.card?.estimate}
                                        onHoursChange={(value) => setEstimateHours(value)}/>
                    </div>
                </CardInfoComponents.CardInfoBox>


                <CardInfoComponents.CardInfoBox>
                    <CardInfoComponents.CardInfoBoxTitle>
                        <RxStopwatch/>
                        Time Tracking
                    </CardInfoComponents.CardInfoBoxTitle>
                    <div>
                        <TrackingField OriginalEstimate={props.card?.estimate}/>
                    </div>
                </CardInfoComponents.CardInfoBox>


            </div>
        </Modal>
    )
}

export default CardInfo