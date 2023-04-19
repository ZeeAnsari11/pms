import React, {useState} from "react";
import {CheckSquare, Clock, MoreHorizontal, PlusCircle} from "react-feather";
import Chip from "../Chip/Chip";
import Dropdown from "../Dropdown/Dropdown";
import CardInfo from "../CardInfo/CardInfo";
import styled from 'styled-components';

const CardContainer = styled.div`
  position: relative;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
  border-radius: 10px;
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
`;

const CardTopMore = styled.div`
  width: 30px;
  height: 20px;
  transform: translateX(15px);
  flex: 1;
  cursor: pointer;
  opacity: 0;
  transition: 200ms;
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

const Paragraph = styled.div`
    border-bottom: 1px solid #f8f8f8;
    cursor: pointer;
`;

const CardTitle = styled.div`
  flex: 1;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.875rem;
`;

const CardFooter  = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardProfile = styled.div`
  margin-left: 124px;
  z-index: 1;

  &:hover .card_profile_name {
    opacity: 1;
  }
`;

export const CardProfileName = styled.div`
  opacity: 0;
`;

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
            <CardContainer
                draggable
                onDragEnd={() => props.handleDragEnd(props.Card?.id, props.boardId)}
                onDragEnter={() => props.handleDragEnter(props.Card?.id, props.boardId)}
                onClick={() => setshowModal(true)}
            >
                <CardTop>

                    {props.Card?.labels?.map((item, index) => (
                        <Chip key={index} text={item.text} color={item.color}/>
                    ))}

                    <CardTopMore onClick={() => setShowDropdown(!showDropDown)}>
                        <MoreHorizontal/>
                        {showDropDown && (
                            <Dropdown onClick={() => setShowDropdown(!showDropDown)}>
                                <BoardDropdown>
                                    <p onClick={() => props.removeCard(props.Card?.id, props.boardId)}>Delete Card</p>
                                </BoardDropdown>
                            </Dropdown>
                        )}
                    </CardTopMore>
                </CardTop>
                <CardTitle>{props.Card?.title}</CardTitle>
                <CardFooter >
                    {props.Card?.date && (
                        <p>
                            <Clock/>
                            {props.Card?.date}
                        </p>
                    )}
                    {
                        <p>
                            <CheckSquare/>
                            {props.Card.tasks.filter((item) => item.complete).length}/ {props.Card?.tasks?.length}
                        </p>
                    }
                </CardFooter>
                <CardProfile>
                    <img src={props.Card?.assignedTo?.profilePic} alt="Assignee"/>
                    <CardProfileName >{props.Card?.assignedTo?.name}</CardProfileName>
                </CardProfile>
            </CardContainer>
        </>
    );
}

export default Card;
