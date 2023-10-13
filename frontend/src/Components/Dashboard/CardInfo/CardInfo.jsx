import React, {useEffect, useRef, useState} from "react";
import {NavLink, useParams} from 'react-router-dom';
import Modal from "../Modal/Modal";
import FileUpload from "../FileAttachement/FileUpload";
import {CheckSquare, File, List, Trash} from "react-feather";
import Editable from "../Editable/Editable";
import Description from "../TextEditor/TextEditor"
import Comment from "../Comment/Comment"
import Worklog from "../Worklog/Worklog";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import GenericSelectField from '../SelectFields/GenericSelectField'
import TrackingField from '../TimeTracking/index'
import {AiOutlineClose} from 'react-icons/ai'
import {priorityOptions} from '../../../Shared/Const/Issues'
import {TbStatusChange, TbExchange} from 'react-icons/tb'
import {FiUser} from 'react-icons/fi'
import {CgOptions} from 'react-icons/cg'
import {RxStopwatch} from 'react-icons/rx'
import {TiTags} from "react-icons/ti";
import {IoIosTimer} from 'react-icons/io'
import * as CardInfoComponents from "./Style"
import EstimateTimer from "../EstimateTimer/EstimateTimer";
import tagRender from "../../../Shared/Components/tagRender";
import {modules} from '../../../Shared/Const/ReactQuillToolbarOptions'
import {Avatar, Select, Tooltip} from "antd";
import {LinkOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {
    fetchSelectedProjectAssignees, fetchSelectedProjectLabels, fetchSelectedProjectStatuses,
    fetchSelectedProjectTypes,
    getIssue,
    updateIssue
} from "../../../Store/Slice/issue/issueActions";
import {useCurrentUserProfileData} from "../../../Store/Selector/Selector";
import {displayErrorMessage, displaySuccessMessage} from "../../../Shared/notify";
import {
    createComment,
    deleteComment,
    fetchIssueComments,
    updateComment
} from "../../../Store/Slice/comment/commentAction";
import {fetchIssueWorkLogs} from "../../../Store/Slice/worklog/worklogActions";
import {REACT_APP_DOMAIN} from "../../../Utils/envConstants";

function CardInfo(props) {
    const dispatch = useDispatch();

    const currentUserDatafromStore = useCurrentUserProfileData();

    const {projectId} = useParams()

    const [isHovered, setIsHovered] = useState(false);
    const [showQuill, setShowQuill] = useState(false);
    const [tooltipMessage, setTooltipMessage] = useState('');

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
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

    const {Option} = Select;

    const handleCopyToClipboard = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl);
        setTooltipMessage('Copied!');
        setTimeout(() => setTooltipMessage('Copy to clipboard'), 1500);
    };

    const handleLabelChange = (values) => {
        const labelKeys = values.map((value) => {
            return parseInt(value.key, 10);
        });
        setSelectedLabels(labelKeys);
    };

    const getComments = () => {
        dispatch(fetchIssueComments({issueId: props.card?.id})).unwrap().then((response) => {
            setComments(response.data);
        }).catch(
            error => {
                displayErrorMessage(error);
            }
        );
    };

    const getWorklogs = () => {
        dispatch(fetchIssueWorkLogs({issueId: props.card?.id})).unwrap().then((response) => {
            setWorklogs(response.data);
        }).catch(
            error => {
                displayErrorMessage(error);
            }
        );
    };

    useEffect(() => {
        setCurrentUserData(currentUserDatafromStore?.user);
        setCurrentUserEmail(currentUserDatafromStore?.user?.email);
    }, [currentUserDatafromStore]);

    useEffect(() => {

        dispatch(getIssue({issueId: props.card?.id})).unwrap().then((response) => {
            setIssuesData(response.data);
        }).catch(
            error => {
                displayErrorMessage(error);
            }
        );

        dispatch(fetchIssueComments({issueId: props.card?.id})).unwrap().then((response) => {
            setComments(response.data);
        }).catch(
            error => {
                displayErrorMessage(error);
            }
        );

        dispatch(fetchIssueWorkLogs({issueId: props.card?.id})).unwrap().then((response) => {
            setWorklogs(response.data);
        }).catch(
            error => {
                displayErrorMessage(error);
            }
        );

        dispatch(fetchSelectedProjectAssignees({selectedProject: props.card.project})).unwrap().then((response) => {
            setUsers(response.data);
        }).catch(
            error => {
                displayErrorMessage(error);
            }
        );

        dispatch(fetchSelectedProjectTypes({selectedProject: props.card.project})).unwrap().then((response) => {
            setIssueType(response.data);
        }).catch(
            error => {
                displayErrorMessage(error);
            }
        );

        dispatch(fetchSelectedProjectStatuses({selectedProject: props.card.project})).unwrap().then((response) => {
            setIssueStatus(response.data);
        }).catch(
            error => {
                displayErrorMessage(error);
            }
        );

        dispatch(fetchSelectedProjectLabels({selectedProject: props.card.project})).unwrap().then((response) => {
            setIssueLabels(response.data);
        }).catch(
            error => {
                displayErrorMessage(error);
            }
        );

    }, [props.card.id, props.card.project]);
    console.log("currentUserEmail:", currentUserEmail)
    console.log("selectedLabels:", selectedLabels)

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

    const selectedLabelsOptions = selectedLabels.map((label) => ({
        label: label.label,
        value: label.value,
        color: label.color,
    }));


    const DefaultIssueLabel = props.card?.labels
        ? props.card?.labels.map((IssueType) => ({
            key: IssueType.id,
            label: IssueType.name,
            value: IssueType.color,
        }))
        : [];

    console.log("selectedLabelsOptions:", selectedLabelsOptions)

    const handleCommentSubmit = (event) => {
        event.preventDefault();

        const commentData = {
            body: newComment,
            issue: props.card?.id,
            user: currentUserData?.id,
        };
        dispatch(createComment({formData: commentData})).unwrap()
            .then((response) => {
                console.log(response.data);
                setComments([...comments, response.data]);
                getComments();
                setNewComment("");
                setShowQuill(false);
            })
            .catch((error) => {
                displayErrorMessage(error);
                console.log(error);
            });
    };


    const handleNewCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleQuillChange = (value) => {
        setNewComment(value);
    };


    const handleCommentDelete = (index) => {
        dispatch(deleteComment({commentId: index})).unwrap()
            .then((response) => {
                setComments((prevComments) =>
                    prevComments.filter((_, i) => i !== index)
                );
                getComments();
            })
            .catch((error) => {
                displayErrorMessage(error);
                console.log(error);
            });
    };

    const handleCommentEdit = (index, comment) => {

        const commentData = {
            body: comment,
            issue: props.card?.id,
            updated_by: currentUserData?.id,
        };
        dispatch(updateComment({commentId: index, formData: commentData})).unwrap()
            .then((response) => {
                console.log(response.data);
                const updatedComments = [...comments];
                updatedComments[index] = response.data?.body; // Replace the comment at the specified index
                setComments(
                    comments.map((c, i) => (i === index ? comment : c))
                );
                getComments();
            })
            .catch((error) => {
                displayErrorMessage(error);
                console.log(error);
            });
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
    const prefix = REACT_APP_DOMAIN;
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

        dispatch(updateIssue({formData: formData, issueId: props.card.id})).unwrap()
            .then(response => {
                props.onClose();
                console.log(response.data);
                displaySuccessMessage(values.title + " Updated Successfully");
            })
            .catch(error => {
                props.onClose();
                displayErrorMessage(error);
                console.log(error);
            });

    }


    return (
        <Modal onClose={() => handleCloseModalSubmit()}>
            <div style={{width: "55%"}}>
                <div className="modal-header">
                    <CardInfoComponents.StyledSlug>
                        <NavLink to={`/project/${projectId}/browse/issue/${props.card?.id}`} target="_blank">
                            <b>{props.card?.slug.toUpperCase()}</b>
                        </NavLink>
                        <Tooltip title={tooltipMessage} arrow={false}>
                            <LinkOutlined
                                style={{marginLeft: 12, cursor: 'pointer'}}
                                onMouseEnter={() => setTooltipMessage('Copy to clipboard')}
                                onMouseLeave={() => setTooltipMessage('')}
                                onClick={handleCopyToClipboard}
                            />
                        </Tooltip>
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
                                }}>
                                    Work log
                                </CardInfoComponents.ActivityButton>
                            </div>
                        </CardInfoComponents.CardInfoBoxCustom>
                        {showComments && (
                            <CardInfoComponents.CardInfoBoxCustom>
                                <CardInfoComponents.CardInfoBoxTitle>Comments</CardInfoComponents.CardInfoBoxTitle>
                                <CardInfoComponents.FormContainer onSubmit={handleCommentSubmit}>
                                    {showQuill ? (
                                        <>
                                            <CardInfoComponents.StyledQuillWrapper>
                                                <ReactQuill modules={modules} value={newComment}
                                                            onChange={handleQuillChange}
                                                            style={{width: "555px"}}/>
                                            </CardInfoComponents.StyledQuillWrapper>
                                            <div style={{flex: 1}}>
                                                <CardInfoComponents.CommentButton
                                                    showQuill={showQuill}
                                                    type="submit">
                                                    Send
                                                </CardInfoComponents.CommentButton>
                                                <CardInfoComponents.CommentButton
                                                    color="#000"
                                                    backgroundColor="#ECEDF0"
                                                    onClick={() => setShowQuill(false)}
                                                >
                                                    Cancel
                                                </CardInfoComponents.CommentButton>
                                            </div>
                                        </>
                                    ) : (
                                        <CardInfoComponents.CommentInput
                                            type="text"
                                            placeholder="Leave a comment"
                                            onClick={() => setShowQuill(true)}
                                            onChange={handleNewCommentChange}
                                        />
                                    )}
                                </CardInfoComponents.FormContainer>
                                <ul>
                                    {
                                        comments
                                            .slice()
                                            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                            .map((comment, index) => (
                                                <Comment
                                                    key={index}
                                                    comment={comment?.body}
                                                    created_at={comment?.created_at}
                                                    updated_at={comment?.updated_at}
                                                    index={comment?.id}
                                                    created_by={comment?.user}
                                                    updated_by={comment?.updated_by}
                                                    commentUserId={comment?.user?.id}
                                                    currentUser={currentUserData}
                                                    onDelete={handleCommentDelete}
                                                    onEdit={handleCommentEdit}
                                                />
                                            ))
                                    }
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
                                            updated_at={worklog?.updated_at}
                                            worklogDate={worklog.date}
                                            worklogTime={worklog.time}
                                            created_by={worklog?.user}
                                            updated_by={worklog?.updated_by}
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
                        <Select
                            showArrow
                            filterOption
                            onChange={(value) => setSelectedAssignee(parseInt(value))}
                            showSearch
                            optionFilterProp="label"
                            placeholder="Please select User"
                            optionLabelProp="label"
                            value={selectedAssignee}
                            style={{width: "100%"}}
                        >
                            {Useroptions.map((item) => (
                                <Option key={item.id} value={item.id} label={item.username}>
                                    {
                                        item.iconUrl ?
                                            <div>
                                                <Avatar draggable={true} style={{background: "#10899e"}}
                                                        alt={item.username}
                                                        src={`${REACT_APP_DOMAIN}${item.iconUrl}`}/>{" "}
                                                {item.username}
                                            </div> :
                                            <div>
                                                <Avatar> {item.username}</Avatar> {" "}{item.username}
                                            </div>
                                    }
                                </Option>
                            ))}
                        </Select>
                    </CardInfoComponents.TaskList>
                </CardInfoComponents.CardInfoBox>
                <CardInfoComponents.CardInfoBox>
                    <CardInfoComponents.CardInfoBoxTitle>
                        <FiUser/>
                        Reporter
                    </CardInfoComponents.CardInfoBoxTitle>
                    <CardInfoComponents.TaskList>
                        <Select
                            showArrow
                            filterOption
                            onChange={(value) => setSelectedReporter(parseInt(value))}
                            showSearch
                            optionFilterProp="label"
                            placeholder="Please select User"
                            optionLabelProp="label"
                            value={selectedReporter}
                            style={{width: "100%"}}
                        >
                            {Useroptions.map((item) => (
                                <Option key={item.id} value={item.id} label={item.username}>
                                    {
                                        item.iconUrl ?
                                            <div>
                                                <Avatar draggable={true} style={{background: "#10899e"}}
                                                        alt={item.username}
                                                        src={`${REACT_APP_DOMAIN}${item.iconUrl}`}/>{" "}
                                                {item.username}
                                            </div> :
                                            <div>
                                                <Avatar> {item.username}</Avatar> {" "}{item.username}
                                            </div>
                                    }
                                </Option>
                            ))}
                        </Select>
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
                    <CardInfoComponents.TaskList>
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
                            onChange={(value, key) => {
                                handleLabelChange(key)
                            }}
                            placeholder="Select Labels"
                        />
                    </CardInfoComponents.TaskList>
                </CardInfoComponents.CardInfoBox>
                <CardInfoComponents.CardInfoBox>
                    <CardInfoComponents.CardInfoBoxTitle>
                        <IoIosTimer/>
                        Original Estimate
                    </CardInfoComponents.CardInfoBoxTitle>
                    <CardInfoComponents.TaskList>
                        <EstimateTimer defaultValue={props.card?.estimate}
                                       onHoursChange={(value) => setEstimateHours(value)}/>
                    </CardInfoComponents.TaskList>
                </CardInfoComponents.CardInfoBox>
                <CardInfoComponents.CardInfoBox>
                    <CardInfoComponents.CardInfoBoxTitle>
                        <RxStopwatch/>
                        Time Tracking
                    </CardInfoComponents.CardInfoBoxTitle>
                    <div>
                        <TrackingField onCreate={() => getWorklogs()}
                                       OriginalEstimate={props.card?.estimate}/>
                    </div>
                </CardInfoComponents.CardInfoBox>


            </div>
        </Modal>
    )
}

export default CardInfo