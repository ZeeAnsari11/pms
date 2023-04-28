import React, {useEffect, useRef, useState} from "react";
import Modal from "../Modal/Modal";
import FileUpload from "../FileAttachement/FileUpload";
import {
    Calendar,
    CheckSquare, Clock, File,
    List,
    Tag,
    Trash,
    Type,
    User,
    Users,
} from "react-feather";
import Editable from "../Editable/Editable";
import Description from "../TextEditor/TextEditor"
import Comment from "../Comment/Comment"
import Worklog from "../Worklog/Worklog";

import 'react-quill/dist/quill.snow.css';
import UserSelectField from '../SelectFields/UserSelectField'
import GenericSelectField from '../SelectFields/GenericSelectField'
import TrackingField from '../TimeTracking/index'
import {AiOutlineArrowDown, AiOutlineArrowUp, AiFillCloseCircle} from 'react-icons/ai'
import {TbStatusChange} from 'react-icons/tb'
import {FiUser, FiUsers} from 'react-icons/fi'
import {CgOptions} from 'react-icons/cg'
import {RxStopwatch} from 'react-icons/rx'
import styled from 'styled-components';

const ModalTitleStyling = styled.div`
  width: 100%;
`;

const CardInfoBoxCustom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 25px;
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

const TaskList = styled.div`
  margin: 8px 0 25px;
`;


const ModalTitle = styled.div`
  width: fit-content;
`;

const Task = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
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


const CardInfoClose = styled.div`
  gap: 10px;
  padding-bottom: 50px;
`;

const CardInfoBoxClose = styled.div`
  float: right;
`;


const users = [
    {id: 1, username: "Hashim Doe"},
    {id: 2, username: "Jane Doe"},
    {id: 3, username: "Bob Smith"},
];


const statusoptions = [
    {value: 'option1', label: 'Backlog'},
    {value: 'option2', label: 'Selected for Development'},
    {value: 'option3', label: 'In Progress'},
    {value: 'option4', label: 'Done'},
];

const priorityoptions = [
    {value: 'High', label: 'High', icon: <AiOutlineArrowUp color={"#E9494B"}/>},
    {value: 'Highest', label: 'Highest', icon: <AiOutlineArrowUp color={"#CD1317"}/>},
    {value: 'Medium', label: 'Medium', icon: <AiOutlineArrowUp color={"#E97F33"}/>},
    {value: 'Low', label: 'Low', icon: <AiOutlineArrowDown color={"#2E8738"}/>},
    {value: 'Lowest', label: 'Lowest', icon: <AiOutlineArrowDown color={"#57A55A"}/>}
];

function CardInfo(props) {

    const initialworklogs = [
        {username: 'John', timeTracked: '2', description: 'Worklog 1'},
        {username: 'Jane', timeTracked: '3', description: 'Worklog 2'},
        {username: 'Bob', timeTracked: '1', description: 'Worklog 3'},
    ];

    const handleWorklogDelete = (index) => {
        const newWorklogs = [...worklogs];
        newWorklogs.splice(index, 1);
        setWorklogs(newWorklogs);
    };

    const handleWorklogEdit = (index) => {
    };


    //Comments
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [selectedComment, setSelectedComment] = useState(null);
    const [showComments, setShowComments] = useState(true);
    const [worklogs, setWorklogs] = useState(initialworklogs);
    const [showWorklog, setShowWorklog] = useState(false);
    const [selectedWorklog, setSelectedWorklog] = useState(null);


    const handleCommentSubmit = (event) => {
        event.preventDefault();
        setComments([...comments, newComment]);
        setNewComment('');
    };

    const handleNewCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentDelete = (index) => {
        setComments(comments.filter((_, i) => i !== index));
    };

    const handleCommentEdit = (index, comment) => {
        if (selectedComment === null) {
            setSelectedComment(index);
        } else if (selectedComment === index) {
            setSelectedComment(null);
            setComments(
                comments.map((c, i) => (i === index ? comment : c))
            );
        }
    };


//Description
    const [desc, setDesc] = useState('initial value');
    const handleDescChange = (newDesc) => {
        setDesc(newDesc);
    };

    const [showDescription, setShowDescription] = useState(false);
    const descriptionBoxRef = useRef(null);

    // State to hold the card information
    const [values, setValues] = useState({...props.card, user: []});

    const addTask = (value) => {
        const task = {
            id: Date.now() + Math.random(),
            text: value,
            complete: false
        }

        setValues({...values, tasks: [...values.tasks, task]});
    };
    const removeTask = (id) => {
        const tempTasks = values.tasks?.filter(item => item.id !== id);
        setValues({...values, tasks: tempTasks});
    };
    const updateTask = (id, complete) => {
        const index = values.tasks?.findIndex((item) => item.id === id);
        if (index < 0) return;

        const tempTasks = [...values.tasks];
        tempTasks[index].complete = complete;
        setValues({...values, tasks: tempTasks});
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (descriptionBoxRef.current && !descriptionBoxRef.current.contains(event.target)) {
                setShowDescription(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [descriptionBoxRef]);

    useEffect(() => {
        props.updateCard(props.card.id, props.boardId, values)
    }, [values])

    return (
        <Modal onClose={() => props.onClose()}>
            <div style={{width: "55%"}}>
                <div className="modal-header">
                    <span className="card-id"><b>Card ID: {props.card.id}</b></span>
                </div>
                <ModalTitleStyling>
                    <Editable
                        text={values.title}
                        default={values.title}
                        placeholder={"Enter Title"}
                        fontWeight={"bold"}
                        buttonText="Set Title"
                        onSubmit={(value) => setValues({...values, title: value})}
                        bold={props.bold}
                    />
                </ModalTitleStyling>
                <div>
                    <CardInfoBoxCustom>
                        <CardInfoBoxTitle>
                            <List/>
                            Card Description
                        </CardInfoBoxTitle>
                        <Description initialValue={values.desc} onSave={handleDescChange}/>
                    </CardInfoBoxCustom>
                    <CardInfoBoxCustom>
                        <CardInfoBoxTitle>
                            <File/>
                            File Attachments
                        </CardInfoBoxTitle>
                        <FileUpload/>
                    </CardInfoBoxCustom>
                </div>
                <CardInfoBox>
                    <CardInfoBoxTitle>
                        <CheckSquare/>
                        Tasks
                    </CardInfoBoxTitle>
                    <TaskList>
                        {values.tasks?.map((item) => (
                            <Task key={item.id}>
                                <input type="checkbox"
                                       defaultChecked={item.complete}
                                       onChange={(event) =>
                                           updateTask(item.id, event.target.checked)}
                                />
                                <p>{item.text}</p>
                                <Trash onClick={() => removeTask(item.id)}/>
                            </Task>
                        ))}
                    </TaskList>
                    <ModalTitle>
                        <Editable
                            text={"Add New Task"}
                            placeholder={"Enter New Task"}
                            buttonText="Save Task"
                            fontWeight={"bold"}
                            hoverBackgroundColor={"#EBECF0"}
                            onSubmit={(value) => addTask(value)}
                        />
                    </ModalTitle>
                </CardInfoBox>
                <CardInfoBox style={{marginTop: '15px'}}>

                    <>
                        <CardInfoBoxCustom>
                            <CardInfoBoxTitle>Activity</CardInfoBoxTitle>
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
                                <CardInfoBoxTitle>Comments</CardInfoBoxTitle>
                                <FormContainer onSubmit={handleCommentSubmit}>
                                    <CommentInput
                                        type="text"
                                        placeholder="Leave a comment"
                                        value={newComment}
                                        onChange={handleNewCommentChange}
                                    />
                                    <CommentButton type="submit">Send</CommentButton>
                                </FormContainer>
                                <ul>
                                    {comments.map((comment, index) => (
                                        <Comment
                                            key={index}
                                            comment={comment}
                                            index={index}
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
                                <CardInfoBoxTitle>Worklog</CardInfoBoxTitle>
                                <ul style={{marginTop: "-30px"}}>
                                    {worklogs.map((worklog, index) => (
                                        <Worklog
                                            key={index}
                                            index={index}
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
            </div>
            <div style={{width: "35%", float: "right"}}>

                <CardInfoClose>
                    <CardInfoBoxClose>
                        <AiFillCloseCircle
                            size={30}
                            onClick={props.onClose}
                            style={{cursor: "pointer"}}
                        />
                    </CardInfoBoxClose>
                </CardInfoClose>
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
                        <FiUsers/>
                        Assignees
                    </CardInfoBoxTitle>
                    <TaskList>
                        <UserSelectField users={users} isMultiple={true} placeholder={"Unassigned"}/>
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

                <CardInfoBox>
                    <CardInfoBoxTitle>
                        <CgOptions/>
                        Priority

                    </CardInfoBoxTitle>
                    <TaskList>
                        <GenericSelectField options={priorityoptions} isMultiple={false} placeholder={"Unassigned"}/>
                    </TaskList>
                </CardInfoBox>

                <CardInfoBox>
                    <CardInfoBoxTitle>
                        <RxStopwatch/>
                        Time Tracking
                    </CardInfoBoxTitle>
                    <div>
                        <TrackingField/>
                    </div>
                </CardInfoBox>
            </div>
        </Modal>
    )
}

export default CardInfo