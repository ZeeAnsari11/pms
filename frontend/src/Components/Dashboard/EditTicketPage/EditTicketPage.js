import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import NavBar from "../../Dashboard/Navbar";
import Sidebar from "../../Dashboard/Sidebar/ProjectSidebar";
import FileUpload from "../FileAttachement/FileUpload";
import axios from "axios";
import { Breadcrumb, Input, Select } from "antd";
import UserSelectField from "../SelectFields/UserSelectField";
import TrackingField from "../TimeTracking";
import Editable from "../Editable/Editable";
import Comment from "../Comment/Comment";
import Worklog from "../Worklog/Worklog";
import ReactQuill from "react-quill";
import * as EditTicketPageComponents from "./Style"
import GenericSelectField from "../SelectFields/GenericSelectField";
import {priorityOptions} from '../../../Shared/Const/Issues'
import tagRender from '../../../Shared/Components/tagRender'
import { TbExchange, TbStatusChange } from 'react-icons/tb'
import { FiUser } from 'react-icons/fi'
import { TiTags } from "react-icons/ti";
import { RxStopwatch } from 'react-icons/rx'
import { CgOptions } from 'react-icons/cg'
import Loader from '../../../Utils/Loader'
import apiRequest from "../../../Utils/apiRequest";
import { value } from "lodash/seq";

const {TextArea} = Input;


function EditTicketPage({props}) {
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


    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [selectedComment, setSelectedComment] = useState(null);
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

    const [selectedLabel, setSelectedLabel] = useState([]);

    const [currentIssueProjectData, setCurrentIssueProjectData] = useState('');

    const [IssueType, setIssueType] = useState('');
    const [IssueStatus, setIssueStatus] = useState('');
    const [IssueLabels, setIssueLabels] = useState('');

    const [loading, setLoading] = useState(true);

    const [Users, setUsers] = useState('');
    const [currentUserData, setCurrentUserData] = useState({});
    const [currentUserEmail, setCurrentUserEmail] = useState({});

    const [files, setFiles] = useState([]);
    const [currentIssueData, setCurrentIssueData] = useState([]);

    useEffect(() => {
        setLoading(true);
        const fetchCurrentIssueData = async () => {
            try {
                const response = await apiRequest.get(`/api/issues/${issueId}`, {
                headers: { 'Authorization': `Token ${authToken}` },
            });
                setCurrentIssueData(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchCurrentIssueData();
    }, []);

    const getComments = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/comments/?issue=${issueId}`, {
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
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/worklogs/?issue=${issueId}`, {
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

    const handleLabelChange = (values) => {
        const labelKeys = values.map((value) => {
                return parseInt( value.key, 10 );
            });
        setSelectedLabel(labelKeys);
    };

    const {issueId, projectId} = useParams()

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
        const fetchComments = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/comments/?issue=${issueId}`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setComments(response.data);
        };

        const fetchWorklogs = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/worklogs/?issue=${issueId}`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setWorklogs(response.data);
        };

        const fetchDependentUserOptions = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/projects/${projectId}/assignees/`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setUsers(response.data);
        };
        const fetchDependentProjectTypes = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/project_type/?project=${projectId}`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setIssueType(response.data);
        };

        const fetchCurrentIssueProjectData = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/projects/${projectId}`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setCurrentIssueProjectData(response.data);
        };

        const fetchDependentProjectStatuses = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/project_status/?project=${projectId}`, {
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

        fetchDependentUserOptions();
        fetchDependentProjectLabels();
        fetchDependentProjectStatuses();
        fetchDependentProjectTypes();
        fetchCurrentIssueProjectData();
        fetchComments();
        fetchWorklogs();

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
        }
    }, [currentIssueData])


    const fileArray = files
    const prefix = "http://localhost:8000";
    const combinedArray = fileArray.map((file) => `${prefix}${file}`);

    console.log("combinedArray:", combinedArray)

    const Useroptions = Users
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


        axios({
            method: 'patch',
            url: `${process.env.REACT_APP_HOST}/api/issues/${issueId}/`,
            headers: {
                'Authorization': `Token ${authToken}`,
            },
            data: formData
        })
            .then(response => {
                // handle the response
                console.log(response.data);
                window.location.href = window.location.href
            })
            .catch(error => {
                // handle the error
                console.log(error);
            });

    }


    const handleNewCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();

        const commentData = {
            body: newComment,
            issue: issueId,
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
                setNewComment("");
                getComments();
            })
            .catch((error) => {
                // Handle error
                console.log(error);
            });
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
                issue: issueId,
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

    const BreadcrumbitemsStyles = {cursor: 'pointer', fontWeight: "500"}

    if(loading){
        return (
            <div>
                <NavBar/>
                <Sidebar/>
                <Loader/>
            </div>
        );
    }

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
                                                    <Link style={BreadcrumbitemsStyles}
                                                            to={`/project/${projectId}/dashboard`}>
                                                        {currentIssueProjectData?.name}
                                                    </Link>
                                                </>
                                            ),
                                        },
                                        {
                                            title:
                                                <Link
                                                    style={BreadcrumbitemsStyles}
                                                    to={`/project/${projectId}/browse/issue/${currentIssueData?.id}`}
                                                    target="_blank">
                                                    {currentIssueData?.slug.toUpperCase()}
                                                </Link>
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
                        <EditTicketPageComponents.Title>
                            Summary
                        </EditTicketPageComponents.Title>
                        <TextArea rows={2} value={IssueSummary}
                                    onChange={(event) => setIssueSummary(event.target.value)}/>
                        <EditTicketPageComponents.Title>
                            Description
                        </EditTicketPageComponents.Title>
                        <div style={{marginBottom: "15px"}}>
                            <ReactQuill value={IssueDesc} onChange={(value) => setIssueDesc(value)}/>
                        </div>
                        <EditTicketPageComponents.Title>
                            File Attachments
                        </EditTicketPageComponents.Title>
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
                                            setSelectedComment(null);
                                        }}>
                                            Work log
                                        </EditTicketPageComponents.ActivityButton>
                                    </div>
                                </EditTicketPageComponents.CardInfoBoxCustom>
                                {showComments && (
                                    <EditTicketPageComponents.CardInfoBoxCustom>
                                        <EditTicketPageComponents.Title>Comments</EditTicketPageComponents.Title>
                                        <EditTicketPageComponents.FormContainer onSubmit={handleCommentSubmit}>
                                            <EditTicketPageComponents.CommentInput
                                                type="text"
                                                placeholder="Add a comment..."
                                                value={newComment}
                                                onChange={handleNewCommentChange}
                                            />
                                            <EditTicketPageComponents.CommentButton
                                                type="submit">Send</EditTicketPageComponents.CommentButton>
                                        </EditTicketPageComponents.FormContainer>
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
                                    <UserSelectField
                                        onSelectChange={(value) => setSelectedAssignee(parseInt(value))}
                                        users={Useroptions}
                                        isMultiple={false}
                                        placeholder={"Unassigned"}
                                        defaultValue={currentIssueData?.assignee?.username}
                                    />

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
                                        onSelectChange={(value) =>  setSelectedIssueType(parseInt(value))}
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
                                        style={{
                                            width: '100%',
                                        }}
                                        options={IssueLabelOptions}
                                        optionFilterProp="label"
                                        onChange={(value,key)=> {handleLabelChange(key)}}
                                        />
                                    <EditTicketPageComponents.ContentInfoTitle>
                                        <RxStopwatch/>
                                        <span>Time Tracking</span>
                                    </EditTicketPageComponents.ContentInfoTitle>
                                    <TrackingField OriginalEstimate={currentIssueData?.estimate}/>

                                    <EditTicketPageComponents.ContentInfoTitle>
                                        <CgOptions/>
                                        <span>Priority</span>
                                    </EditTicketPageComponents.ContentInfoTitle>
                                    <GenericSelectField
                                        options={priorityOptions}
                                        isMultiple={false}
                                        placeholder={"Unassigned"}
                                        defaultValue={currentIssueData?.priority}
                                        onSelectChange={(value) =>  setSelectedPriority(value)}
                                    />

                                    <EditTicketPageComponents.ContentInfoTitle>
                                        <FiUser/>
                                        <span>Reporter</span>
                                    </EditTicketPageComponents.ContentInfoTitle>
                                    <UserSelectField
                                        onSelectChange={(value) => setSelectedReporter(parseInt(value))}
                                        users={Useroptions}
                                        isMultiple={false}
                                        placeholder={"Unassigned"}
                                        defaultValue={currentIssueData?.reporter?.username}
                                    />

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