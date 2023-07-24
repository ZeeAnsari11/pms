import React, {useState} from "react";
import {Delete, Clock} from "react-feather";
import {Modal} from 'antd';
import Chip from "../Chip/Chip";
import CardInfo from "../CardInfo/CardInfo";
import Avatar from 'react-avatar';
import {useNavigate} from "react-router-dom";
import * as CardComponents from "./Style"


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
            <CardComponents.CardContainer
                draggable
                onDragEnd={() => props.handleDragEnd(props.Card?.id, props.boardId)}
                onDragEnter={() => props.handleDragEnter(props.Card?.id, props.boardId)}
                onClick={handleCardClick}
            >
                <div>
                    <CardComponents.CardTopMore
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
                    </CardComponents.CardTopMore>
                    <CardComponents.CardTop>
                        {props.Card?.labels?.map((item, index) => {
                            if (item.color) {
                                return <Chip key={index} text={item.name} color={item.color}/>;
                            }
                        })}
                    </CardComponents.CardTop>
                </div>
                <CardComponents.CardTitle>{props.Card?.title}</CardComponents.CardTitle>
                <CardComponents.CardFooter>
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
                </CardComponents.CardFooter>
                <CardComponents.CardProfile>
                    <Avatar
                        name={`${props.Card?.assignee?.username}`}
                        size={35}
                        round={true}
                        color="#DE350B"
                        src={`${process.env.REACT_APP_HOST}/${props.Card?.assignee?.userprofile?.image}`}
                        title={`Assignee: ${props.Card?.assignee?.username}`}
                        style={{marginRight: '10px'}}
                    />
                    <CardComponents.CardProfileName onMouseEnter={() => setshowName(true)}
                                                    onMouseLeave={() => setshowName(false)}>
                        {props.Card?.assignedTo?.name}
                    </CardComponents.CardProfileName>
                </CardComponents.CardProfile>
            </CardComponents.CardContainer>
        </>
    );
}

export default Card;
