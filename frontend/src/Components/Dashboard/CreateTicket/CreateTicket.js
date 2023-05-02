import React, {useState} from "react";
import styled from "styled-components";
import {AiFillCloseCircle} from "react-icons/ai";
import {TbStatusChange} from "react-icons/tb";
import GenericSelectField from "../SelectFields/GenericSelectField";
import ReactQuill from "react-quill";
import {FiUser, FiUsers} from "react-icons/fi";
import UserSelectField from "../SelectFields/UserSelectField";
import {File} from "react-feather";
import FileUpload from "../FileAttachement/FileUpload";
import {DatePicker, TimePicker} from 'antd'
import moment from "moment/moment";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Projects = [
    {value: 'option1', label: 'New Project (NP)'},
    {value: 'option2', label: 'ProjeX'},
    {value: 'option3', label: 'TCS'},
    {value: 'option4', label: 'CBDMD'},
];

const statusoptions = [
    {value: 'option1', label: 'Backlog'},
    {value: 'option2', label: 'Selected for Development'},
    {value: 'option3', label: 'In Progress'},
    {value: 'option4', label: 'Done'},
];

const Issue = [
    {value: 'option1', label: 'Task'},
    {value: 'option2', label: 'Epic'},
];

const users = [
    {id: 1, username: "Hashim Doe"},
    {id: 2, username: "Jane Doe"},
    {id: 3, username: "Bob Smith"},
];

const label = [
    {value: 'option1', label: 'QA'},
    {value: 'option2', label: 'Development'},
];

const LinkedIssue1 = [
    {value: 'option1', label: 'blocks'},
    {value: 'option2', label: 'is blocked by'},
    {value: 'option3', label: 'clones'},
    {value: 'option4', label: 'is cloned by'},
    {value: 'option5', label: 'duplicates'},
    {value: 'option6', label: 'is duplicated by'},
    {value: 'option7', label: 'relates to'},

];

const LinkedIssue2 = [
    {value: 'option1', label: 'NP-2'},
    {value: 'option2', label: 'NP-1'},
    {value: 'option3', label: 'Np-3'},
];


const CardInfoBoxClose = styled.div`
  float: right;
  margin-top: -15px;
  margin-right: -15px;
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
  padding: 24px;
  overflow: auto;
  max-height: 75vh;
  width: 60%;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  margin: 0 0 18px 0;
`;

const ModalContent = styled.div`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 16px;
`;

const ModalButton = styled.button`
  background-color: #0077ff;
  color: white;
  font-size: 16px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0066cc;
  }

  &:focus {
    outline: none;
  }
`;

const CardInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 60%;
  //padding-bottom: 5px;
`;

const CardInfoBoxTitle = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
`;

const TaskList = styled.div`
  margin: 8px 0 15px;
`;

const Divider = styled.div`
  border-bottom: 1px solid #ccc;
`;

const SummaryInput = styled.input`
  font-size: 16px;
  padding: 8px;
  border-radius: 4px;
  border: 2px solid #ccc;
  margin-bottom: 16px;
  width: 96%;
  background: rgb(242 242 242);
`;

const TimeInput = styled.input`
  font-size: 16px;
  padding: 8px;
  border-radius: 4px;
  border: 2px solid #ccc;
  margin-bottom: 16px;
  width: 30%;
  background: rgb(242 242 242);
`;

const TimeTrackingField = styled.div`
  display: flex;
  align-items: center;
`;

const DateInput = styled.input`
  width: 80px;
  height: 20px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
  font-size: 14px;
`;

const TimeTrackingInput = styled.input`
  width: 60px;
  height: 20px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 0 4px 4px 0;
  font-size: 14px;
`;

const TimeTrackingLabel = styled.label`
  margin-right: 8px;
  font-size: 14px;
`;

const Task = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const CardInfoBoxCustom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 25px;
  padding-top: 30px;
`;


const MyModalComponent = ({onClose}) => {
    const [summary, setSummary] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState('');
    const [values, setValues] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const handleSummaryChange = (event) => {
        setSummary(event.target.value);
    };
    const handleDescriptionChange = (value) => {
        setDescription(value);
    }

    const handleDateChange = (date, dateString) => {
        setStartDate(dateString);
    };

    const handleTimeChange = (time, timeString) => {
        setStartTime(timeString);
    };

    return (

        <ModalOverlay>
            <ModalContainer>
                <CardInfoBoxClose>
                    <AiFillCloseCircle
                        size={30}
                        onClick={onClose}
                        style={{cursor: "pointer"}}
                    />
                </CardInfoBoxClose>
                <ModalTitle>Create Issue</ModalTitle>
                <ModalContent>

                    <CardInfoBox>
                        <CardInfoBoxTitle>
                            <TbStatusChange/>
                            Project
                        </CardInfoBoxTitle>
                        <TaskList>
                            <GenericSelectField
                                options={Projects}
                                isMultiple={false}
                                placeholder={"Unassigned"}
                                defaultValue={"New Project"}/>
                        </TaskList>
                    </CardInfoBox>

                    <CardInfoBox>
                        <CardInfoBoxTitle>
                            <TbStatusChange/>
                            Issue Type
                        </CardInfoBoxTitle>
                        <TaskList>
                            <GenericSelectField
                                options={Issue}
                                isMultiple={false}
                                placeholder={"Unassigned"}
                                defaultValue={"Task"}/>
                        </TaskList>
                    </CardInfoBox>
                    <Divider/>

                    <CardInfoBox>
                        <CardInfoBoxTitle>
                            <TbStatusChange/>
                            Status
                        </CardInfoBoxTitle>
                        <TaskList>
                            <GenericSelectField
                                options={statusoptions}
                                isMultiple={false}
                                placeholder={"Unassigned"}
                                defaultValue={"Backlog"}/>
                        </TaskList>
                    </CardInfoBox>

                    <CardInfoBox>
                        <CardInfoBoxTitle>
                            <TbStatusChange/>
                            Summary
                        </CardInfoBoxTitle>
                        <TaskList>
                            <SummaryInput
                                type="text"
                                value={summary}
                                onChange={handleSummaryChange}
                            />
                        </TaskList>
                    </CardInfoBox>

                    <CardInfoBox>
                        <CardInfoBoxTitle>
                            <TbStatusChange/>
                            Description
                        </CardInfoBoxTitle>
                        <TaskList>
                            <ReactQuill value={description} onChange={handleDescriptionChange}/>
                        </TaskList>
                    </CardInfoBox>

                    <CardInfoBox>
                        <CardInfoBoxTitle>
                            <TbStatusChange/>
                            Original Estimate
                        </CardInfoBoxTitle>
                        <TaskList>
                            <TimeInput
                                type="text"
                                value={time}
                                onChange={handleTimeChange}
                                placeholder="Enter Estimation in hours"
                            />
                            <p>An estimate of how much work remains until this issue will be resolved.</p>
                        </TaskList>
                    </CardInfoBox>

                    <CardInfoBox>
                        <CardInfoBoxTitle>
                            <FiUsers/>
                            Assignees
                        </CardInfoBoxTitle>
                        <TaskList>
                            <UserSelectField users={users} isMultiple={true} placeholder={"Unassigned"}/>
                        </TaskList>
                    </CardInfoBox>

                    <CardInfoBox>
                        <CardInfoBoxTitle>
                            <FiUsers/>
                            Time Tracking
                        </CardInfoBoxTitle>
                        <TaskList>
                            <TimeTrackingField>
                                <TimeTrackingLabel>Original Estimate</TimeTrackingLabel>
                                <DatePicker onChange={handleDateChange}/>
                                <TimePicker style={{marginLeft:"10px"}} use12Hours format="h:mm a" defaultValue={moment()}
                                            onChange={handleTimeChange}/>
                            </TimeTrackingField>
                        </TaskList>
                    </CardInfoBox>

                    <CardInfoBox>
                        <CardInfoBoxTitle>
                            <FiUsers/>
                            Labels
                        </CardInfoBoxTitle>
                        <TaskList>
                            <GenericSelectField
                                options={label}
                                isMultiple={true}
                                placeholder={" "}/>
                        </TaskList>
                    </CardInfoBox>

                    <CardInfoBox>
                        <CardInfoBoxTitle>
                            <FiUser/>
                            Reporter
                        </CardInfoBoxTitle>
                        <UserSelectField users={users} isMultiple={false} placeholder={"Unassigned"}/>
                        <TaskList>
                            {values.reporter?.map((item) => (
                                <Task key={item.id}>
                                    <p>{item.text}</p>
                                    <p>{item.picture}</p>
                                </Task>
                            ))}
                        </TaskList>
                    </CardInfoBox>

                    <CardInfoBoxCustom>
                        <CardInfoBoxTitle>
                            <File/>
                            File Attachments
                        </CardInfoBoxTitle>
                        <FileUpload/>
                    </CardInfoBoxCustom>

                    <CardInfoBox>
                        <CardInfoBoxTitle>
                            <TbStatusChange/>
                            Linked Issues
                        </CardInfoBoxTitle>
                        <TaskList>
                            <GenericSelectField
                                options={LinkedIssue1}
                                isMultiple={false}
                                defaultValue={"blocks"}/>
                        </TaskList>
                        <TaskList>
                            <GenericSelectField
                                options={LinkedIssue2}
                                isMultiple={true}
                                placeholder={"Select Issue"}/>
                        </TaskList>
                    </CardInfoBox>


                </ModalContent>
                <ModalButton onClick={onClose}>Close</ModalButton>
            </ModalContainer>
        </ModalOverlay>
    )
};

export default MyModalComponent;
