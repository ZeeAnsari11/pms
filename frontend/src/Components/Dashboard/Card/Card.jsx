import React, {useState} from "react";
import {Delete, Clock, MoreHorizontal} from "react-feather";
import {Modal} from 'antd';
import Chip from "../Chip/Chip";
import Dropdown from "../Dropdown/Dropdown";
import CardInfo from "../CardInfo/CardInfo";
import Avatar from 'react-avatar';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";

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
  flex-wrap: wrap;
  align-items: flex-start;
`;

const CardTopMore = styled.div`
  width: 30px;
  height: 20px;
  transform: translateX(15px);
  flex: 1;
  float: right;
  cursor: pointer;
  opacity: 0;
  transition: 200ms;
  text-align: right;
  margin-right: 10px;

  &:hover {
    opacity: 1;
  }
`;


const CardTitle = styled.div`
  flex: 1;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.4rem;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-weight: 700;
    font-size: 1rem;
    color: gray;
    text-transform: uppercase;
    cursor: pointer;
  }
`;

export const CardProfile = styled.div`
  text-align: end;
  z-index: 1;
  margin-left: 175px;
  margin-top: -60px;

  &:hover .card_profile_name {
    opacity: 1;
  }
`;

export const CardProfileName = styled.div`
  opacity: 0;
`;

function Card(props) {
    const [displayDeleteTaskModal, setDisplayDeleteTaskModal] = useState(false);
    const [showModal, setshowModal] = useState(false);
    const [showName, setshowName] = useState(false);
    const navigate = useNavigate();


    const handleCardClick = (event) => {
        event.preventDefault();
        setshowModal(true);
        const {Card} = props;
        const {slug: issueSlug} = Card;
        const currentURL = window.location.pathname;
        const newURL = `${currentURL}?selectedIssue=${issueSlug}`;
        navigate(newURL);
    };

    const handleModalClose = () => {
        setshowModal(false);
        navigate(-1); // Go back to the previous URL
    };
    console.log("props.Card?.labels:", props.Card?.labels)


    return (
        <>
            {showModal && (
                <CardInfo
                    card={props.Card}
                    updateCard={props.updateCard}
                    boardId={props.boardId}
                    onClose={handleModalClose}
                />
            )}
            <CardContainer
                draggable
                onDragEnd={() => props.handleDragEnd(props.Card?.id, props.boardId)}
                onDragEnter={() => props.handleDragEnter(props.Card?.id, props.boardId)}
                onClick={handleCardClick}
            >
                <div>
                    <CardTopMore
                        onClick={(e) => {
                            e.stopPropagation();
                            setDisplayDeleteTaskModal(!displayDeleteTaskModal)
                        }}>
                        <Delete/>
                        {displayDeleteTaskModal && (
                            <Modal
                                title="Confirm Deletion"
                                open={displayDeleteTaskModal}
                                onCancel={() => setDisplayDeleteTaskModal(!displayDeleteTaskModal)}
                                onOk={() => {
                                    props.removeCard(props.Card?.id, props.boardId);
                                    setDisplayDeleteTaskModal(!displayDeleteTaskModal);
                                }}
                                okButtonProps={{style: {backgroundColor: 'rgb(30, 100, 209)'}}}
                                okText="Delete"
                                cancelText="Cancel"
                            >
                                <p>
                                    Are you sure you want to delete task: <strong>{props.Card?.slug}</strong>?
                                </p>

                            </Modal>
                        )}
                    </CardTopMore>
                    <CardTop>
                        {props.Card?.labels?.map((item, index) => {
                            if (item.color) {
                                return <Chip key={index} text={item.name} color={item.color}/>;
                            }
                        })}
                    </CardTop>
                </div>
                <CardTitle>{props.Card?.title}</CardTitle>
                <CardFooter>
                    {props.Card?.date && (
                        <p>
                            <Clock/>
                            {props.Card?.date}
                        </p>
                    )}
                    {props.Card?.slug && (
                        <p title={props.Card?.slug.toUpperCase()}>
                            {props.Card?.slug}
                        </p>
                    )}
                </CardFooter>
                <CardProfile>
                    <Avatar
                        name={"User"}
                        size={30}
                        round={true}
                        color="#DE350B"
                        title={"User"}
                        style={{marginRight: '10px'}}
                    />
                    <CardProfileName onMouseEnter={() => setshowName(true)} onMouseLeave={() => setshowName(false)}>
                        {props.Card?.assignedTo?.name}
                    </CardProfileName>
                </CardProfile>
            </CardContainer>
        </>
    );
}

export default Card;
