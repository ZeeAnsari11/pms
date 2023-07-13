import React, {useState} from "react";
import styled from "styled-components";
import Avatar from "react-avatar";
import {Modal, Button, DatePicker, TimePicker} from "antd";
import {ImWarning} from 'react-icons/im'
import moment from 'moment';
import EstimateTimer from "../EstimateTimer/EstimateTimer";
import ReactQuill from "react-quill";
import axios from "axios";

const CommentContainer = styled.div`
  display: block;
  align-items: center;
`;

const EditModalContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 24px;
  grid-column-gap: 16px;

  .ql-toolbar {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    background-color: #f0f2f5;
  }

  .ql-container {
    height: 150px;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    border: 1px solid #ccc;
  }

  .ql-editor {
    padding: 8px;
    font-size: 14px;
  }
`;


const InputHeading = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StyledSpan = styled.span`
  display: inline-block;
  background-color: #DFE1E6;
  color: black;
  font-size: 0.8rem;
  padding: 0.1rem 0.5rem;
  border-radius: 40px;
`;

const CommentButtons = styled.div`
  display: flex;
`;

const CommentAuthor = styled.p`
  font-weight: bold;
  margin-right: 5px;
`;

const CommentText = styled.p`
  margin-top: -20px;
  font-size: 14px;
`;

const CommentActionButton = styled.button`
  background: none;
  border: none;
  color: gray;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  padding-right: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

function Worklog({
                        created_at,
                        created_by,
                        worklogUserId,
                        currentUser,
                        worklogDate,
                        worklogTime,
                        worklog,
                        index,
                        onDelete,
                        onEdit
}) {
    const [editWorklog, setEditWorklog] = useState(worklog);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [timeSpent, setTimeSpent] = useState(worklog.time_spent);
    const [timeRemaining, setTimeRemaining] = useState(worklog.time_remaining);
    const [workDescription, setWorkDescription] = useState(worklog.comment);
    const [startDate, setStartDate] = useState(moment(worklogDate));
    const [startTime, setStartTime] = useState(moment(worklogTime, 'h:mm a'));
    console.log('work log date in pro is ', worklogDate);
    console.log('work log date in state is ', startDate);
    console.log('work log time in pro is', worklogTime);
    console.log('work log time in state is', startTime);

    let authToken = localStorage.getItem('auth_token')
    const handleEdit = () => {
        onEdit(index);
        setEditWorklog(worklog);
        setShowEditModal(true); // Set the state to true to show the modal
    };


    const handleEditModal = () => {
        setShowEditModal(false);
        setStartTime('');
        setStartTime('');
    }

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append("time_spent", timeSpent);
        formData.append("time_remaining", timeRemaining);
        formData.append("date", moment(startDate.format('YYYY-MM-DD')));
        formData.append("time", moment(startTime.format('hh:mm[:ss[.uuuuuu]]')));
        formData.append("comment", workDescription);

        axios({
            method: 'patch',
            url: `${process.env.REACT_APP_HOST}/api/worklogs/${index}/`,
            headers: {
                'Authorization': `Token ${authToken}`,
            },
            data: formData
        })
            .then(response => {
                console.log('updated work log is ', response.data);
                onEdit(index, editWorklog);
                setShowEditModal(false);
            })
            .catch(error => {
                console.log(error);
            });

    };

    const confirmDelete = () => {
        axios
            .delete(`${process.env.REACT_APP_HOST}/api/worklogs/${index}/`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            })
            .then((response) => {
                // Comment deleted successfully, update the state or perform any necessary actions
                console.log(response.data)
                onDelete(index);
            })
            .catch((error) => {
                // Handle the error appropriately
                console.log(error);
            });
        setShowDeleteDialog(false);

    };

    const cancelDelete = () => {
        setShowDeleteDialog(false);
    };

    const handleTimeSpentChange = (value) => {
        setTimeSpent(value);
    };


    const handleWorklogDescription = (desc) => {
        setWorkDescription(desc)
    };

    const handleDateChange = (date) => {
        setStartDate(date);
    };

    const handleTimeChange = (time) => {
        setStartTime(time);
    };


    function convertToTimeFormat(hours) {
        if (typeof hours === 'string') {
            return hours;
        }
        const weeks = Math.floor(hours / 40);
        hours %= 40;
        const days = Math.floor(hours / 8);
        hours %= 8;
        const minutes = Math.ceil((hours - Math.floor(hours)) * 60);
        hours = Math.floor(hours);

        let timeFormat = '';
        if (weeks > 0) {
            timeFormat += `${weeks}w `;
        }
        if (days > 0) {
            timeFormat += `${days}d `;
        }
        if (hours > 0) {
            timeFormat += `${hours}h `;
        }
        if (minutes > 0) {
            timeFormat += `${minutes}m`;
        }
        return timeFormat.trim();
    }
    const formatDate = (dateString) => {
        return  moment(dateString).format('D MMMM YYYY');
    };

    const formatTime = (timeString) => {
        return  moment(timeString, 'HH:mm:ss').format('h:mm A');
    };

    const sanitizeComment = (comment) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(comment, 'text/html');
        return doc.body.textContent;
    };

    return (
        <li key={index} style={{listStyle: "none"}}>
            <CommentContainer>
                <Avatar
                    name={created_by}
                    size={30}
                    round={true}
                    color="Grey"
                    style={{marginRight: "10px", marginBottom: "-75px", marginLeft: "-40px"}}
                />
                <CommentButtons>
                    <CommentAuthor>{created_by}</CommentAuthor>
                    <p style={{ fontWeight: '500', color: '#42526E' }}>
                        logged <StyledSpan>{convertToTimeFormat(worklog.time_spent)}</StyledSpan>
                        <span style={{ marginLeft: '10px', fontWeight: '500', color: '#42526E' }} >
                            {formatDate(worklogDate)} at {formatTime(worklogTime)}
                        </span>
                    </p>
                </CommentButtons>
                <CommentText>{sanitizeComment(worklog.comment)}</CommentText>
                <CommentActionButton onClick={handleEdit}>Edit</CommentActionButton>
                {showEditModal && (
                    <Modal
                        title={<>Edit work log - worklog id: {worklog.id} </>}
                        open={showEditModal}
                        onCancel={handleEditModal}
                        footer={[
                            <Button key="save" type="primary" onClick={handleUpdate}>
                                Update
                            </Button>
                        ]}
                    >
                        <EditModalContent style={{marginTop: "20px"}}>
                            <div>
                                <InputHeading>Time spent</InputHeading>
                                <EstimateTimer defaultValue={convertToTimeFormat(timeSpent)}
                                                onHoursChange={handleTimeSpentChange}/>
                            </div>
                            <br></br>
                            <div>
                                <InputHeading>Date:</InputHeading>
                                <DatePicker value={startDate} onChange={handleDateChange}/>
                            </div>
                            <div>
                                <InputHeading>Time:</InputHeading>
                                <TimePicker use12Hours format="h:mm a" value={startTime}
                                            onChange={handleTimeChange}/>
                            </div>
                        </EditModalContent>
                        <div style={{marginTop: "10px", marginBottom: "10px"}}>
                            <InputHeading>Work Description:</InputHeading>
                            <ReactQuill value={workDescription} onChange={handleWorklogDescription}
                            />
                        </div>
                    </Modal>
                )}

                <CommentActionButton onClick={() => setShowDeleteDialog(true)}>Delete</CommentActionButton>
            </CommentContainer>
            <Modal
                title={<><ImWarning color="red" size={24} style={{marginRight: "5px"}}/> Delete worklog entry?</>}
                open={showDeleteDialog}
                onCancel={cancelDelete}
                footer={[
                    <Button key="confirm" type="primary" primary onClick={confirmDelete}>
                        Delete
                    </Button>
                ]}
            >
                <h3>Once you delete, it's gone for good.</h3>
                <p>Are you sure you want to delete this worklog?</p>
            </Modal>
        </li>
    )
        ;
}

export default Worklog;