import React, {useState,} from "react";
import {MoreHorizontal} from "react-feather";
import Card from "../Card/Card";
import Editable from "../Editable/Editable";
import Dropdown from "../Dropdown/Dropdown";
import {BsPlus} from "react-icons/bs";
import * as BoardComponents from "./Style"


function Board(props) {
    const [showDropDown, setShowDropdown] = useState(false);

    const handleDropdownClose = () => {
        setShowDropdown(false);
    };

    return (
        <BoardComponents.BoardContainer>
            <BoardComponents.BoardTop>
                <BoardComponents.BoardTopTitle>
                    {props.board?.title} <span>{`(${props.board?.cards?.length})`}</span>
                    <BoardComponents.BoardTopMore onClick={() => setShowDropdown(true)}>
                        {
                            <MoreHorizontal onClick={() => setShowDropdown(!showDropDown)}/>

                        }
                        {showDropDown && (
                            <Dropdown onClose={handleDropdownClose}>
                                <BoardComponents.BoardDropdown>
                                    <BoardComponents.ParagraphWrapper
                                        onClick={() => props.removeBoard(props.board?.id)}>Delete
                                        Board</BoardComponents.ParagraphWrapper>
                                </BoardComponents.BoardDropdown>
                            </Dropdown>
                        )}
                    </BoardComponents.BoardTopMore>
                </BoardComponents.BoardTopTitle>
            </BoardComponents.BoardTop>
            <BoardComponents.BoardCards>
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
            </BoardComponents.BoardCards>

        </BoardComponents.BoardContainer>
    );
}

export default Board;