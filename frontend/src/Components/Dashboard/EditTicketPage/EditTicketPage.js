import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import NavBar from "../../Dashboard/Navbar";
import Sidebar from "../../Dashboard/Sidebar/ProjectSidebar";
import FileUpload from "../FileAttachement/FileUpload";
import {Avatar, Breadcrumb, Input, Select, Tooltip} from "antd";
import TrackingField from "../TimeTracking";
import Editable from "../Editable/Editable";
import Comment from "../Comment/Comment";
import Worklog from "../Worklog/Worklog";
import {useDispatch} from "react-redux";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import * as EditTicketPageComponents from "./Style"
import GenericSelectField from "../SelectFields/GenericSelectField";
import {priorityOptions} from '../../../Shared/Const/Issues'
import tagRender from '../../../Shared/Components/tagRender'
import {TbExchange, TbStatusChange} from 'react-icons/tb'
import {FiUser} from 'react-icons/fi'
import {IoIosTimer} from 'react-icons/io'
import {TiTags} from "react-icons/ti";
import {RxStopwatch} from 'react-icons/rx'
import {CgOptions} from 'react-icons/cg'
import Loader from '../../../Utils/Loader'
import EstimateTimer from "../EstimateTimer/EstimateTimer";
import * as CardInfoComponents from "../CardInfo/Style";
import {modules} from "../../../Shared/Const/ReactQuillToolbarOptions";
import {LinkOutlined} from '@ant-design/icons';
import {useCurrentUserProfileData} from "../../../Store/Selector/Selector";
import {
    createComment,
    deleteComment,
    fetchIssueComments,
    updateComment
} from "../../../Store/Slice/comment/commentAction";
import {displayErrorMessage, displaySuccessMessage} from "../../../Shared/notify";
import {fetchIssueWorkLogs} from "../../../Store/Slice/worklog/worklogActions";
import {
    fetchSelectedProjectAssignees, fetchSelectedProjectLabels, fetchSelectedProjectStatuses,
    fetchSelectedProjectTypes,
    getIssue,
    updateIssue
} from "../../../Store/Slice/issue/issueActions";
import {getProject} from "../../../Store/Slice/project/projectActions";

const {TextArea} = Input;


function EditTicketPage({props}) {
    const dispatch = useDispatch()
    const currentUserDatafromStore = useCurrentUserProfileData();

    const [showQuill, setShowQuill] = useState(false);
    const [tooltipMessage, setTooltipMessage] = useState('');

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(true);
    const [worklogs, setWorklogs] = useState([]);
    const [showWorklog, setShowWorklog] = useState(false);
    const [selectedWorklog, setSelectedWorklog] = useState(null);

    const [IssueName, setIssueName] = useState('');
    const [IssueDesc, setIssueDesc] = useState('');
    const [IssueSummary, setIssueSummary] = useState('');

    const [selectedAssignee, setSelectedAssignee] = useState('');
    const [selectedReporter, setSelectedReporter] = useState('');
    const [selectedIssueType, setSelectedIssueType] = useState('');
    const [selectedPriority, setSelectedPriority] = useState('');
    const [selectedIssueStatus, setSelectedIssueStatus] = useState('');
    const [estimateHours, setEstimateHours] = useState("");

    const [selectedLabel, setSelectedLabel] = useState([]);

    const [currentIssueProjectData, setCurrentIssueProjectData] = useState('');

    const [IssueType, setIssueType] = useState('');
    const [IssueStatus, setIssueStatus] = useState('');
    const [IssueLabels, setIssueLabels] = useState('');

    const [loading, setLoading] = useState(true);

    const [Users, setUsers] = useState('');
    const [currentUserData, setCurrentUserData] = useState({});
    const [currentUserEmail, setCurrentUserEmail] = useState({});
    const [currentIssueData, setCurrentIssueData] = useState({});

    const [files, setFiles] = useState([]);
    const {Option} = Select;
    const {issueId, projectId} = useParams()

    const getComments = () => {
        dispatch(fetchIssueComments({issueId: issueId})).unwrap().then((response) => {
            setComments(response.data)
        }).catch(
            error => {
                displayErrorMessage(error);
            }
        );
    };

    const getWorklogs = () => {
        dispatch(fetchIssueWorkLogs({issueId: issueId})).unwrap().then((response) => {
            setWorklogs(response.data)
        }).catch(
            error => {
                displayErrorMessage(error);
            }
        );
    };

    const handleLabelChange = (values) => {
        const labelKeys = values.map((value) => {
            return parseInt(value.key, 10);
        });
        setSelectedLabel(labelKeys);
    };

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
    useEffect(() => {
        setCurrentUserData(currentUserDatafromStore?.user);
        setCurrentUserEmail(currentUserDatafromStore?.user?.email);
    }, [currentUserDatafromStore]);


    useEffect(() => {
        dispatch(getIssue({issueId: issueId})).unwrap().then((response) => {
            setCurrentIssueData(response.data);
        }).catch(
            error => {
                displayErrorMessage(error);
            }
        );

        dispatch(fetchIssueComments({issueId: issueId})).unwrap().then((response) => {
            setComments(response.data);
        }).catch(
            error => {
                displayErrorMessage(error);
            }
        );

        dispatch(fetchIssueWorkLogs({issueId: issueId})).unwrap().then((response) => {
            setWorklogs(response.data);
        }).catch(
            error => {
                displayErrorMessage(error);
            }
        );

        dispatch(fetchSelectedProjectAssignees({selectedProject: projectId})).unwrap().then((response) => {
            setUsers(response.data);
        }).catch(
            error => {
                displayErrorMessage(error);
            }
        );

        dispatch(fetchSelectedProjectTypes({selectedProject: projectId})).unwrap().then((response) => {
            setIssueType(response.data);
        }).catch(
            error => {
                displayErrorMessage(error);
            }
        );

        dispatch(fetchSelectedProjectStatuses({selectedProject: projectId})).unwrap().then((response) => {
            setIssueStatus(response.data);
        }).catch(
            error => {
                displayErrorMessage(error);
            }
        );

        dispatch(fetchSelectedProjectLabels({selectedProject: projectId})).unwrap().then((response) => {
            setIssueLabels(response.data);
        }).catch(
            error => {
                displayErrorMessage(error);
            }
        );

        dispatch(getProject({projectId: projectId})).unwrap().then((response) => {
            setCurrentIssueProjectData(response.data);
            setLoading(false);
        }).catch(
            error => {
                displayErrorMessage(error);
            }
        );

    }, []);


    useEffect(() => {
        if (currentIssueData?.id) {
            setIssueName(currentIssueData?.name)
            setIssueDesc(currentIssueData?.description)
            setIssueSummary(currentIssueData?.summary)
            setFiles(currentIssueData?.file)
            setSelectedAssignee(currentIssueData?.assignee?.id)
            setSelectedReporter(currentIssueData?.reporter?.id)
            setSelectedIssueType(currentIssueData?.type?.id)
            setSelectedIssueStatus(currentIssueData?.status?.id)
            setSelectedLabel(currentIssueData?.label?.map(label => label.id) || []);
            setEstimateHours(currentIssueData?.estimate)
        }
    }, [currentIssueData])

    const combinedArray = files.map((file) => `${process.env.REACT_APP_DOMAIN}${file}`);

    console.log("combinedArray:", combinedArray)

    const userOptions = Users
        ? Users.map((Users) => ({
            username: Users.username,
            id: Users.id,
            iconUrl: Users.userprofile?.image,
        }))
        : [];

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

    const IssueLabelOptions = IssueLabels
        ? IssueLabels.map((IssueType) => ({
            key: IssueType.id,
            label: IssueType.name,
            value: IssueType.color,
        }))
        : [];

    const DefaultIssueLabel = currentIssueData?.label
        ? currentIssueData.label.map((IssueType) => ({
            key: IssueType.id,
            label: IssueType.name,
            value: IssueType.color,
        }))
        : [];

    const handleFormSubmit = () => {

        const formData = new FormData();

        formData.append("assignee", selectedAssignee);
        formData.append("reporter", selectedReporter);
        formData.append("estimate", estimateHours);
        selectedLabel.forEach((label) => {
            formData.append("label", label);
        });
        formData.append("type", selectedIssueType);
        formData.append("status", selectedIssueStatus);
        formData.append("priority", selectedPriority);
        formData.append("summary", IssueSummary);
        formData.append("description", IssueDesc);
        formData.append("name", IssueName);
        files.forEach((file) => {
            formData.append("file", file);
        });

        dispatch(updateIssue({formData: formData, issueId: issueId})).unwrap()
            .then(response => {
                console.log(response.data);
                window.location.href = window.location.href
                displaySuccessMessage(IssueName + " Updated Successfully");
            })
            .catch(error => {
                props.onClose();
                displayErrorMessage(error);
                console.log(error);
            });

    }


    const handleNewCommentChange = (value) => {
        setNewComment(value);
    };


    const handleCommentSubmit = (event) => {
        event.preventDefault();

        const commentData = {
            body: newComment,
            issue: issueId,
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

    const handleCopyToClipboard = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl);
        setTooltipMessage('Copied!');
        setTimeout(() => setTooltipMessage('Copy to clipboard'), 1500);
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
            issue: issueId,
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

    const BreadcrumbitemsStyles = {cursor: 'pointer', fontWeight: "500"}

    if (loading) {
        return (
            <div>
                <NavBar/>
                <Sidebar/>
                <Loader/>
            </div>
        );
    }

    const projectIcon = currentIssueProjectData?.icon ? (
        <Avatar
            draggable={true}
            shape={"square"}
            style={{
                width: "20px",
                height: "20px",
                marginRight: "8px",
                verticalAlign: "middle",
                cursor: "pointer"
            }}
            alt={currentIssueProjectData?.name}
            src={`${process.env.REACT_APP_DOMAIN}${currentIssueProjectData?.icon}`}
        />
    ) : (
        <Avatar
            style={{
                width: "25px",
                height: "25px",
                marginRight: "8px",
                verticalAlign: "middle",
                cursor: "pointer"
            }}>
            {currentIssueProjectData?.name}
        </Avatar>
    );


    return (
        <div>
            <NavBar/>
            <Sidebar/>
            <EditTicketPageComponents.FormWrapper>
                <EditTicketPageComponents.Container>
                    <EditTicketPageComponents.LeftSide>
                        <Breadcrumb style={{
                            marginBottom: "10px",
                            marginTop: "5px"
                        }}
                                    items={[
                                        {
                                            title: <Link style={BreadcrumbitemsStyles}
                                                         to="/project">Projects</Link>
                                        },
                                        {
                                            title: (
                                                <>
                                                    {projectIcon}
                                                    <Link style={BreadcrumbitemsStyles}
                                                          to={`/project/${projectId}/dashboard`}>
                                                        {currentIssueProjectData?.name}
                                                    </Link>
                                                </>
                                            ),
                                        },
                                        {
                                            title:
                                                (
                                                    <>
                                                        <Link
                                                            style={BreadcrumbitemsStyles}
                                                            to={`/project/${projectId}/browse/issue/${currentIssueData?.id}`}
                                                            target="_blank">
                                                            {currentIssueData?.slug.toUpperCase()}
                                                        </Link>
                                                        <Tooltip title={tooltipMessage} arrow={false}>
                                                            <LinkOutlined
                                                                style={{marginLeft: 8, cursor: 'pointer'}}
                                                                onMouseEnter={() => setTooltipMessage('Copy to clipboard')}
                                                                onMouseLeave={() => setTooltipMessage('')}
                                                                onClick={handleCopyToClipboard}
                                                            />
                                                        </Tooltip>
                                                    </>
                                                ),
                                        },
                                    ]}/>
                        <EditTicketPageComponents.IssueTitle>
                            <Editable
                                text={IssueName}
                                placeholder={IssueName}
                                buttonText="Save Issue Name"
                                fontWeight={"bold"}
                                hoverBackgroundColor={"#EBECF0"}
                                onSubmit={(value) => setIssueName(value)}
                            />
                        </EditTicketPageComponents.IssueTitle>
                        <EditTicketPageComponents.Title>Summary</EditTicketPageComponents.Title>
                        <TextArea rows={2} value={IssueSummary}
                                  onChange={(event) => setIssueSummary(event.target.value)}/>
                        <EditTicketPageComponents.Title>Description</EditTicketPageComponents.Title>
                        <div style={{marginBottom: "15px"}}>
                            <ReactQuill
                                modules={modules}
                                value={IssueDesc} onChange={(value) => setIssueDesc(value)}/>
                        </div>
                        <EditTicketPageComponents.Title>File Attachments</EditTicketPageComponents.Title>
                        <EditTicketPageComponents.FileAttachmentsContent>
                            <FileUpload onFilesChange={(value) => setFiles(value)} fileAttachmentArray={combinedArray}
                                        width="670px"/>
                        </EditTicketPageComponents.FileAttachmentsContent>

                        <EditTicketPageComponents.CardInfoBox style={{marginTop: '15px'}}>
                            <>
                                <EditTicketPageComponents.CardInfoBoxCustom>
                                    <EditTicketPageComponents.Title>Activity</EditTicketPageComponents.Title>
                                    <div style={{display: 'flex', gap: '8px', borderRadius: '4px'}}>
                                        <EditTicketPageComponents.ActivityButton active={showComments} onClick={() => {
                                            setShowComments(true);
                                            setShowWorklog(false);
                                            setSelectedWorklog(null);
                                        }}>
                                            Comments
                                        </EditTicketPageComponents.ActivityButton>
                                        <EditTicketPageComponents.ActivityButton active={showWorklog} onClick={() => {
                                            setShowWorklog(true);
                                            setShowComments(false);
                                        }}>
                                            Work log
                                        </EditTicketPageComponents.ActivityButton>
                                    </div>
                                </EditTicketPageComponents.CardInfoBoxCustom>
                                {showComments && (
                                    <EditTicketPageComponents.CardInfoBoxCustom>
                                        <EditTicketPageComponents.Title>Comments</EditTicketPageComponents.Title>
                                        <CardInfoComponents.FormContainer onSubmit={handleCommentSubmit}>
                                            {showQuill ? (
                                                <>
                                                    <CardInfoComponents.StyledQuillWrapper>
                                                        <ReactQuill modules={modules} value={newComment}
                                                                    onChange={handleNewCommentChange}
                                                        />
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
                                                <Input
                                                    placeholder="Leave a comment"
                                                    onClick={() => setShowQuill(true)}
                                                />
                                            )}
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
                                                />
                                            ))}
                                        </ul>
                                    </EditTicketPageComponents.CardInfoBoxCustom>
                                )}
                                {showWorklog && (
                                    <EditTicketPageComponents.CardInfoBoxCustom>
                                        <EditTicketPageComponents.Title>Worklog</EditTicketPageComponents.Title>
                                        <ul style={{marginTop: "-30px"}}>
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
                                                    onDelete={handleWorklogDelete}
                                                    onEdit={handleWorklogEdit}
                                                    selectedWorklog={selectedWorklog}
                                                />
                                            ))}
                                        </ul>
                                    </EditTicketPageComponents.CardInfoBoxCustom>
                                )}
                            </>
                        </EditTicketPageComponents.CardInfoBox>

                    </EditTicketPageComponents.LeftSide>
                    <EditTicketPageComponents.RightSide>
                        <EditTicketPageComponents.StyledCollapse defaultActiveKey={['1']}>
                            <EditTicketPageComponents.StyledPanel header="Details" key="1">
                                <EditTicketPageComponents.RightSideContent>

                                    <EditTicketPageComponents.ContentInfoTitle>
                                        <FiUser/>
                                        <span>Assignee</span>
                                    </EditTicketPageComponents.ContentInfoTitle>
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
                                                            <Avatar> {item.username}</Avatar> {" "}{item.username}
                                                        </div>
                                                }
                                            </Option>
                                        ))}
                                    </Select>
                                    <EditTicketPageComponents.ContentInfoTitle>
                                        <TbStatusChange/>
                                        <span>Status</span>
                                    </EditTicketPageComponents.ContentInfoTitle>
                                    <GenericSelectField
                                        options={statusOptions}
                                        isMultiple={false}
                                        placeholder={"Unassigned"}
                                        defaultValue={currentIssueData?.status?.status}
                                        onSelectChange={(value) => setSelectedIssueStatus(parseInt(value))}
                                    />

                                    <EditTicketPageComponents.ContentInfoTitle>
                                        <TbExchange/>
                                        <span>Type</span>
                                    </EditTicketPageComponents.ContentInfoTitle>
                                    <GenericSelectField
                                        options={IssueTypeoptions}
                                        isMultiple={false}
                                        placeholder={"Unassigned"}
                                        defaultValue={currentIssueData?.type.type}
                                        onSelectChange={(value) => setSelectedIssueType(parseInt(value))}
                                    />

                                    <EditTicketPageComponents.ContentInfoTitle>
                                        <TiTags/>
                                        <span>Labels</span>
                                    </EditTicketPageComponents.ContentInfoTitle>
                                    <Select
                                        mode="multiple"
                                        showArrow
                                        tagRender={tagRender}
                                        defaultValue={DefaultIssueLabel}
                                        style={{width: '100%',}}
                                        options={IssueLabelOptions}
                                        optionFilterProp="label"
                                        onChange={(value, key) => {
                                            handleLabelChange(key)
                                        }}
                                    />

                                    <EditTicketPageComponents.ContentInfoTitle>
                                        <IoIosTimer/>
                                        <span>Original Estimate</span>
                                    </EditTicketPageComponents.ContentInfoTitle>
                                    <EstimateTimer defaultValue={currentIssueData?.estimate}
                                                   onHoursChange={(value) => setEstimateHours(value)}/>

                                    <EditTicketPageComponents.ContentInfoTitle>
                                        <RxStopwatch/>
                                        <span>Time Tracking</span>
                                    </EditTicketPageComponents.ContentInfoTitle>
                                    <TrackingField onCreate={() => getWorklogs()}
                                                   OriginalEstimate={currentIssueData?.estimate}/>

                                    <EditTicketPageComponents.ContentInfoTitle>
                                        <CgOptions/>
                                        <span>Priority</span>
                                    </EditTicketPageComponents.ContentInfoTitle>
                                    <GenericSelectField
                                        options={priorityOptions}
                                        isMultiple={false}
                                        placeholder={"Unassigned"}
                                        defaultValue={currentIssueData?.priority}
                                        onSelectChange={(value) => setSelectedPriority(value)}
                                    />

                                    <EditTicketPageComponents.ContentInfoTitle>
                                        <FiUser/>
                                        <span>Reporter</span>
                                    </EditTicketPageComponents.ContentInfoTitle>
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
                                                            <Avatar> {item.username}</Avatar> {" "}{item.username}
                                                        </div>
                                                }
                                            </Option>
                                        ))}
                                    </Select>
                                </EditTicketPageComponents.RightSideContent>
                            </EditTicketPageComponents.StyledPanel>
                        </EditTicketPageComponents.StyledCollapse>
                        <EditTicketPageComponents.SaveButton onClick={handleFormSubmit}>Save
                            Changes</EditTicketPageComponents.SaveButton>
                    </EditTicketPageComponents.RightSide>
                </EditTicketPageComponents.Container>
            </EditTicketPageComponents.FormWrapper>
        </div>
    );
}


export default EditTicketPage;
