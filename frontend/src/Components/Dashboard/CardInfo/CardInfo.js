import React, { useEffect, useState } from "react";
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
import Chip from "../Chip/Chip";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function CardInfo(props) {

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
    const [newComment, setNewComment] = useState('');
    const handleCommentSubmit = (event)=> {
    event.preventDefault();
    setComments([...comments, newComment]);
    setNewComment('');
  }
    const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  }

    //Array of reporters
    const [reporters, setReporters] = useState([
    { id: 1, name: "Reporter 1" },
    { id: 2, name: "Reporter 2" },
    { id: 3, name: "Reporter 3" }
]);
    const [selectedReporter, setSelectedReporter] = useState(null);

    // State to hold the card information
    const [values, setValues] = useState({ ...props.card, user: [] });

    // For calculating tasks status bar
    const calculatePercent=()=> {
        if (values.tasks?.length === 0) return "0"
        const completed = values.tasks?.filter(item => item.complete)?.length
        return (completed / values.tasks?.length) * 100 + ""
    };

    const addLabel = (value, color) => {
        const index = values.labels?.findIndex(item=>item.text===value)
        if (index > -1) return;

        const label = {
            text: value,
            color,
        };
        setValues({...values, labels: [...values.labels, label]});
        setActiveColor("")
    };
    const removeLabel = (text) => {
        const tempLabels = values.labels?.filter((item) => item.text !== text);

        setValues({...values, labels: tempLabels });
    };

    const addTask=(value)=> {
        const task={
            id:Date.now() + Math.random(),
            text:value,
            complete:false
        }

        setValues({...values, tasks: [...values.tasks, task]});
    };
    const removeTask = (id) =>{
        const tempTasks = values.tasks?.filter(item => item.id !== id);
        setValues({...values, tasks: tempTasks });
    };
    const updateTask = (id, complete) => {
        const index = values.tasks?.findIndex((item) => item.id === id);
        if (index <0 ) return;

        const tempTasks = [...values.tasks];
        tempTasks[index].complete=complete;
        setValues({...values, tasks:tempTasks});
    };

    const addUser=(value)=> {
        const user={
            id:Date.now() + Math.random(),
            text:value,
            complete:false
        }

        setValues({...values, user: [...values.user, user]});
    };
    const addReporter = (reporterId) => {
    // Add the new reporter to the list of reporters
    const newReporter = { id: reporterId, name: `Reporter ${reporterId}` };
    setReporters([...reporters, newReporter]);

    // Do whatever else you need to do with the selected reporter
    console.log(`Selected reporter: ${reporterId}`);
};
    const removeUser = (id) =>{
        const tempUser = values.user?.filter(item => item.id !== id);
        setValues({...values, user: tempUser });
    };

    useEffect(()=>{
        props.updateCard(props.card.id, props.boardId, values)
    },[values])

    return (
      <Modal onClose={()=>props.onClose()} >
          <div className="left-section" style={{ width: "55%" }}>
                <div className="modal_title_styling">
                    <Editable
                        text={values.title}
                        default={values.title}
                        placeholder={"Enter Title"}
                        buttonText="Set Title"
                        onSubmit={(value)=>setValues({...values,title:value})}
                    />
                </div>

                <div className="cardinfo_box_custom">
                    <div className="cardinfo_box_title">
                        <List />
                        Card Description
                    </div>
                   <ReactQuill
                      theme="snow"
                      className="quill_modal_title_styling"
                      defaultValue={values.desc}
                      placeholder="Enter New Description"
                      onTextChange={(newDesc) => setValues({ ...values, desc: newDesc })}
                    />

                    <div className="cardinfo_box_custom">
                        <div className="cardinfo_box_title">
                            <File />
                            File Attachments
                        </div>
                    <FileUpload />
                    </div>
                </div>
                  <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <CheckSquare />
                        Tasks
                    </div>
                    <div className="task_progress-bar">
                        <div className="task_progress" style={{ width: calculatePercent()+"%" }} />
                    </div>
                    <div className="task_list">
                        {values.tasks?.map((item)=>(
                            <div key={item.id} className="task">
                                <input type="checkbox"
                                       defaultChecked={item.complete}
                                       onChange={(event) =>
                                        updateTask(item.id, event.target.checked)}
                                />
                                <p>{item.text}</p>
                                    <Trash onClick={()=>removeTask(item.id)}/>
                            </div>
                        ))}
                    </div>
                    <div className="modal_title_styling">
                        <Editable
                            text={"Add New Task"}
                            placeholder={"Enter New Task"}
                            buttonText="Save Task"
                            onSubmit={(value)=>addTask(value)}

                        />
                    </div>
                </div>

              <div className="cardinfo_box" style={{marginTop: "15px"}}>
                  <div className="cardinfo_box_title">
                      <Type/>
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
          <div className="right-section" style={{ width: "35%", float:"right" }}>
            <div className="cardinfo_box">
                <div className="cardinfo_box_title">
                    <Clock />
                    Timer
                </div>
                <div>
                    <p style={{fontSize: "12px"}}>Please start and end timer before and after your work.</p>
                    <button className="timer_button" style={{ backgroundColor: "Green" }} onClick={handleStart}>Start</button>
                    <button className="timer_button" style={{ backgroundColor: "Red" }} onClick={handleEnd}>End</button>
                        {startTime && endTime && (
                        <p>Duration: {duration/60} Minutes</p>
                    )}
                </div>
            </div>

            <div className="cardinfo_box" style={{paddingTop: "10px", paddingBottom: "30px"}}>
                <div className="cardinfo_box_title">
                    <Calendar />
                    Date
                </div>

                <div className="modal_title_styling">
                    <input type = "date" defaultValue={values.date ? new Date(values.date).toISOString().substring(0,10): ""}
                        onChange={(event) =>
                        setValues({...values, date: event.target.value})}
                    />
                </div>
            </div>

            <div className="cardinfo_box">
                <div className="cardinfo_box_title">
                    <Tag />
                    Label
                </div>
                <div className="cardinfo_box_labels">
                  {
                      values.labels?.map((item,index) => (
                          <Chip close
                                onClose={()=> removeLabel(item.text)}
                                key={item.text+index}
                                text={item.text}
                                color={item.color}
                          />
                      ))}
                </div>
            </div>

            <div className="cardinfo_box">
                <div className="cardinfo_box_title">
                    <Users />
                    Assignee
                </div>
                <div className="task_list">
                    {values.user?.map((item) => (
                        <div key={item.id} className="task">
                            <p>{item.text}</p>
                            <p>{item.picture}</p>
                            <Trash onClick={()=>removeUser(item.id)}/>
                        </div>

                    ))}
                </div>

                <div className="modal_title_styling">
                    <Editable
                        text={"Add New User"}
                        placeholder={"Enter New User"}
                        buttonText="Save User"
                        onSubmit={(value) => addUser(value)}
                    />
                </div>
            </div>
            <div className="cardinfo_box">
                <div className="cardinfo_box_title">
                    <User />
                    Reporter
                </div>

                <div className="task_list">
                    {values.reporter?.map((item) => (
                        <div key={item.id} className="task">
                            <p>{item.text}</p>
                            <p>{item.picture}</p>
                        </div>
                    ))}
                </div>

                <div className="modal_title_stylings">
                    <select
                        value={selectedReporter}
                        onChange={(e) => setSelectedReporter(e.target.value)}>
                        <option value="">Select a reporter</option>
                        {reporters.map((reporter) => (
                            <option key={reporter.id} value={reporter.id}>
                                {reporter.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={() => addReporter(selectedReporter)}>Save Reporter</button>
                </div>
            </div>
          </div>
      </Modal>
  )
}

export default CardInfo