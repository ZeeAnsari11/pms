import React, {useEffect, useRef, useState} from "react";
import Modal from "../Modal/Modal";
import FileUpload from "../FileAttachement/FileUpload";
import "./CardInfo.css";
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
import {FiUser,FiUsers} from 'react-icons/fi'
import {CgOptions} from 'react-icons/cg'
import {RxStopwatch} from 'react-icons/rx'

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

    useEffect(()=>{
        props.updateCard(props.card.id, props.boardId, values)
    }, [values])

    return (
      <Modal onClose={()=>props.onClose()} >
          <div className="left-section" style={{ width: "55%" }}>
      <div className="modal-header">
        <span className="card-id"><b>Card ID: {props.card.id}</b></span>
      </div>
                <div className="modal_title_styling my-editable">
                    <Editable
                        text={values.title}
                        default={values.title}
                        placeholder={"Enter Title"}
                        buttonText="Set Title"
                        onSubmit={(value) => setValues({...values, title: value})}
                        style={{ backgroundColor: "none" }}
                    />
                </div>
            <div>
              <div className="cardinfo_box_custom">
                <div className="cardinfo_box_title">
                  <List />
                  Card Description
                </div>
                  <Description initialValue={values.desc} onSave={handleDescChange} />
              </div>
                    <div className="cardinfo_box_custom">
                        <div className="cardinfo_box_title">
                            <File/>
                            File Attachments
                        </div>
                        <FileUpload/>
                    </div>
                </div>
                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <CheckSquare/>
                        Tasks
                    </div>
                    <div className="task_list">
                        {values.tasks?.map((item) => (
                            <div key={item.id} className="task">
                                <input type="checkbox"
                                       defaultChecked={item.complete}
                                       onChange={(event) =>
                                           updateTask(item.id, event.target.checked)}
                                />
                                <p>{item.text}</p>
                                <Trash onClick={() => removeTask(item.id)}/>
                            </div>
                        ))}
                    </div>
                    <div className="modal_title_styling">
                        <Editable
                            text={"Add New Task"}
                            placeholder={"Enter New Task"}
                            buttonText="Save Task"
                            onSubmit={(value) => addTask(value)}

                        />
                    </div>
                </div>
                  <div className="cardinfo_box" style={{ marginTop: '15px' }}>
                  <div className="cardinfo_box_title">
                    <Type />
                    Comments
                  </div>
                  <form onSubmit={handleCommentSubmit} className="form-container">
                    <input
                      type="text"
                      placeholder="Leave a comment"
                      value={newComment}
                      onChange={handleNewCommentChange}
                      className="comment-input"
                    />
                    <button type="submit" className="comment-button">
                      Send
                    </button>
                  </form>
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
                </div>
            </div>
            <div className="right-section" style={{width: "35%", float: "right"}}>

                <div className="cardinfo_close">
                    <div className="cardinfo_box_close">
                        <AiFillCloseCircle
                            size={30}
                            onClick={props.onClose}
                            style={{cursor: "pointer"}}
                        />
                    </div>
                </div>
                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <TbStatusChange/>
                        Status
                    </div>
                    <div className="task_list">
                        <GenericSelectField
                            options={statusoptions}
                            isMultiple={false}
                            placeholder={"Unassigned"}
                            defaultValue={"Backlog"}/>
                    </div>

                </div>
                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <FiUsers />
                        Assignees
                    </div>
                    <div className="task_list">
                        <UserSelectField users={users} isMultiple={true} placeholder={"Unassigned"}/>
                    </div>
                </div>
                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <FiUser />
                        Reporter
                    </div>
                    <UserSelectField users={users} isMultiple={false} placeholder={"Unassigned"}/>
                    <div className="task_list">
                        {values.reporter?.map((item) => (
                            <div key={item.id} className="task">
                                <p>{item.text}</p>
                                <p>{item.picture}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <CgOptions />
                        Priority

                    </div>
                    <div className="task_list">
                        <GenericSelectField options={priorityoptions} isMultiple={false} placeholder={"Unassigned"}/>
                    </div>

                </div>

                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <RxStopwatch />
                        Time Tracking
                    </div>
                    <div>
                        <TrackingField/>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CardInfo