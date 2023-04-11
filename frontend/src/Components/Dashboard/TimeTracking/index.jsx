// import React, {useState} from 'react';
// import {Progress, Modal, DatePicker, TimePicker, InputNumber, Input} from 'antd';
// import moment from 'moment';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import {TimeTrackingContainer, ProgressBarContainer, InputHeading, ModalContent} from './styles'
//
//
// const TimeTracking = () => {
//     const [originalEstimate, setOriginalEstimate] = useState(0);
//     const [timeSpent, setTimeSpent] = useState(0);
//     const [timeRemaining, setTimeRemaining] = useState(0);
//     const [startDate, setStartDate] = useState(null);
//     const [startTime, setStartTime] = useState(null);
//     const [workDescription, setWorkDescription] = useState("");
//     const [isModalVisible, setIsModalVisible] = useState(false);
//
//     const handleProgressBarClick = () => {
//         setIsModalVisible(true);
//     };
//
//     const handleModalOk = () => {
//         setIsModalVisible(false);
//     };
//
//     const handleModalCancel = () => {
//         setIsModalVisible(false);
//     };
//
//     const handleTimeSpentChange = (value) => {
//         setTimeSpent(value);
//     };
//
//     const handleTimeRemainingChange = (value) => {
//         setTimeRemaining(value);
//     };
//
//     const handleOriginalEstimateTimeChange = (value) => {
//         setOriginalEstimate(value);
//     };
//     const handleDateChange = (date, dateString) => {
//         setStartDate(dateString);
//     };
//
//     const handleTimeChange = (time, timeString) => {
//         setStartTime(timeString);
//     };
//
//     const getTimePercentage = () => {
//         let totalTime;
//         if (!timeRemaining && originalEstimate) {
//             totalTime = originalEstimate;
//         } else {
//             totalTime = timeSpent + timeRemaining;
//         }
//         return Math.round((timeSpent / totalTime) * 100);
//     };
//
//     const getTimeLogged = () => {
//         const hours = Math.floor(timeSpent);
//         if (hours > 0) {
//             return `${hours}h logged`;
//         } else {
//             return "No time logged";
//         }
//     };
//
//     const getTimeRemaining = () => {
//         const hours = Math.floor(timeRemaining);
//         if (timeRemaining) {
//             return `${hours}h remaining`;
//         } else if (originalEstimate) {
//             return `${originalEstimate}h estimated`;
//         } else {
//             return "";
//         }
//     };

import React, {useState} from 'react';
import {Progress, Modal, DatePicker, TimePicker, InputNumber, Input} from 'antd';
import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {TimeTrackingContainer, ProgressBarContainer, InputHeading, ModalContent} from './styles'
import Worklog from '../Worklog/Worklog';

const TimeTracking = () => {
    const [originalEstimate, setOriginalEstimate] = useState(0);
    const [timeSpent, setTimeSpent] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [workDescription, setWorkDescription] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [worklogs, setWorklogs] = useState([]);

    const handleProgressBarClick = () => {
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        const newWorklog = {
          username: "Alice", // replace with actual username
          timeTracked: timeSpent,
          description: workDescription
        };
        setWorklogs([...worklogs, newWorklog]);
        setIsModalVisible(false);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleTimeSpentChange = (value) => {
        setTimeSpent(value);
    };

    const handleTimeRemainingChange = (value) => {
        setTimeRemaining(value);
    };

    const handleOriginalEstimateTimeChange = (value) => {
        setOriginalEstimate(value);
    };
    const handleDateChange = (date, dateString) => {
        setStartDate(dateString);
    };

    const handleTimeChange = (time, timeString) => {
        setStartTime(timeString);
    };

    const getTimePercentage = () => {
        let totalTime;
        if (!timeRemaining && originalEstimate) {
            totalTime = originalEstimate;
        } else {
            totalTime = timeSpent + timeRemaining;
        }
        return Math.round((timeSpent / totalTime) * 100);
    };

    const getTimeLogged = () => {
        const hours = Math.floor(timeSpent);
        if (hours > 0) {
            return `${hours}h logged`;
        } else {
            return "No time logged";
        }
    };

    const getTimeRemaining = () => {
        const hours = Math.floor(timeRemaining);
        if (timeRemaining) {
            return `${hours}h remaining`;
        } else if (originalEstimate) {
            return `${originalEstimate}h estimated`;
        } else {
            return "";
        }
    };


    return (
        <div>
            <TimeTrackingContainer>
                <div>
                <span style={{fontWeight: "bold", marginRight: "10px"}}>
          Original Estimate (hours):
                </span>
                    <InputNumber size={"small"} min={0} value={originalEstimate}
                                 onChange={handleOriginalEstimateTimeChange}/>
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
                    <ModalContent style={{marginTop: "20px"}}>

                        <div>
                            <InputHeading>Time spent (hours):</InputHeading>
                            <InputNumber min={0} value={timeSpent}
                                         onChange={handleTimeSpentChange}/>
                        </div>
                        <div>
                            <InputHeading>Time remaining (hours):
                            </InputHeading>
                            <InputNumber min={0} value={timeRemaining} onChange={handleTimeRemainingChange}/>
                        </div>
                        <div>
                            <InputHeading>Date:</InputHeading>
                            <DatePicker onChange={handleDateChange}/>
                        </div>
                        <div>
                            <InputHeading>Time:</InputHeading>
                            <TimePicker use12Hours format="h:mm a" defaultValue={moment()} onChange={handleTimeChange}/>
                        </div>

                    </ModalContent>
                    {timeSpent ? (
                        <div style={{marginTop: "10px", marginBottom: "10px"}}>
                            <InputHeading>Work Description:</InputHeading>
                            <ReactQuill value={workDescription} onChange={setWorkDescription}
                            />
                        </div>
                    ) : null}
                </Modal>
            </TimeTrackingContainer>
        </div>
    );
};

export default TimeTracking;