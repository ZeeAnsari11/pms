import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Progress, Modal, DatePicker, TimePicker, InputNumber, Input} from 'antd';
import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {TimeTrackingContainer, ProgressBarContainer, InputHeading, ModalContent, StyledSpan} from './styles'
import Worklog from '../Worklog/Worklog';
import EstimateTimer from "../EstimateTimer/EstimateTimer";
import axios from 'axios';

const TimeTracking = ({OrginalEstimate}) => {
    let authToken = localStorage.getItem('auth_token')


    const [originalEstimate, setOriginalEstimate] = useState(OrginalEstimate);
    const [currentIssueid, setCurrentIssueid] = useState('');
    const [timeSpent, setTimeSpent] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [workDescription, setWorkDescription] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [worklogs, setWorklogs] = useState([]);

    const handleProgressBarClick = () => {
        setIsModalVisible(true);
    };

    const urlParams = new URLSearchParams(window.location.search);
    const selectedIssueSlug = urlParams.get('selectedIssue');
    console.log("selectedIssueSlug", selectedIssueSlug);

    const {issueId, projectId} = useParams();


    useEffect(() => {
        const getCurrentIssueId = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_HOST}/api/issues/?slug__iexact=${selectedIssueSlug}`, {
                    headers: {
                        Authorization: `Token ${authToken}`,
                    },
                });
                setCurrentIssueid(response.data[0].id);
            } catch (error) {
                console.log(error);
                throw new Error('Failed to fetch Current Issue Id');
            }
        };

        if (selectedIssueSlug) {
            getCurrentIssueId();
        } else {
            setCurrentIssueid(issueId);
        }
    }, [selectedIssueSlug, issueId]);

    useEffect(() => {
        if (timeRemaining === 0) {
            setTimeRemaining(originalEstimate)
        } else {
            setTimeRemaining(timeRemaining);
        }
    }, [timeRemaining]);


    useEffect(() => {
        const fetchWorklogs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_HOST}/api/worklogs/?issue=${currentIssueid}`, {
                    headers: {
                        Authorization: `Token ${authToken}`,
                    },
                });
                setWorklogs(response.data);
            } catch (error) {
                console.log(error);
                throw new Error('Failed to fetch comments');
            }
        };

        fetchWorklogs();
    }, []);


    useEffect(() => {
        const fetchWorklogs = async () => {
            try {
                if (currentIssueid) {
                    const response = await axios.get(`${process.env.REACT_APP_HOST}/api/worklogs/?issue=${currentIssueid}`, {
                        headers: {
                            Authorization: `Token ${authToken}`,
                        },
                    });
                    setWorklogs(response.data);
                }
            } catch (error) {
                console.log(error);
                throw new Error('Failed to fetch comments');
            }
        };

        fetchWorklogs();
    }, [currentIssueid]);


    useEffect(() => {
        let totalSpent = 0;
        worklogs.forEach(worklog => {
            totalSpent += worklog.time_spent;
        });
        const remainingTime = originalEstimate - totalSpent;
        setTimeRemaining(remainingTime);
        setTimeSpent(totalSpent);
    }, [worklogs]);


    const handleModalOk = () => {

        const config = {
            headers: {
                Authorization: `Token ${authToken}`
            }
        };

        const newWorklog = {
            time_spent: timeSpent,
            comment: workDescription,
            issue_id: currentIssueid,
            date: startDate.format('YYYY-MM-DD'),
            time: startTime.format('HH:mm:ss'),
        };

        // Make the POST request
        axios.post(`${process.env.REACT_APP_HOST}/api/worklogs/`, newWorklog, config)

            .then(response => {
                // Handle the response if needed
                console.log(response.data);
            })
            .catch(error => {
                // Handle the error if the request fails
                console.error(error);
            });

        setWorklogs([...worklogs, newWorklog]);
        setIsModalVisible(false);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleTimeSpentChange = (value) => {
        setTimeSpent(value);
        const remainingTime = originalEstimate - value;
        setTimeRemaining(remainingTime <= 0 ? '0m' : remainingTime);
    };

    const handleTimeRemainingChange = (value) => {
        setTimeRemaining(value);
        const remainingTime = originalEstimate - value;
        setTimeRemaining(remainingTime <= 0 ? '0m' : remainingTime);
    };

    const handleOriginalEstimateTimeChange = (value) => {
        setOriginalEstimate(value);
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
        let totalTime;
        if (!timeRemaining && originalEstimate) {
            totalTime = originalEstimate;
        } else {
            totalTime = timeSpent + originalEstimate;
        }
        return Math.round((timeSpent / totalTime) * 100);
    };

    const getTimeLogged = () => {
        const hours = Math.floor(timeSpent);
        if (hours > 0) {
            return `${convertToTimeFormat(hours)} logged`;
        } else {
            return "No time logged";
        }
    };

    const getTimeRemaining = () => {
        const hours = Math.floor(timeRemaining);
        if (timeRemaining) {
            return `${convertToTimeFormat(hours)} remaining`;
        } else if (originalEstimate) {
            return `${convertToTimeFormat(originalEstimate)} estimated`;
        } else {
            return "";
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
            <TimeTrackingContainer>
                <div>
                <span style={{fontWeight: "bold", marginRight: "10px"}}>
          Original Estimate
                </span>
                    <StyledSpan
                    >{convertToTimeFormat(originalEstimate)}</StyledSpan>.
                    {/*<InputNumber size={"small"} min={0} value={originalEstimate}*/}
                    {/*             onChange={handleOriginalEstimateTimeChange}/>*/}
                </div>
                <ProgressBarContainer>
                    <Progress style={{marginTop: "20px"}} percent={getTimePercentage()}
                              onClick={handleProgressBarClick}/>
                </ProgressBarContainer>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                    <div><p style={{marginTop: 0, fontWeight: "bold"}}>{getTimeLogged()}</p></div>
                    <div><p style={{marginTop: 0, fontWeight: "bold"}}>{getTimeRemaining()}</p></div>
                </div>
                <Modal
                    title="Time Tracking"
                    open={isModalVisible}
                    onOk={handleModalOk}
                    onCancel={handleModalCancel}
                >
                    <ProgressBarContainer>
                        <Progress style={{marginTop: "20px"}} percent={getTimePercentage()}
                                  onClick={handleProgressBarClick}/>
                    </ProgressBarContainer>
                    <div
                        style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                        <div><p style={{marginTop: 0, fontWeight: "bold"}}>{getTimeLogged()}</p></div>
                        <div><p style={{marginTop: 0, fontWeight: "bold"}}>{getTimeRemaining()}</p></div>
                    </div>

                    <div
                        style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                        <div><p
                            style={{alignSelf: "center", fontSize: "1rem", marginTop: 0, fontWeight: "500"}}>The
                            original estimate for
                            this issue was <StyledSpan
                            >{convertToTimeFormat(originalEstimate)}</StyledSpan>.
                        </p></div>
                    </div>

                    <ModalContent style={{marginTop: "20px"}}>

                        <div>
                            <InputHeading>Time spent</InputHeading>
                            <EstimateTimer onHoursChange={handleTimeSpentChange}/>
                        </div>
                        <div>
                            <InputHeading>Time remaining
                            </InputHeading>
                            <StyledSpan>{convertToTimeFormat(timeRemaining)}</StyledSpan>
                        </div>

                        <div>
                            <InputHeading>Date:</InputHeading>
                            <DatePicker value={startDate} onChange={handleDateChange}/>
                        </div>
                        <div>
                            <InputHeading>Time:</InputHeading>
                            <TimePicker use12Hours format="h:mm a" value={startTime}
                                        onChange={handleTimeChange}/>
                        </div>

                    </ModalContent>
                    {timeSpent ? (
                        <div style={{marginTop: "10px", marginBottom: "10px"}}>
                            <InputHeading>Work Description:</InputHeading>
                            <ReactQuill value={workDescription} onChange={handleWorklogDescription}
                            />
                        </div>
                    ) : null}
                </Modal>
            </TimeTrackingContainer>
        </div>
    );
};

export default TimeTracking;