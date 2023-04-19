import React, { useState,  } from "react";
import { MoreHorizontal } from "react-feather";
import Card from "../Card/Card";
import Editable from "../Editable/Editable";
import Dropdown from "../Dropdown/Dropdown";
import styled from "styled-components";


const BoardContainer = styled.div`
  min-width: 290px;
  width: 290px;
  max-height: 100%;
  flex-basis: 290px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #ebebeb;
  margin-top: 15px;
  border-radius: 10px;
`;

const BoardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BoardTopTitle = styled.p`
  margin-left: 10px;
`;

const BoardTopMore = styled.div`
  position: relative;
  cursor: pointer;
  margin-left: 73.6px;
  float: right;
  padding: 4px;

`;

const BoardHeaderTitle = styled.div`
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  gap: 5px;
  align-items: center;
  margin-left: 10px;
`;

const BoardHeaderTitleSpan = styled.span`
  color: rgb(145, 145, 145);
`;

const BoardDropdown = styled.div`
  box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.12);
  width: 100px !important;
  cursor: default;
  background-color: #fff;

  p {
    border-bottom: 1px solid #f8f8f8;
    cursor: pointer;
  }
`;

const CardDropdown = styled(BoardDropdown)`
  position: absolute;
  right: -190px;
`;

const BoardCards = styled.div`
  background-color: #ebebeb;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
`;

const BoardCardsAdd = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 1px 2px 0 1px rgba(0, 0, 0, 0.15);

  &:hover {
    box-shadow: 1px 2px 0 1px #ccc;
  }
`;

const BoardAddCard = styled.div`
  background-color: #fff;
  color: #000;
  border-radius: 10px;
  box-shadow: 1px 1px 0 1px rgba(0, 0, 0, 0.12);
  width: 100%;
  text-align: center;
`;

const BoardAddCardEdit = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
`;

function Board(props) {
    const [showDropDown, setShowDropdown]= useState(false);
return (
    <BoardContainer>
     <BoardTop>
        <BoardTopTitle>
            {props.board?.title} <span>{`(${props.board?.cards?.length})`}</span>
            {/* <b>To Do </b><span>2</span> */}
        <BoardTopMore onClick={()=> setShowDropdown(!showDropDown)}>
        <MoreHorizontal />
        {showDropDown && (
        <Dropdown onClick={()=> setShowDropdown(!showDropDown)}>
            <BoardDropdown>
                <p onClick={()=>props.removeBoard(props.board?.id)}>Delete Board</p>
            </BoardDropdown>
        </Dropdown>
        )}
        </BoardTopMore>
        </BoardTopTitle>
        </BoardTop>
        <BoardCards>
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
        </BoardCards>

    </BoardContainer>
    );
}

export default Board;