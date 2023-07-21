import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Progress, Modal, Button} from 'antd';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as TimeTrackingComponents from "./Style"
import EstimateTimer from "../EstimateTimer/EstimateTimer";
import axios from 'axios';

const TimeTracking = ({OriginalEstimate}) => {

    const [currentIssueId, setCurrentIssueId] = useState('');
    const [currentTimeLog, setCurrentTimeLog] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [workDescription, setWorkDescription] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [timeLoggedHistory, setTimeLoggedHistory] = useState([]);
    const [timeLogged, setTimeLogged] = useState(0);


    const urlParams = new URLSearchParams(window.location.search);
    const selectedIssueSlug = urlParams.get('selectedIssue');
    console.log("selectedIssueSlug", selectedIssueSlug);

    const {issueId} = useParams();
    const originalEstimate = OriginalEstimate;
    let authToken = localStorage.getItem('auth_token')


    useEffect(() => {
        const getCurrentIssueId = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_HOST}/api/issues/?slug__iexact=${selectedIssueSlug}`, {
                    headers: {
                        Authorization: `Token ${authToken}`,
                    },
                });
                setCurrentIssueId(response.data[0].id);
            } catch (error) {
                console.log(error);
                throw new Error('Failed to fetch Current Issue Id');
            }
        };

        if (selectedIssueSlug) {
            getCurrentIssueId();
        } else {
            setCurrentIssueId(issueId);
        }
    }, [selectedIssueSlug, issueId]);


    useEffect(() => {
        const fetchWorklogs = async () => {
            try {
                if (currentIssueId) {
                    const response = await axios.get(`${process.env.REACT_APP_HOST}/api/worklogs/?issue=${currentIssueId}`, {
                        headers: {
                            Authorization: `Token ${authToken}`,
                        },
                    });
                    setTimeLoggedHistory(response.data);
                }
            } catch (error) {
                console.log(error);
                throw new Error('Failed to fetch comments');
            }
        };

        fetchWorklogs();
    }, [currentIssueId]);


    useEffect(() => {
        let totalSpent = 0;
        timeLoggedHistory.forEach(worklog => {
            totalSpent += worklog.time_spent;
        });
        setTimeLogged(totalSpent);
    }, [timeLoggedHistory]);


    const handleModalOk = () => {

        const config = {
            headers: {
                Authorization: `Token ${authToken}`
            }
        };

        const newTimelog = {
            time_spent: currentTimeLog,
            comment: workDescription,
            issue_id: currentIssueId,
            date: startDate.format('YYYY-MM-DD'),
            time: startTime.format('HH:mm:ss'),
        };
        console.log('New Time ', startTime);
        console.log('New Date ', startDate);
        axios.post(`${process.env.REACT_APP_HOST}/api/worklogs/`, newTimelog, config)

            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        setTimeLoggedHistory([...timeLoggedHistory, newTimelog]);
        setIsModalVisible(false);
        setCurrentTimeLog(0);
        setWorkDescription(null);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setCurrentTimeLog(0);
        setWorkDescription(null);
    };

    const handleTimeSpentChange = (value) => {
        setCurrentTimeLog(value);
    };

    const handleDateChange = (date) => {
        setStartDate(date);
    };


    const handleWorklogDescription = (desc) => {
        setWorkDescription(desc)
    };

    const handleTimeChange = (time) => {
        setStartTime(time);
    };


    const getTimePercentage = () => {
        let totalTimeLog = timeLogged + currentTimeLog;
        if (totalTimeLog > originalEstimate) {
            return Math.round((originalEstimate / totalTimeLog) * 100);
        }
        return Math.round((totalTimeLog / originalEstimate) * 100);
    };

    const getTotalTimeLog = () => {
        let totalTimeLog = timeLogged + currentTimeLog;
        if (totalTimeLog > 0) {
            return `${convertToTimeFormat(totalTimeLog)} logged`;
        } else {
            return "No time logged";
        }
    };

    const getTotalTimeRemaining = () => {
        let totalTimeSpent = timeLogged + currentTimeLog;
        if (totalTimeSpent > originalEstimate) {
            return `${convertToTimeFormat(totalTimeSpent - originalEstimate)} over the original estimate`;
        }

        let remainingTime = originalEstimate - totalTimeSpent;
        if (remainingTime > 0) {
            return `${convertToTimeFormat(remainingTime)} remaining`;
        } else if (originalEstimate) {
            return `${convertToTimeFormat(originalEstimate)} estimated`;
        } else {
            return "No Original estimate was provided";
        }
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


    return (
        <div>
            <TimeTrackingComponents.TimeTrackingContainer>
                <div>
                <span style={{fontWeight: "bold", marginRight: "10px"}}>
                    Original Estimate
                </span>
                    <TimeTrackingComponents.TimeEstimate>{originalEstimate > 0 ? convertToTimeFormat(originalEstimate) : '0m'}</TimeTrackingComponents.TimeEstimate>
                    {/*<InputNumber size={"small"} min={0} value={originalEstimate}*/}
                    {/*             onChange={handleOriginalEstimateTimeChange}/>*/}
                </div>
                <TimeTrackingComponents.ProgressBarContainer>
                    {timeLogged > originalEstimate ? (
                        <Progress
                            style={{marginTop: "5px", cursor: 'pointer'}}
                            strokeColor={'#1e64d1'} trailColor={"#d2193b"}
                            showInfo={false} percent={getTimePercentage()}
                            onClick={() => setIsModalVisible(true)}
                        />
                    ) : (
                        <Progress
                            style={{marginTop: "5px", cursor: 'pointer'}}
                            strokeColor={'#1e64d1'} trailColor={"#ccc6c6"}
                            showInfo={false} percent={getTimePercentage()}
                            onClick={() => setIsModalVisible(true)}
                        />
                    )}
                </TimeTrackingComponents.ProgressBarContainer>
                <TimeTrackingComponents.TimeTextDisplayContainer>
                    <TimeTrackingComponents.TapTimeTextContainer><p>{getTotalTimeLog()}</p>
                    </TimeTrackingComponents.TapTimeTextContainer>
                    <TimeTrackingComponents.TapTimeTextContainer><p>{getTotalTimeRemaining()}</p>
                    </TimeTrackingComponents.TapTimeTextContainer>
                </TimeTrackingComponents.TimeTextDisplayContainer>
                <Modal
                    title="Time Tracking"
                    open={isModalVisible}
                    onCancel={handleModalCancel}
                    footer={[
                        <Button key="save" type="primary" onClick={handleModalOk}>
                            Save
                        </Button>
                    ]}
                >
                    <TimeTrackingComponents.StyledProgressBarContainer>
                        {(timeLogged + currentTimeLog) > originalEstimate ? (
                            <Progress
                                style={{marginTop: "5px"}}
                                strokeColor={'#1e64d1'} trailColor={"#d2193b"}
                                showInfo={false} percent={getTimePercentage()}
                            />
                        ) : (
                            <Progress
                                style={{marginTop: "5px"}}
                                strokeColor={'#1e64d1'} trailColor={"#ccc6c6"}
                                showInfo={false} percent={getTimePercentage()}
                            />
                        )}
                    </TimeTrackingComponents.StyledProgressBarContainer>
                    <TimeTrackingComponents.TimeTextDisplayContainer>
                        <TimeTrackingComponents.ModalTimeTextContainer><p>{getTotalTimeLog()}</p>
                        </TimeTrackingComponents.ModalTimeTextContainer>
                        <TimeTrackingComponents.ModalTimeTextContainer><p>{getTotalTimeRemaining()}</p>
                        </TimeTrackingComponents.ModalTimeTextContainer>
                    </TimeTrackingComponents.TimeTextDisplayContainer>

                    <TimeTrackingComponents.TimeTextDisplayContainer>
                        <div><p
                            style={{alignSelf: "center", fontSize: "1rem", marginTop: 0, fontWeight: "500"}}>The
                            original estimate for
                            this issue was
                            <TimeTrackingComponents.TimeEstimate>{originalEstimate > 0 ? convertToTimeFormat(originalEstimate) : '0m'}</TimeTrackingComponents.TimeEstimate>
                        </p></div>
                    </TimeTrackingComponents.TimeTextDisplayContainer>

                    <TimeTrackingComponents.WorkLogModalContent>

                        <div>
                            <TimeTrackingComponents.InputHeading>Time spent</TimeTrackingComponents.InputHeading>
                            <EstimateTimer onHoursChange={handleTimeSpentChange}/>
                        </div>
                        <br/>
                        <div>
                            <TimeTrackingComponents.InputHeading>Date:</TimeTrackingComponents.InputHeading>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker value={startDate} onChange={handleDateChange}/>
                            </LocalizationProvider>
                        </div>
                        <div>
                            <TimeTrackingComponents.InputHeading>Time:</TimeTrackingComponents.InputHeading>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker label="Controlled picker" value={startTime}
                                            onChange={handleTimeChange}/>
                            </LocalizationProvider>
                        </div>

                    </TimeTrackingComponents.WorkLogModalContent>
                    {currentTimeLog ? (
                        <TimeTrackingComponents.WorklogDescription>
                            <TimeTrackingComponents.InputHeading>Work Description:</TimeTrackingComponents.InputHeading>
                            <ReactQuill value={workDescription} onChange={handleWorklogDescription}/>
                        </TimeTrackingComponents.WorklogDescription>
                    ) : null}
                </Modal>
            </TimeTrackingComponents.TimeTrackingContainer>
        </div>
    );
};

export default TimeTracking;