import React, {useEffect, useRef, useState} from "react";
import {NavLink, useParams} from 'react-router-dom';
import Modal from "../Modal/Modal";
import FileUpload from "../FileAttachement/FileUpload";
import {
    Calendar,
    CheckSquare, Clock, File,
    List,
    Tag,
    Trash,
    Type,
    User,
    Users,
} from "react-feather";
import Editable from "../Editable/Editable";
import Description from "../TextEditor/TextEditor"
import Comment from "../Comment/Comment"
import Worklog from "../Worklog/Worklog";

import 'react-quill/dist/quill.snow.css';
import UserSelectField from '../SelectFields/UserSelectField'
import GenericSelectField from '../SelectFields/GenericSelectField'
import TrackingField from '../TimeTracking/index'
import {AiOutlineArrowDown, AiOutlineArrowUp, AiFillCloseCircle} from 'react-icons/ai'
import {TbStatusChange} from 'react-icons/tb'
import {FiUser, FiUsers} from 'react-icons/fi'
import {CgOptions} from 'react-icons/cg'
import {RxStopwatch} from 'react-icons/rx'
import styled from 'styled-components';
import axios from "axios";

const ModalTitleStyling = styled.div`
  width: 100%;
`;

const CardInfoBoxCustom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 25px;
`;

const CardInfoBoxTitle = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const CardInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TaskList = styled.div`
  margin: 8px 0 25px;
`;


const StyledSlug = styled.div`
  color: #0847A6;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ModalTitle = styled.div`
  width: fit-content;
`;

const Task = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;


const ActivityButton = styled.button`
  cursor: pointer;
  border-radius: 5px;
  background-color: #F4F5F7;
  color: black;
  border: none;
  transition: 100ms ease;
  padding: 10px;
  font-size: inherit;
`;

const CommentInput = styled.input`
  flex: 1;
  margin-right: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const CommentButton = styled.button`
  padding: 8px 12px;
  background-color: #0052cc;
  color: #fff;
  border: none;
  border-radius: 3px;
`;

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;


const CardInfoClose = styled.div`
  gap: 10px;
  padding-bottom: 50px;
`;

const CardInfoBoxClose = styled.div`
  float: right;
`;


function CardInfo(props) {
    let authToken = localStorage.getItem('auth_token')


    const handleWorklogDelete = (index) => {
        const newWorklogs = [...worklogs];
        newWorklogs.splice(index, 1);
        setWorklogs(newWorklogs);
        getWorklogs();
    };

    const handleWorklogEdit = (index) => {
        setWorklogs([...worklogs])
        getWorklogs();
    };

    //Comments
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [selectedComment, setSelectedComment] = useState(null);
    const [showComments, setShowComments] = useState(true);
    const [worklogs, setWorklogs] = useState([]);
    const [showWorklog, setShowWorklog] = useState(false);
    const [selectedWorklog, setSelectedWorklog] = useState(null);

    const [IssuesData, setIssuesData] = useState([]);
    const [IssueType, setIssueType] = useState('');
    const [IssueStatus, setIssueStatus] = useState('');

    const [selectedIssueStatus, setSelectedIssueStatus] = useState('');
    const [selectedIssueType, setSelectedIssueType] = useState('');
    const [selectedPriority, setSelectedPriority] = useState('');

    const [selectedAssignee, setSelectedAssignee] = useState('');
    const [selectedReporter, setSelectedReporter] = useState('');

    const [Users, setUsers] = useState('');
    const [currentUserData, setCurrentUserData] = useState({});
    const [currentUserEmail, setCurrentUserEmail] = useState({});

    const [files, setFiles] = useState([]);


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
        // fetchCurrentUserDataFromUserList();
        fetchDependentUserOptions();
        fetchDependentProjectStatuses();
        fetchDependentProjectTypes();
        fetchComments();
        fetchWorklogs();

    }, []);
    console.log("currentUserEmail:", currentUserEmail)

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
        }
    }, [IssuesData]);


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
                // Handle successful response
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
                // Handle the error appropriately
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
                    // Handle error
                    console.log(error);
                });
        }
    };


    const handleIssueTypeChange = (value) => {
        setSelectedIssueType(parseInt(value))
    };

    const handleIssueStatusChange = (value) => {
        setSelectedIssueStatus(parseInt(value))
    };

    const handlePriorityChange = (value) => {
        setSelectedPriority(value)
    }

    const handleAssigneeChange = (value) => {
        setSelectedAssignee(parseInt(value));
    };

    const handleReporterChange = (value) => {
        setSelectedReporter(parseInt(value));
    };


    const handleFilesChange = (newFiles) => {
        setFiles(newFiles);
    };

//Description
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


    const Priorityoptions = [
        {label: "Low", value: "Low", icon: <AiOutlineArrowDown color={"#2E8738"}/>},
        {label: "Medium", value: "Medium", icon: <AiOutlineArrowUp color={"#E97F33"}/>},
        {label: "High", value: "High", icon: <AiOutlineArrowUp color={"#E9494B"}/>},
    ]

    const fileArray = props.card?.file
    const prefix = "http://localhost:8000";
    const combinedArray = fileArray.map((file) => `${prefix}${file}`);

    console.log(combinedArray);

    const Useroptions = Users
        ? Users.map((Users) => ({
            username: Users.username,
            id: Users.id,
        }))
        : [];

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
        formData.append("name", values.title);
        files.forEach((file) => {
            formData.append("file", file);
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
                    <StyledSlug>
                        <NavLink to={`/project/${projectId}/browse/issue/${props.card?.id}`} target="_blank">
                            <b>{props.card?.slug.toUpperCase()}</b>
                        </NavLink>
                    </StyledSlug>
                </div>
                <ModalTitleStyling>
                    <Editable
                        text={values.title}
                        default={values.title}
                        placeholder={"Enter Title"}
                        fontWeight={"bold"}
                        buttonText="Set Title"
                        onSubmit={(value) => setValues({...values, title: value})}
                        bold={props.bold}
                    />
                </ModalTitleStyling>
                <div>
                    <CardInfoBoxCustom>
                        <CardInfoBoxTitle>
                            <List/>
                            Card Description
                        </CardInfoBoxTitle>
                        <Description initialValue={values.desc} onSave={handleDescChange}/>
                    </CardInfoBoxCustom>
                    <CardInfoBoxCustom>
                        <CardInfoBoxTitle>
                            <File/>
                            File Attachments
                        </CardInfoBoxTitle>
                        <FileUpload onFilesChange={handleFilesChange} fileAttachmentArray={combinedArray}/>
                    </CardInfoBoxCustom>
                </div>
                <CardInfoBox>
                    <CardInfoBoxTitle>
                        <CheckSquare/>
                        Tasks
                    </CardInfoBoxTitle>
                    <TaskList>
                        {values.tasks?.map((item) => (
                            <Task key={item.id}>
                                <input type="checkbox"
                                       defaultChecked={item.complete}
                                       onChange={(event) =>
                                           updateTask(item.id, event.target.checked)}
                                />
                                <p>{item.text}</p>
                                <Trash onClick={() => removeTask(item.id)}/>
                            </Task>
                        ))}
                    </TaskList>
                    <ModalTitle>
                        <Editable
                            text={"Add New Task"}
                            placeholder={"Enter New Task"}
                            buttonText="Save Task"
                            fontWeight={"bold"}
                            hoverBackgroundColor={"#EBECF0"}
                            onSubmit={(value) => addTask(value)}
                        />
                    </ModalTitle>
                </CardInfoBox>
                <CardInfoBox style={{marginTop: '15px'}}>

                    <>
                        <CardInfoBoxCustom>
                            <CardInfoBoxTitle>Activity</CardInfoBoxTitle>
                            <div style={{display: 'flex', gap: '8px', borderRadius: '4px'}}>
                                <ActivityButton active={showComments} onClick={() => {
                                    setShowComments(true);
                                    setShowWorklog(false);
                                    setSelectedWorklog(null);
                                }}>
                                    Comments
                                </ActivityButton>
                                <ActivityButton active={showWorklog} onClick={() => {
                                    setShowWorklog(true);
                                    setShowComments(false);
                                    setSelectedComment(null);
                                }}>
                                    Work log
                                </ActivityButton>
                            </div>
                        </CardInfoBoxCustom>
                        {showComments && (
                            <CardInfoBoxCustom>
                                <CardInfoBoxTitle>Comments</CardInfoBoxTitle>
                                <FormContainer onSubmit={handleCommentSubmit}>
                                    <CommentInput
                                        type="text"
                                        placeholder="Leave a comment"
                                        value={newComment}
                                        onChange={handleNewCommentChange}
                                    />
                                    <CommentButton type="submit">Send</CommentButton>
                                </FormContainer>
                                <ul>
                                    {comments.map((comment, index) => (
                                        <Comment
                                            key={index}
                                            comment={comment?.body}
                                            created_at={comment?.created_at}
                                            index={comment?.id}
                                            created_by={comment?.user?.username}
                                            commentUserId={comment?.user?.id}
                                            currentUser={currentUserData}
                                            onDelete={handleCommentDelete}
                                            onEdit={handleCommentEdit}
                                            selectedComment={selectedComment}
                                        />
                                    ))}
                                </ul>
                            </CardInfoBoxCustom>
                        )}
                        {showWorklog && (
                            <CardInfoBoxCustom>
                                <CardInfoBoxTitle>Worklog</CardInfoBoxTitle>
                                <ul style={{marginTop: "-30px"}}>
                                    {worklogs.map((worklog, index) => (
                                        <Worklog
                                            created_at={worklog?.created_at}
                                            worklogDate={worklog.date}
                                            worklogTime={worklog.time}
                                            created_by={worklog?.user?.username}
                                            worklogUserId={worklog?.user?.id}
                                            currentUser={currentUserData}
                                            key={index}
                                            index={worklog?.id}
                                            worklog={worklog}
                                            onDelete={handleWorklogDelete}
                                            onEdit={handleWorklogEdit}
                                            selectedWorklog={selectedWorklog}
                                        />
                                    ))}
                                </ul>
                            </CardInfoBoxCustom>
                        )}
                    </>
                </CardInfoBox>
            </div>
            <div style={{width: "35%", float: "right"}}>

                <CardInfoClose>
                    <CardInfoBoxClose>
                        <AiFillCloseCircle
                            size={30}
                            onClick={handleCloseModalSubmit}
                            style={{cursor: "pointer"}}
                        />
                    </CardInfoBoxClose>
                </CardInfoClose>
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
                            defaultValue={props.card?.type?.type}
                            onSelectChange={handleIssueTypeChange}
                        />
                    </TaskList>

                </CardInfoBox>

                <CardInfoBox>
                    <CardInfoBoxTitle>
                        <TbStatusChange/>
                        Status
                    </CardInfoBoxTitle>
                    <TaskList>
                        <GenericSelectField
                            options={statusOptions}
                            isMultiple={false}
                            placeholder={"Unassigned"}
                            defaultValue={props.card?.status?.status}
                            onSelectChange={handleIssueStatusChange}
                        />
                    </TaskList>

                </CardInfoBox>
                <CardInfoBox>
                    <CardInfoBoxTitle>
                        <FiUsers/>
                        Assignee
                    </CardInfoBoxTitle>
                    <TaskList>
                        <UserSelectField defaultValue={props.card?.assignee?.username} users={Useroptions}
                                            isMultiple={false}
                                            placeholder={"Unassigned"}
                                            onSelectChange={handleAssigneeChange}
                        />
                    </TaskList>
                </CardInfoBox>
                <CardInfoBox>
                    <CardInfoBoxTitle>
                        <FiUser/>
                        Reporter
                    </CardInfoBoxTitle>
                    <TaskList>
                        <UserSelectField defaultValue={props.card?.reporter?.username} users={Useroptions}
                                            isMultiple={false}
                                            placeholder={"Unassigned"}
                                            onSelectChange={handleReporterChange}
                        />
                    </TaskList>
                </CardInfoBox>

                <CardInfoBox>
                    <CardInfoBoxTitle>
                        <CgOptions/>
                        Priority
                    </CardInfoBoxTitle>
                    <TaskList>
                        <GenericSelectField options={Priorityoptions} defaultValue={props.card?.priority}
                                            isMultiple={false} placeholder={"Unassigned"}
                                            onSelectChange={handlePriorityChange}
                        />
                    </TaskList>
                </CardInfoBox>

                <CardInfoBox>
                    <CardInfoBoxTitle>
                        <RxStopwatch/>
                        Time Tracking
                    </CardInfoBoxTitle>
                    <div>
                        <TrackingField OriginalEstimate={props.card?.estimate}/>
                    </div>
                </CardInfoBox>
            </div>
        </Modal>
    )
}

export default CardInfo