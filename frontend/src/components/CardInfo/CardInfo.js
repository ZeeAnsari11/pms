import React, { useState } from 'react'
import Modal from "../Modal/Modal";
import "./CardInfo.css";
import {Calendar, CheckSquare, List, Tag, Trash, Type} from "react-feather";
import Editable from "../Editable/Editable";

function CardInfo(props) {
    const colors = [
        "#a8193d",
        "#4fcc25",
        "#1ebffa",
        "#8da377",
        "#9975bd",
        "#cf61a1",
        "#240959",
];
    const [activeColor, setActiveColor]= useState("");
    return (
      <Modal onClose={()=>props.onClose()} >
        <div className="cardinfo">
            <div className="cardinfo_box">
                <div className="cardinfo_box_title">
                    <Type />
                    Card Title
                </div>
                <div className="modal_title_styling">
                <Editable text={"Title"} placeholder={"Enter Title"}
                buttonText="Set Title"/>
                </div>
            </div>

          <div className="cardinfo_box">
                <div className="cardinfo_box_title">
                    <List />
                    Card Description
                </div>
                <div className="modal_title_styling">
                <Editable text={"Your Description"} placeholder={"Enter New Description"}
                buttonText="Set Description"/>
                </div>
          </div>

            <div className="cardinfo_box">
                <div className="cardinfo_box_title">
                    <Calendar />
                    Date
                </div>
                <div className="modal_title_styling">
                <input type = "date"/>
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
                <div className="modal_title_styling">
                <Editable text={"New Label"} placeholder={"Enter Label Name"}
                buttonText="Set Label"/>
                </div>
          </div>

            <div className="cardinfo_box">
                <div className="cardinfo_box_title">
                    <CheckSquare />
                    Tasks
                </div>

                <div className="task_progress-bar">
                    <div className="task_progress" style={{ width: "30%" }} />
                </div>
                <div className="task_list">
                <div className="task">
                    <input type="checkbox" />
                    <p>Task 1</p>
                    <Trash />
                </div>
                <div className="task">
                    <input type="checkbox" />
                    <p>Task 2</p>
                    <Trash />
                </div>
                </div>

                <div className="modal_title_styling">
                <Editable text={"New Task"} placeholder={"Enter New Task"}
                buttonText="Save Task"/>
                </div>
          </div>

        </div>
      </Modal>
  )
}

export default CardInfo