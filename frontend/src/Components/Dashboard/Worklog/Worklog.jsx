import React, {useState} from "react";
import Avatar from "react-avatar";
import {Modal, Button} from "antd";
import dayjs from 'dayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {ImWarning} from 'react-icons/im'
import moment from 'moment';
import EstimateTimer from "../EstimateTimer/EstimateTimer";
import ReactQuill from "react-quill";
import axios from "axios";
import * as WorklogComponents from "./Style"

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
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [timeSpent, setTimeSpent] = useState(worklog.time_spent);
    const [timeRemaining, setTimeRemaining] = useState(worklog.time_remaining);
    const [workDescription, setWorkDescription] = useState(worklog.comment);
    const [startDate, setStartDate] = useState(dayjs(worklogDate));
    const [startTime, setStartTime] = useState(dayjs(worklogTime, 'HH:mm:ss'));

    let authToken = localStorage.getItem('auth_token')
    const handleEdit = () => {
        setShowEditModal(true);
    };

    const handleUpdate = () => {
        const formData = new FormData();
        const formattedDate = startDate.format('YYYY-MM-DD');
        const formattedTime = startTime.format('HH:mm:ss');
        formData.append("time_spent", timeSpent);
        formData.append("time_remaining", timeRemaining);
        formData.append("date", formattedDate);
        formData.append("time", formattedTime);
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
                console.log(response.data)
                onDelete(index);
            })
            .catch((error) => {
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
        console.log('On Date Change', date);
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
        return moment(dateString).format('D MMMM YYYY');
    };

    const formatTime = (timeString) => {
        console.log('time is ', timeString);
        console.log('formated time is', moment(timeString, 'HH:mm:ss'))
        return moment(timeString, 'HH:mm:ss').format('hh:mm a');
    };

    const sanitizeComment = (comment) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(comment, 'text/html');
        return doc.body.textContent;
    };

    return (
        <li key={index} style={{listStyle: "none"}}>
            <WorklogComponents.CommentContainer>
                <Avatar
                    name={created_by?.username}
                    size={35}
                    round={true}
                    color="#DE350B"
                    src={`${created_by?.userprofile?.image}`}
                    title={created_by?.username}
                    style={{marginRight: "10px", marginBottom: "-75px", marginLeft: "-40px"}}
                />
                <WorklogComponents.CommentButtons>
                    <WorklogComponents.CommentAuthor>{created_by?.username}</WorklogComponents.CommentAuthor>
                    <p style={{fontWeight: '500', color: '#42526E'}}>
                        logged <WorklogComponents.StyledSpan>{convertToTimeFormat(worklog.time_spent)}</WorklogComponents.StyledSpan>
                        <span style={{marginLeft: '10px', fontWeight: '500', color: '#42526E'}}>
                            {formatDate(worklogDate)} at {formatTime(worklogTime)}
                        </span>
                    </p>
                </WorklogComponents.CommentButtons>
                <WorklogComponents.CommentText>{sanitizeComment(worklog.comment)}</WorklogComponents.CommentText>
                <WorklogComponents.CommentActionButton onClick={handleEdit}>Edit</WorklogComponents.CommentActionButton>
                {showEditModal && (
                    <Modal
                        title={<>Edit work log - worklog id: {worklog.id} </>}
                        open={showEditModal}
                        onCancel={() => setShowEditModal(false)}
                        footer={[
                            <Button key="save" type="primary" onClick={handleUpdate}>
                                Update
                            </Button>
                        ]}
                    >
                        <WorklogComponents.EditModalContent style={{marginTop: "20px"}}>
                            <div>
                                <WorklogComponents.InputHeading>Time spent</WorklogComponents.InputHeading>
                                <EstimateTimer defaultValue={convertToTimeFormat(timeSpent)}
                                               onHoursChange={handleTimeSpentChange}/>
                            </div>
                            <br></br>
                            <div>
                                <WorklogComponents.InputHeading>Date:</WorklogComponents.InputHeading>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker value={startDate} onChange={handleDateChange}/>
                                </LocalizationProvider>
                            </div>
                            <div>
                                <WorklogComponents.InputHeading>Time:</WorklogComponents.InputHeading>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker value={startTime} onChange={handleTimeChange}/>
                                </LocalizationProvider>
                            </div>
                        </WorklogComponents.EditModalContent>
                        <div style={{marginTop: "10px", marginBottom: "10px"}}>
                            <WorklogComponents.InputHeading>Work Description:</WorklogComponents.InputHeading>
                            <ReactQuill value={workDescription} onChange={handleWorklogDescription}
                            />
                        </div>
                    </Modal>
                )}

                <WorklogComponents.CommentActionButton
                    onClick={() => setShowDeleteDialog(true)}>Delete</WorklogComponents.CommentActionButton>
            </WorklogComponents.CommentContainer>
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