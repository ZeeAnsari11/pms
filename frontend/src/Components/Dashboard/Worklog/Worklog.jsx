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
import * as WorklogComponents from "./Style"
import DOMPurify from "dompurify";
import {modules} from "../../../Shared/Const/ReactQuillToolbarOptions";
import {useDispatch} from "react-redux";
import {deleteWorkLog, updateWorkLog} from "../../../Store/Slice/worklog/worklogActions";
import * as CommentComponents from "../Comment/Style";

function Worklog({
                     created_at,
                     created_by,
                     updated_by,
                     updated_at,
                     worklogUserId,
                     currentUser,
                     worklogDate,
                     worklogTime,
                     worklog,
                     index,
                     onDelete,
                     onEdit
                 }) {
    const dispatch = useDispatch();

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [timeSpent, setTimeSpent] = useState(worklog.time_spent);
    const [timeRemaining, setTimeRemaining] = useState(worklog.time_remaining);
    const [workDescription, setWorkDescription] = useState(worklog.comment);
    const [startDate, setStartDate] = useState(dayjs(worklogDate));
    const [startTime, setStartTime] = useState(dayjs(worklogTime, 'HH:mm:ss'));

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
        formData.append("updated_by", currentUser?.id);
        dispatch(updateWorkLog({formData: formData, worklogId: index})).unwrap()
            .then(response => {
                setShowEditModal(false);
                onEdit(index, worklog);
            })
            .catch(error => {
                console.log(error);
            });

    };

    const confirmDelete = () => {
        dispatch(deleteWorkLog({worklogId: index})).unwrap()
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
        const sanitizedComment = DOMPurify.sanitize(comment, {
            ADD_TAGS: ['iframe'],
            ADD_ATTR: ['allowfullscreen', 'frameborder', 'scrolling']
        });

        const tempElement = document.createElement('div');
        tempElement.innerHTML = sanitizedComment;

        const images = tempElement.querySelectorAll('img');
        const videos = tempElement.querySelectorAll('video');

        for (const image of images) {
            image.style.maxWidth = '100%';
        }

        for (const video of videos) {
            video.style.maxWidth = '100%';
        }

        const quillElements = tempElement.querySelectorAll('.ql-editor');

        for (const quillElement of quillElements) {
            quillElement.style.fontFamily = 'Arial, sans-serif';
            quillElement.style.fontSize = '16px';
        }

        // Set width and height for iframe elements
        const iframes = tempElement.querySelectorAll('iframe');

        for (const iframe of iframes) {
            iframe.style.maxWidth = '100%';
            iframe.style.height = 'auto';
        }

        const modifiedComment = tempElement.innerHTML;

        return {
            __html: modifiedComment,
        };
    };

    function formatDateTime(dateTimeField) {
        const date = new Date(dateTimeField);

        const day = date.getDate();
        const month = date.toLocaleString('default', {month: 'long'});
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const formattedDate = `${day} ${month} ${year} at ${hours}:${minutes
            .toString()
            .padStart(2, '0')}`;

        return formattedDate;
    }


    return (
        <li key={index} style={{listStyle: "none"}}>
            <WorklogComponents.CommentContainer>
                <WorklogComponents.CommentButtons>
                    <WorklogComponents.CommentAuthor>
                        <Avatar
                            name={created_by?.username}
                            size={35}
                            round={true}
                            color="#DE350B"
                            src={`${process.env.REACT_APP_DOMAIN}${created_by?.userprofile?.image}`}
                            title={created_by?.username}
                            style={{marginRight: "10px", marginLeft: "-40px"}}
                        />
                        {created_by?.username}
                    </WorklogComponents.CommentAuthor>
                    <p style={{fontWeight: '500', marginBottom: "5px", color: '#42526E'}}>
                        logged <WorklogComponents.StyledSpan>{convertToTimeFormat(worklog.time_spent)}</WorklogComponents.StyledSpan>
                        <span style={{marginLeft: '10px', fontWeight: '500', color: '#42526E'}}>
                            {formatDate(worklogDate)} at {formatTime(worklogTime)}
                        </span>

                        <span className="tooltip" title={`${formatDateTime(updated_at)} by ${updated_by?.username}`}>
                            {updated_by && (
                                <CommentComponents.CommentEditedText>
                                    Edited
                                </CommentComponents.CommentEditedText>
                            )}
                        </span>
                    </p>
                </WorklogComponents.CommentButtons>
                <WorklogComponents.CommentText>
                    <div dangerouslySetInnerHTML={sanitizeComment(worklog.comment)}/>
                </WorklogComponents.CommentText>
                <WorklogComponents.CommentActionButton onClick={handleEdit}>
                    Edit
                    <WorklogComponents.Dot/>
                </WorklogComponents.CommentActionButton>
                {showEditModal && (
                    <Modal
                        title={<>Edit work log</>}
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
                            <ReactQuill modules={modules} value={workDescription} onChange={handleWorklogDescription}
                            />
                        </div>
                    </Modal>
                )}

                <WorklogComponents.CommentActionButton
                    onClick={() => setShowDeleteDialog(true)}>
                    Delete
                    <WorklogComponents.Dot/>
                </WorklogComponents.CommentActionButton>
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