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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import UserSelectField from '../SelectFields/UserSelectField'
import GenericSelectField from '../SelectFields/GenericSelectField'
import {AiOutlineArrowDown, AiOutlineArrowUp} from 'react-icons/ai'

const users = [
    {id: 1, username: "Hashim Doe"},
    {id: 2, username: "Jane Doe"},
    {id: 3, username: "Bob Smith"},
];


const statusoptions = [
    {value: 'option1', label: 'Backlog'},
    {value: 'option2', label: 'Selected for Development', backgroundColor: "#E9494B"},
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

    const [showDescription, setShowDescription] = useState(false);
    const descriptionBoxRef = useRef(null);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleClickOutsideDescriptionBox = (event) => {
    if (descriptionBoxRef.current && !descriptionBoxRef.current.contains(event.target)) {
      setShowDescription(false);
    }
  };


    const [activeColor, setActiveColor] = useState("");


    //Time
    const [startTime, setStartTime] = useState(null);
    const handleStart = () => {
        setStartTime(new Date());
    };
    const [endTime, setEndTime] = useState(null);
    const handleEnd = () => {
        setEndTime(new Date());
    };
    const duration = startTime && endTime ? (endTime - startTime) / 1000 : 0;

    //Comments
    const [comments, setComments] = useState([]);

    // const [newComment, setNewComment] = useState('');
  //   const handleCommentSubmit = (event)=> {
  //   event.preventDefault();
  //   setComments([...comments, newComment]);
  //   setNewComment('');
  // }
  //   const handleNewCommentChange = (event) => {
  //   setNewComment(event.target.value);
  // }

        const [showEditor, setShowEditor] = useState(false);
        const [newComment, setNewComment] = useState("");
        const quillRef = useRef(null);

        const handleNewCommentChange = (event) => {
            setNewComment(event.target.value);
        };

        const handleCommentSubmit = (event) => {
            event.preventDefault();
            if (showEditor) {
                // Get the Quill editor's contents and update the state
                setNewComment(quillRef.current.root.innerHTML);
            }
            // Submit the comment to the backend
            console.log(newComment);
            // Clear the input field and close the editor
            setNewComment("");
            setShowEditor(false);
        };

        const handleInputClick = () => {
            setShowEditor(true);
        };

        const handleEditorBlur = () => {
            setShowEditor(false);
        }

    //Array of reporters
    const [reporters, setReporters] = useState([
        {id: 1, name: "Reporter 1", iconUrl: "hello"},
        {id: 2, name: "Reporter 2"},
        {id: 3, name: "Reporter 3"}
    ]);
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

    const issue = {
        "issue": {
            "id": 946320,
            "title": "Try dragging issues to different columns to transition their status.",
            "type": "story",
            "status": "backlog",
            "priority": "3",
            "listPosition": 3,
            "description": "<p>An issue's status indicates its current place in the project's workflow. Here's a list of the statuses that come with&nbsp;JIRA products, depending on what projects you've created on your site.</p><p><br></p><h3>Jira software issue statuses:</h3><p><br></p><h2><strong style=\"background-color: rgb(187, 187, 187);\"> Backlog </strong></h2><p>The issue is waiting to be picked up in a future sprint.</p><p><br></p><h2><strong style=\"background-color: rgb(187, 187, 187);\"> Selected </strong></h2><p>The issue is open and ready for the assignee to start work on it.</p><p><br></p><h2><strong style=\"color: rgb(255, 255, 255); background-color: rgb(0, 102, 204);\"> In Progress </strong></h2><p>This issue is being actively worked on at the moment by the assignee.</p><p><br></p><h2><strong style=\"color: rgb(255, 255, 255); background-color: rgb(0, 138, 0);\"> Done </strong></h2><p>Work has been finished on the issue.</p>",
            "descriptionText": "An issue's status indicates its current place in the project's workflow. Here's a list of the statuses that come with&nbsp;JIRA products, depending on what projects you've created on your site.Jira software issue statuses: Backlog The issue is waiting to be picked up in a future sprint. Selected The issue is open and ready for the assignee to start work on it. In Progress This issue is being actively worked on at the moment by the assignee. Done Work has been finished on the issue.",
            "estimate": 15,
            "timeSpent": 12,
            "timeRemaining": 23,
            "createdAt": "2023-03-30T08:35:08.630Z",
            "updatedAt": "2023-04-05T08:15:30.243Z",
            "reporterId": 349256,
            "projectId": 116173,
            "users": [],
            "comments": [{
                "id": 938810,
                "body": "In the twilight rain\nthese brilliant-hued hibiscus -\nA lovely sunset.",
                "createdAt": "2023-03-30T08:35:08.678Z",
                "updatedAt": "2023-03-30T08:35:08.678Z",
                "userId": 349257,
                "issueId": 946320,
                "user": {
                    "id": 349257,
                    "name": "Lord Gaben",
                    "email": "gaben@jira.guest",
                    "avatarUrl": "https://i.ibb.co/6RJ5hq6/gaben.jpg",
                    "createdAt": "2023-03-30T08:35:08.619Z",
                    "updatedAt": "2023-03-30T08:35:08.624Z",
                    "projectId": 116173
                }
            }],
            "userIds": []
        }
    }
    const addUser = (value) => {
        const user = {
            id: Date.now() + Math.random(),
            text: value,
            complete: false
        }

        setValues({...values, user: [...values.user, user]});
    };
    const addReporter = (reporterId) => {
        // Add the new reporter to the list of reporters
        const newReporter = {id: reporterId, name: `Reporter ${reporterId}`};
        setReporters([...reporters, newReporter]);

        // Do whatever else you need to do with the selected reporter
        console.log(`Selected reporter: ${reporterId}`);
    };
    const removeUser = (id) => {
        const tempUser = values.user?.filter(item => item.id !== id);
        setValues({...values, user: tempUser});
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
    document.addEventListener('click', handleClickOutsideDescriptionBox);
    return () => {
      document.removeEventListener('click', handleClickOutsideDescriptionBox);
    };
  }, []);

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
              <div className="cardinfo_box_custom" ref={descriptionBoxRef} onClick={toggleDescription} >
                <div className="cardinfo_box_title">
                  <List />
                  Card Description
                </div>
                {showDescription ? (
                  <ReactQuill
                    theme="snow"
                    className="quill_modal_title_styling"
                    defaultValue={values.desc}
                    placeholder="Enter New Description"
                    onTextChange={(newDesc) => setValues({ ...values, desc: newDesc })}
                  />
                ) : (
                  <div className="description_text" onClick={toggleDescription}>
                    {values.desc}
                  </div>
                )}
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
                    <div className="task_lists">
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
              <div className="cardinfo_box" style={{marginTop: "15px"}}>
                  <div className="cardinfo_box_title">
                      <Type/>
                      Comments
                  </div>
                  <form onSubmit={handleCommentSubmit} className="form-container">
      {showEditor ? (
        <div onBlur={handleEditorBlur}>
          <div ref={quillRef} />
            <ReactQuill/>
        </div>
      ) : (
        <input
          type="text"
          placeholder="Leave a comment"
          value={newComment}
          onChange={handleNewCommentChange}
          className="comment-input"
          onClick={handleInputClick}
        />
      )}
      {showEditor && (
        <button type="submit" className="comment-button">
          Send
        </button>
      )}
    </form>
                  <ul>
                      {comments.map((comment, index) => (
                          <li key={index}>
                              <div className="comment-container">
                                  <div className="avatar"></div>
                                  <div className="comment-info">
                                      <p className="comment-author">User {index + 1}</p>
                                      <p className="comment-text">{comment}</p>
                                  </div>
                              </div>
                          </li>
                      ))}
                  </ul>
              </div>
            </div>
            <div className="right-section" style={{width: "35%", float: "right"}}>
                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        Status
                    </div>
                    <div className="task_list">
                        <GenericSelectField options={statusoptions} isMultiple={false} placeholder={"Unassigned"}
                                            defaultValue={"Backlog"}/>
                    </div>

                </div>
                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <Users/>
                        Assignees
                    </div>
                    <div className="task_list">
                        <UserSelectField users={users} isMultiple={true} placeholder={"Unassigned"}/>
                    </div>
                </div>
                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <User/>
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
                        Priority

                    </div>
                    <div className="task_list">
                        <GenericSelectField options={priorityoptions} isMultiple={false} placeholder={"Unassigned"}/>
                    </div>

                </div>

                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <Clock/>
                        Time Tracking
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CardInfo