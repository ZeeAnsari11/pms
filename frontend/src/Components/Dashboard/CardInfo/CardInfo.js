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
  padding-top: 30px;
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
  padding-bottom: 20px;
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

const CommentInput = styled.input`
  flex: 1;
  margin-right: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const CommentButton = styled.button`
  padding: 8px 12px;
  background-color: #0052cc;
  color: #fff;
  border: none;
  border-radius: 3px;
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

    //Comments
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [selectedComment, setSelectedComment] = useState(null);

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
                        style={{backgroundColor: "none"}}
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
                    <diCardInfoBoxTitlev>
                        <Type/>
                        Comments
                    </diCardInfoBoxTitlev>
                    <FormContainer onSubmit={handleCommentSubmit}>
                        <CommentInput
                            type="text"
                            placeholder="Leave a comment"
                            value={newComment}
                            onChange={handleNewCommentChange}
                        />
                        <CommentButton type="submit">
                            Send
                        </CommentButton>
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