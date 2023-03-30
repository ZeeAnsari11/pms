import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import "./CardInfo.css";
import {
    Book,
    Calendar,
    CheckSquare,
    List,
    Tag,
    Trash,
    Type,
    User,
    Users,
} from "react-feather";
import Editable from "../Editable/Editable";
import Chip from "../Chip/Chip";
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function CardInfo(props) {
  // Array of colors for labels
  const colors = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
  ];

  //Timer

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


  // State to track the currently selected color
  const [activeColor, setActiveColor] = useState("");

  // State to hold the card information
  const [values, setValues] = useState({ ...props.card, user: [] });

  // State to hold the uploaded file
  const [file, setFile] = useState();

  // Handler for file upload
  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const url = "http://localhost:3000/uploadFile";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });
  };

//


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
        <div className="cardinfo">
            <div className="cardinfo_box">
                <div className="cardinfo_box_title">
                    <Type />
                    Card Title
                </div>
                <div className="modal_title_styling">
                <Editable
                    text={values.title}
                    default={values.title}
                    placeholder={"Enter Title"}
                    buttonText="Set Title"
                    onSubmit={(value)=>setValues({...values,title:value})}
                />
                </div>
            </div>

            <div className="cardinfo_box">
            <div>
              <button onClick={handleStart}>Start</button>
              <button onClick={handleEnd}>End</button>
              {startTime && endTime && (
                <p>Duration: {duration} seconds</p>
              )}
            </div>
            </div>

          <div className="cardinfo_box">
                <div className="cardinfo_box_title">
                    <List />
                    Card Description
                </div>

                <div className="modal_title_styling">
                <ReactQuill theme="snow"
                   className="modal_title_styling"
                   defaultValue={values.desc}
                   placeholder="Enter New Description"
                   onChange={(event)=>setValues({...values, desc:event.target.value})}
                />
                </div>
               <div className="App">
                <form>
                  {/*<h1>React File Upload</h1>*/}
                  <input type="file" />
                  <button type="submit">Upload</button>
                </form>
            </div>
          </div>

            <div className="cardinfo_box">
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
                <div className="label_colors">
                    {colors.map((item, index) => (
                        <li
                            key={index} style={{backgroundColor:item}}
                            className={item === activeColor ? "active" : ""}
                            onClick = {() => setActiveColor(item)}
                        />
                        ))}
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
                <div className="modal_title_styling">
                <Editable
                    text={"New Label"}
                    placeholder={"Enter Label Name"}
                    buttonText="Set Label"
                    onSubmit={(value)=>addLabel(value,activeColor)}
                />
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
                                    updateTask(item.id, event.target.checked)
                            }
                            />
                            <p>{item.text}</p>
                            <Trash onClick={()=>removeTask(item.id)}/>
                        </div>
                    )
                    )
                    }
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

            <div className="modal_title_styling">
                <select
                    value={selectedReporter}
                    onChange={(e) => setSelectedReporter(e.target.value)}
                >
                    <option value="">Select a reporter</option>
                    {reporters.map((reporter) => (
                        <option key={reporter.id} value={reporter.id}>
                            {reporter.name}
                        </option>
                    ))}
                </select>
                <button onClick={() => addReporter(selectedReporter)}>Save Reporter</button>
            </div>


                <div className="cardinfo_box" style={{ marginTop: "50px" }}>
                <div className="cardinfo_box_title">
                    <Type />
                    Comments
                </div>
                  <ul>
                    {comments.map((comment, index) => (
                      <li key={index}>{comment}</li>
                    ))}
                  </ul>
                  <form onSubmit={handleCommentSubmit}>
                    <input
                      type="text"
                      placeholder="Leave a comment"
                      value={newComment}
                      onChange={handleNewCommentChange}
                    />
                    <button type="submit">Send</button>
                  </form>
                </div>
        </div>
        </div>
      </Modal>
  )
}

export default CardInfo