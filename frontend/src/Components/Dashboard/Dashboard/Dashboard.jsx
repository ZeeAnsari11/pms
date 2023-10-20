import React, {useEffect, useState} from 'react';
import Board from '../Board/Board';
import Toast from "../../../Shared/Components/Toast"
import {displayErrorMessage, displaySuccessMessage} from "../../../Shared/notify"
import ProjectSidebar from '../Sidebar/ProjectSidebar';
import NavBar from "../Navbar/index";
import {useParams} from 'react-router-dom';
import * as DashboardComponents from "./Style"
import Skeleton from './Skeleton';
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";

import {
    deleteIssue,
    fetchSelectedProjectStatuses,
    loadProjectIssues, updateIssue
} from "../../../Store/Slice/issue/issueActions";

function Dashboard(props) {
    const dispatch = useDispatch()
    const loadIssuesData = useSelector((state) => state.issue.currentIssueData);

    const [issuesData, setIssuesData] = useState({});
    const [issuesStatues, setIssuesStatues] = useState({});
    const [target, setTarget] = useState({cid: "", bid: "",})
    const [boards, setboards] = useState([]);
    const [loading, setLoading] = useState(false);

    const {projectId} = useParams()

    const removeIssue = (issueId) => {
        dispatch(deleteIssue({projectId: projectId, issueId: issueId})).unwrap()
            .then(response => {
                displaySuccessMessage(`Successfully delete the task.`)
            })
            .catch(error => {
                displayErrorMessage(`An error occurred while deleting the task. ${error}`)
            })
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            dispatch(loadProjectIssues({projectId: projectId})).unwrap()
                .then((response) => {
                    setIssuesData(response.data);
                })
                .catch(
                    error => {
                        displayErrorMessage(error);
                    }
                );
            dispatch(fetchSelectedProjectStatuses({selectedProject: projectId})).unwrap()
                .then((response) => {
                    setIssuesStatues(response.data);
                })
                .catch(
                    error => {
                        displayErrorMessage(error);
                    }
                );
        } catch (error) {
            displayErrorMessage(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        dispatch(loadProjectIssues({projectId: projectId})).unwrap()
            .then((response) => {
                setIssuesData(response.data);
            })
            .catch(
                error => {
                    displayErrorMessage(error);
                }
            );
    }, [loadIssuesData.updated_at]);

    console.log("loadIssuesData.updated_at", loadIssuesData.updated_at)

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const selectedIssue = queryParams.get("selectedIssue");
        if (selectedIssue) {
            const card = boards
                .flatMap((board) => board.cards)
                .find((card) => card.slug === selectedIssue);
            if (card) {
                const {id: cid, bid} = card;
                setTarget({cid, bid});
                setboards((prevBoards) => {
                    const newBoards = [...prevBoards];
                    const bIndex = newBoards.findIndex((board) => board.id === bid);
                    if (bIndex >= 0) {
                        const cIndex = newBoards[bIndex].cards.findIndex(
                            (card) => card.id === cid
                        );
                        if (cIndex >= 0) {
                            newBoards[bIndex].cards[cIndex] = {
                                ...newBoards[bIndex].cards[cIndex],
                                showModal: true,
                            };
                        }
                    }
                    return newBoards;
                });
            }
        }
    }, [boards]);


    useEffect(() => {
        const issuesValueMapper = (issue) => {
            return {
                id: issue?.id,
                title: issue?.name,
                tasks: [],
                labels: issue?.label?.map((label) => ({
                    id: label?.id,
                    name: label?.name,
                    color: label?.color,
                })),
                desc: issue?.description,
                date: "",
                slug: issue?.slug,
                estimate: issue?.estimate,
                project: issue?.project,
                priority: issue?.priority,
                created_at: issue?.created_at,
                updated_at: issue?.updated_at,
                created_by: issue?.created_by,
                updated_by: issue?.updated_by,
                file: issue?.file,
                status: issue?.status,
                type: issue?.type,
                assignee: issue?.assignee,
                reporter: issue?.reporter,
            }
        }

        const prepareIssuesData = (issues) => {
            if (!issues || typeof issues !== 'object' || (!Symbol.iterator) in Object(issues)) {
                return {};
            }
            const statusMap = {};
            Array.from(issues).forEach((issue) => {
                const statusTitle = issue.status?.status || "Unknown Status";
                if (!statusMap[statusTitle]) {
                    statusMap[statusTitle] = [];
                }
                statusMap[statusTitle].push(issuesValueMapper(issue));
            });
            return statusMap;
        };

        if (issuesData && Array.isArray(issuesStatues)) {
            const cardsData = prepareIssuesData(issuesData);
            const newBoardData = issuesStatues.map((status) => {
                return {
                    id: Date.now() + Math.random() * 2,
                    title: status.status,
                    statusId: status?.id,
                    priority: status.priority,
                    cards: cardsData.hasOwnProperty(status.status) ? cardsData[status.status] : []
                };
            })
                .sort((a, b) => a.priority - b.priority);

            if (cardsData.hasOwnProperty('Unknown Status')) {
                newBoardData.push({
                    id: Date.now() + Math.random() * 2,
                    title: 'Unknown Status',
                    cards: cardsData['Unknown Status']
                });
            }

            setboards(newBoardData);
            setLoading(false);
        }
    }, [issuesData, issuesStatues]);

    const addCard = (title, bid) => {
        const card = {
            id: Date.now() + Math.random(),
            title,
            labels: [],
            tasks: [],
            date: "",
            desc: "",
        };

        const index = boards.findIndex((item) => item.id === bid)
        if (index < 0) return;

        const tempBoards = [...boards]
        tempBoards[index].cards.push(card);
        setboards(tempBoards);
    };

    const removeCard = (cid, bid) => {
        const bIndex = boards.findIndex((item) => item.id === bid);
        if (bIndex < 0) return;

        const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid);
        if (cIndex < 0) return;

        const tempBoards = [...boards];
        tempBoards[bIndex].cards.splice(cIndex, 1);
        removeIssue(cid)
        setboards(tempBoards);
    };

    const removeBoard = bid => {
        const tempBoards = boards.filter((item) => item.id !== bid);
        setboards(tempBoards);
    };

    const handleDragEnter = (cid, bid) => {
        setTarget({
            cid,
            bid,
        });
    };

    const updateCardStatus = async (cid, newStatus) => {
        const formData = new FormData();
        formData.append("status", newStatus);

        dispatch(updateIssue({issueId: cid, formData: formData})).unwrap()
            .then((response) => {
                displaySuccessMessage(`Card status updated successfully.`);
            })
            .catch(
                error => {
                    displayErrorMessage(error);
                }
            );
    };

    const handleDragEnd = (cid, bid) => {
        const tempBoards = [...boards];
        const sourceBoard = tempBoards.find((board) => board.id === bid);
        const targetBoard = tempBoards.find((board) => board.id === target.bid);

        const sourceCardIndex = sourceBoard.cards.findIndex((card) => card.id === cid);
        const sourceCard = sourceBoard.cards[sourceCardIndex];
        sourceBoard.cards.splice(sourceCardIndex, 1);

        if (targetBoard.statusId === sourceBoard.statusId) {
            // If source and target boards have the same status, simply insert the card at the target position
            const targetCardIndex = targetBoard.cards.findIndex((card) => card.id === target.cid);
            targetBoard.cards.splice(targetCardIndex, 0, sourceCard);
        } else {
            // If source and target boards have different statuses, update the source card's status
            updateCardStatus(sourceCard.id, targetBoard.statusId);

            // Insert the source card at the target position and update its status only
            const targetCardIndex = targetBoard.cards.findIndex((card) => card.id === target.cid);
            targetBoard.cards.splice(targetCardIndex, 0, {...sourceCard, status: targetBoard.statusId});
        }

        setboards(tempBoards);
    };

    const updateCard = (bid, cid, card) => {
        const bIndex = boards.findIndex((item) => item.id === bid);
        if (bIndex < 0) return;

        const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid);
        if (cIndex < 0) return;

        const tempBoards = [...boards];
        tempBoards[bIndex].cards[cIndex] = card;
        setboards(tempBoards);
    }

    if (loading) {
        return (
            <>
                <ProjectSidebar/>
                <NavBar/>
                <Skeleton/>
            </>
        );
    }

    return (
        <DashboardComponents.DashboardContainer>
            <ProjectSidebar/>
            <NavBar/>
            <Toast/>
            <DashboardComponents.DashboardOuter>
                <DashboardComponents.DashboardBoards>
                    {
                        boards.map((item) => (<Board
                                key={item.id} board={item}
                                removeBoard={removeBoard}
                                addCard={addCard}
                                removeCard={removeCard}
                                handleDragEnd={handleDragEnd}
                                handleDragEnter={handleDragEnter}
                                updateCard={updateCard}
                            />
                        ))
                    }
                </DashboardComponents.DashboardBoards>
            </DashboardComponents.DashboardOuter>
        </DashboardComponents.DashboardContainer>
    );
};
export default Dashboard;