import React, { useState,  } from "react";
import { MoreHorizontal } from "react-feather";
import "./Board.css";
import Card from "../Card/Card";
import Editable from "../Editable/Editable";
import Dropdown from "../Dropdown/Dropdown";

function Board(props) {
    const [showDropDown, setShowDropdown]= useState(false);
return (
    <div className="board">
     <div className="board_top">
        <p className="board_top_title">
            {props.board?.title} <span>{`(${props.board?.cards?.length})`}</span>
            {/* <b>To Do </b><span>2</span> */}
        <div className="board_top_more" onClick={()=> setShowDropdown(!showDropDown)}>
        <MoreHorizontal />
        {showDropDown && (
        <Dropdown onClick={()=> setShowDropdown(!showDropDown)}>
            <div className="board_dropdown">
                <p onClick={()=>props.removeBoard(props.board?.id)}>Delete Board</p>
            </div>
        </Dropdown>
        )}
        </div>
        </p>
        </div>
        <div className="board_cards">
        {props.board?.cards?.map((item)=>(
        <Card
            key={item.id}
            Card={item}
            removeCard={props.removeCard}
            boardId={props.board?.id}
            handleDragEnd={props.handleDragEnd}
            handleDragEnter={props.handleDragEnter}
            updateCard={props.updateCard}
        />
        ))}
            <Editable
            text = "Add Card"
            Placeholder = "Enter Card Title"
            onSubmit = {(value) => props.addCard(value, props.board?.id)}
            />
        </div>

    </div>
    );
}

export default Board;