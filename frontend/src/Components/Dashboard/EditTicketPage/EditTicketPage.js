import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useNavigate, useParams} from "react-router-dom";
import NavBar from "../../Dashboard/Navbar";
import Sidebar from "../../Dashboard/Sidebar/ProjectSidebar";
import FileUpload from "../FileAttachement/FileUpload";
import axios from "axios";
import ImageUploader from "../../User/ImageUploader";
import {Input} from "antd";
import UserSelectField from "../SelectFields/UserSelectField";
import {Collapse} from 'antd';
import GenericSelectField from "../SelectFields/GenericSelectField";
import TrackingField from "../TimeTracking";
import Editable from "../Editable/Editable";
import Description from "../TextEditor/TextEditor"
import Comment from "../Comment/Comment";
import Worklog from "../Worklog/Worklog";
import ReactQuill from "react-quill";

const {TextArea} = Input;

const {Panel} = Collapse;

const PageWrapper = styled.div`
  background-color: #fff;
  height: 100vh;
  padding: 0 0 0 18%;
`;

const Header = styled.header`
  display: flex;
  align-items: flex-start;
  padding: 0.5rem;
`;

const Details = styled.h1`
  margin-top: 50px;
  margin-bottom: 20px;
  margin-left: 1px;
`;

const NameInput = styled.input`
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 2%;
  background-color: #FAFBFC;
  width: 359px;

  :hover {
    background-color: #EBECF0;
  }
`;

const RightSideWrapper = styled.div`
  margin-left: auto;
  margin-right: 10px;
  width: 40%;
  padding-left: 20px;
`;

const RightSideContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

const LeftSideWrapper = styled.div`
  margin-right: auto;
  margin-left: 10px;
  width: 60%;
  padding-right: 20px;
`;

const LeftSideContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;


const StyledCollapse = styled(Collapse)`
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
`;

const StyledPanel = styled(Panel)`
  background-color: #F4F5F7;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-right: 325px;
`;

const LabelForKey = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-right: 342px;
`;


const Labelforlead = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-top: 10px;
  margin-right: 278px;
`;


const ContentInfoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  font-weight: 600;
  font-size: 1rem;

  span {
    display: inline-block;
    width: 100px;
  }
`;

const Title = styled.div`
  width: fit-content;
  font-weight: 700;
  margin-bottom: 10px;
  margin-top: 5px;
  color: #727F94;
`;


const IssueTitle = styled.div`
  font-weight: 700;
  margin-bottom: 10px;
  margin-top: 5px;
`;


const Container = styled.div`
  display: flex;
`;

const LeftSide = styled.div`
  width: 65%;
  padding-top: 70px;
  margin-left: 220px;
`;

const RightSide = styled.div`
  width: 35%;
  padding-top: 80px;
  margin-right: 10px;
  margin-left: 10px;
`;

const CardInfoBoxCustom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 10px;
`;

const FileAttachmentsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 10px;
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

const SaveButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #0062FF;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  z-index: 999;

  &:hover {
    background-color: #3e81ed;
    cursor: pointer;
  }
`;

function EditTicketPage({props}) {
    let authToken = localStorage.getItem('auth_token')


    const initialworklogs = [
        {username: 'John', timeTracked: '2', description: 'Worklog 1'},
        {username: 'Jane', timeTracked: '3', description: 'Worklog 2'},
        {username: 'Bob', timeTracked: '1', description: 'Worklog 3'},
    ];

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

    const [IssueName, setIssueName] = useState('');
    const [IssueDesc, setIssueDesc] = useState('');
    const [IssueSummary, setIssueSummary] = useState('');

    const [IssueEstimate, setIssueEstimate] = useState(0);

    const [currentAssignee, setCurrentAssignee] = useState('');
    const [currentReporter, setCurrentReporter] = useState('');
    const [currentLabels, setCurrentLabels] = useState('');

    const [selectedAssignee, setSelectedAssignee] = useState('');
    const [selectedReporter, setSelectedReporter] = useState('');
    const [selectedLabel, setSelectedLabel] = useState('');

    const [IssuesData, setIssuesData] = useState([]);
    const [IssueType, setIssueType] = useState('');
    const [IssueLabels, setIssueLabels] = useState('');

    const [selectedIssueStatus, setSelectedIssueStatus] = useState('');
    const [selectedIssueType, setSelectedIssueType] = useState('');
    const [selectedPriority, setSelectedPriority] = useState('');


    const [Users, setUsers] = useState('');
    const [currentUserData, setCurrentUserData] = useState({});
    const [currentUserEmail, setCurrentUserEmail] = useState({});

    const [files, setFiles] = useState([]);
    const [currentIssueData, setCurrentIssueData] = useState([]);

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


    const handleFilesChange = (newFiles) => {
        setFiles(newFiles);
    };

    const handleNameChange = (value) => {
        setIssueName(value);
    };

    const handleDescChange = (newDesc) => {
        setIssueDesc(newDesc);
    };
    const handleSummaryChange = (event) => {
        const summary = event.target.value;
        setIssueSummary(summary);
    };

    const handleAssigneeChange = (value) => {
        setSelectedAssignee(parseInt(value));
    };

    const handleReporterChange = (value) => {
        setSelectedReporter(parseInt(value));
    };

    const handleLabelChange = (value) => {
        setSelectedLabel(parseInt(value));
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


        const fetchDependentProjectLabels = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/project_labels/?project=${projectId}`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setIssueLabels(response.data);
        };

        // const fetchCurrentUserDataFromUserList = async () => {
        //     try {
        //         const response = await axios.get(`${process.env.REACT_APP_HOST}/api/userprofile/?user__email__iexact=${currentUserEmail}`, {
        //             headers: {"Authorization": `Token ${authToken}`}
        //         });
        //         setCurrentUserData(response.data[0]);
        //     } catch (error) {
        //         console.error(error);
        //     }
        // }
        fetchDependentUserOptions();
        fetchDependentProjectLabels();
        fetchComments();
        fetchWorklogs();

    }, []);


    useEffect(() => {
        const fetchCurrentIssueData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_HOST}/api/issues/${issueId}`, {
                    headers: {"Authorization": `Token ${authToken}`}
                });
                setCurrentIssueData(response.data);
                setFiles(response.data?.file)
            } catch (error) {
                console.error(error);
            }
        }

        fetchCurrentIssueData();
    }, []);


    useEffect(() => {
        if (currentIssueData?.id) {
            setIssueName(currentIssueData?.name)
            setIssueDesc(currentIssueData?.description)
            setIssueSummary(currentIssueData?.summary)
            setFiles(currentIssueData?.file)
            setSelectedAssignee(currentIssueData?.assignee?.id)
            setSelectedReporter(currentIssueData?.reporter?.id)
            setSelectedLabel(currentIssueData?.label?.id)
            setCurrentAssignee(currentIssueData?.assignee?.username)
            setCurrentReporter(currentIssueData?.reporter?.username)
            setCurrentLabels(currentIssueData?.label?.name)
            setIssueEstimate(currentIssueData?.estimate)
        }
    }, [currentIssueData])

    console.log("IssueName:", IssueName)
    console.log("IssueDesc:", IssueDesc)
    console.log("IssueSummary:", IssueSummary)
    console.log("files:", files)

    console.log("currentIssueData:", currentIssueData)
    console.log("IssueEstimate:", IssueEstimate)


    const fileArray = files
    const prefix = "http://localhost:8000";
    const combinedArray = fileArray.map((file) => `${prefix}${file}`);

    console.log("combinedArray:", combinedArray)

    const Useroptions = Users
        ? Users.map((Users) => ({
            username: Users.username,
            id: Users.id,
        }))
        : [];

    const IssueLabeloptions = IssueLabels
        ? IssueLabels.map((IssueType) => ({
            label: IssueType.name,
            value: IssueType.id,
        }))
        : [];

    const handleFormSubmit = () => {

        const formData = new FormData();

        formData.append("assignee", selectedAssignee);
        formData.append("reporter", selectedReporter);
        formData.append("label", selectedLabel);
        formData.append("summary", IssueSummary);
        formData.append("description", IssueSummary);
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
            .delete(`http://127.0.0.1:8000/api/comments/${index}/`, {
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

    return (
        <div>

            <NavBar/>
            <Sidebar/>
            <FormWrapper>
                <Container>
                    <LeftSide>
                        <IssueTitle>
                            <Editable
                                text={IssueName}
                                placeholder={IssueName}
                                buttonText="Save Issue Name"
                                fontWeight={"bold"}
                                hoverBackgroundColor={"#EBECF0"}
                                onSubmit={(value) => handleNameChange(value)}
                            />
                        </IssueTitle>
                        <Title>
                            Summary
                        </Title>
                        <TextArea rows={2} value={IssueSummary} onChange={handleSummaryChange}/>
                        <Title>
                            Description
                        </Title>
                        <div style={{marginBottom: "15px"}}>
                            <ReactQuill value={IssueDesc} onChange={handleDescChange}/>
                        </div>
                        <Title>
                            File Attachments
                        </Title>
                        <FileAttachmentsContent>
                            <FileUpload onFilesChange={handleFilesChange} fileAttachmentArray={combinedArray}/>
                        </FileAttachmentsContent>


                        <CardInfoBox style={{marginTop: '15px'}}>

                            <>
                                <CardInfoBoxCustom>
                                    <Title>Activity</Title>
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
                                        <Title>Comments</Title>
                                        <FormContainer onSubmit={handleCommentSubmit}>
                                            <CommentInput
                                                type="text"
                                                placeholder="Add a comment..."
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
                                        <Title>Worklog</Title>
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

                    </LeftSide>
                    <RightSide>
                        <StyledCollapse defaultActiveKey={['1']}>
                            <StyledPanel header="Details" key="1">
                                <RightSideContent>
                                    <ContentInfoTitle>
                                        <span>Assignee</span>
                                        <UserSelectField
                                            onSelectChange={handleAssigneeChange}
                                            users={Useroptions}
                                            isMultiple={false}
                                            placeholder={"Unassigned"}
                                            defaultValue={currentAssignee}
                                        />
                                    </ContentInfoTitle>

                                    <ContentInfoTitle>
                                        <span>Time Tracking</span>
                                        <TrackingField OrginalEstimate={IssueEstimate}/>
                                    </ContentInfoTitle>

                                    <ContentInfoTitle>
                                        <span>Labels</span>
                                        <GenericSelectField
                                            onSelectChange={handleLabelChange}
                                            options={IssueLabeloptions}
                                            isMultiple={false}
                                            placeholder={"Unassigned"}
                                            defaultValue={currentLabels}
                                        />
                                    </ContentInfoTitle>

                                    <ContentInfoTitle>
                                        <span>Reporter</span>
                                        <UserSelectField
                                            onSelectChange={handleReporterChange}
                                            users={Useroptions}
                                            isMultiple={false}
                                            placeholder={"Unassigned"}
                                            defaultValue={currentReporter}
                                        />
                                    </ContentInfoTitle>

                                </RightSideContent>
                            </StyledPanel>
                            {/* Add more Panel components as needed */}
                        </StyledCollapse>
                    </RightSide>
                </Container>
            </FormWrapper>
            <SaveButton onClick={handleFormSubmit}>Save Changes</SaveButton>

        </div>
    );
}


export default EditTicketPage;
