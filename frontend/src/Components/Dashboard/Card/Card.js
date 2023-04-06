import React, { useState } from "react";
import {CheckSquare, Clock, MoreHorizontal, PlusCircle} from "react-feather";
import Chip from "../Chip/Chip";
import Dropdown from "../Dropdown/Dropdown";
import "./Card.css";
import CardInfo from "../CardInfo/CardInfo";

function Card(props) {
  const [showDropDown, setShowDropdown] = useState(false);
  const [showModal, setshowModal] = useState(false);

  return (
    <>
      {showModal && (
        <CardInfo
          card={props.Card}
          updateCard={props.updateCard}
          boardId={props.boardId}
          onClose={() => setshowModal(false)}
        />
      )}
      <div
        className="card"
        draggable
        onDragEnd={() => props.handleDragEnd(props.Card?.id, props.boardId)}
        onDragEnter={() => props.handleDragEnter(props.Card?.id, props.boardId)}
        onClick={() => setshowModal(true)}
      >
        <div className="card_top">
          <div className="card_labels">
            {props.Card?.labels?.map((item, index) => (
              <Chip key={index} text={item.text} color={item.color} />
            ))}
          </div>
          <div className="card_top_more" onClick={() => setShowDropdown(!showDropDown)}>
            <MoreHorizontal />
            {showDropDown && (
              <Dropdown onClick={() => setShowDropdown(!showDropDown)}>
                <div className="board_dropdown">
                  <p onClick={() => props.removeCard(props.Card?.id, props.boardId)}>Delete Card</p>
                </div>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card_title">{props.Card?.title}</div>
        <div className="card_footer">
          {props.Card?.date && (
            <p>
              <Clock />
              {props.Card?.date}
            </p>
          )}
          {
            <p>
              <CheckSquare />
              {props.Card.tasks.filter((item) => item.complete).length}/ {props.Card?.tasks?.length}
            </p>
          }
        </div>
          <div className="card_profile">
            <img src={props.Card?.assignedTo?.profilePic} alt="Assignee" />
            <span className="card_profile_name">{props.Card?.assignedTo?.name}</span>
          </div>
      </div>
    </>
  );
}

export default Card;
