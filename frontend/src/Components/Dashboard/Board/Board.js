import React, {useState,} from "react";
import {MoreHorizontal} from "react-feather";
import Card from "../Card/Card";
import Editable from "../Editable/Editable";
import Dropdown from "../Dropdown/Dropdown";
import styled from "styled-components";
import {BsPlus} from "react-icons/bs";

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
  width: 100%;
`;

const BoardTopMore = styled.button`
  position: relative;
  cursor: pointer;
  float: right;
  padding: 4px;
  height: 29px;
  width: 35px;
  margin-right: 5px;
  border: none;
  border-radius: 3px;

  &:hover {
    background-color: white;
  }

  &:active {
    background-color: #253858;
  }

  &:focus {
    background-color: #253858;
  }
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
  border-radius: 3px;
  margin-top: 25px;
  background-color: whitesmoke;


  p {
    cursor: pointer;
  }

  &:hover {
    background-color: #DADADA;
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

const ParagraphWrapper = styled.p`

`;

function Board(props) {
    const [showDropDown, setShowDropdown] = useState(false);

    const handleDropdownClose = () => {
        setShowDropdown(false);
    };

    return (
        <BoardContainer>
            <BoardTop>
                <BoardTopTitle>
                    {props.board?.title} <span>{`(${props.board?.cards?.length})`}</span>
                    <BoardTopMore onClick={() => setShowDropdown(true)}>
                        {

                            <MoreHorizontal onClick={() => setShowDropdown(!showDropDown)}/>

                        }
                        {showDropDown && (
                            <Dropdown onClose={handleDropdownClose}>
                                <BoardDropdown>
                                    <ParagraphWrapper onClick={() => props.removeBoard(props.board?.id)}>Delete
                                        Board</ParagraphWrapper>
                                </BoardDropdown>
                            </Dropdown>
                        )}
                    </BoardTopMore>
                </BoardTopTitle>
            </BoardTop>
            <BoardCards>
                {props.board?.cards?.map((item) => (
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
                    text={"Create Issue"}
                    icon={<BsPlus size={30}/>}
                    hoverBackgroundColor={"#dadada"}
                    Placeholder="Enter Card Title"
                    onSubmit={(value) => props.addCard(value, props.board?.id)}
                />
            </BoardCards>

        </BoardContainer>
    );
}

export default Board;