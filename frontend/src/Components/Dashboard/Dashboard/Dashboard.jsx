import React, {useEffect, useState} from 'react';
import Board from '../Board/Board';
import Toast from "../../../Shared/Components/Toast"
import {displayErrorMessage, displaySuccessMessage} from "../../../Shared/notify"
import ProjectSidebar from '../Sidebar/ProjectSidebar';
import NavBar from "../Navbar/index";
import {useParams} from 'react-router-dom';
import axios from "axios";
import * as DashboardComponents from "./Style"
import Skeleton from './Skeleton';


function Dashboard(props) {

    const [ issuesData, setIssuesData] = useState({});
    const [ issuesStatues, setIssuesStatues] = useState({});
    const [ target, setTarget] = useState({cid: "", bid: "",})
    const [ boards, setboards] = useState([]);
    const [ loading, setLoading ] = useState( false );

    const {projectId} = useParams()

    let authToken = localStorage.getItem('auth_token')
    const deleteIssue = (issueId) => {
        axios
            .delete(`${process.env.REACT_APP_HOST}/api/projects/${projectId}/issues/${issueId}/`, {
                headers: {Authorization: `Token ${authToken}`},
            })
            .then(response => {
                displaySuccessMessage(`Successfully delete the task.`)
            })
            .catch(error => {
                displayErrorMessage(`An error occurred while deleting the task. Please try again.`)
            })
    };


    const fetchData = async () => {
        try {
            setLoading(true);
            const projectIssuesPromise = axios.get(`${process.env.REACT_APP_HOST}/api/projects/${projectId}/issues`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });

            const projectIssuesStatusesPromise = axios.get(`${process.env.REACT_APP_HOST}/api/project_status`, {
                params: {project: projectId},
                headers: {Authorization: `Token ${authToken}`},
            });

            const [projectIssuesResponse, projectIssuesStatusesResponse] = await Promise.all([
                projectIssuesPromise,
                projectIssuesStatusesPromise,
            ]);

            setIssuesData(projectIssuesResponse.data);
            setIssuesStatues(projectIssuesStatusesResponse.data);
        } catch (error) {
            displayErrorMessage(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
        deleteIssue(cid)
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

    const handleDragEnd = (cid, bid) => {
        let s_bIndex, s_cIndex, t_bIndex, t_cIndex;

        s_bIndex = boards.findIndex((item) => item.id === bid);
        if (s_bIndex < 0) return;

        s_cIndex = boards[s_bIndex].cards?.findIndex((item) => item.id === cid);
        if (s_cIndex < 0) return;

        t_bIndex = boards.findIndex((item) => item.id === target.bid);
        if (t_bIndex < 0) return;

        t_cIndex = boards[t_bIndex].cards?.findIndex((item) => item.id === target.cid);
        if (t_cIndex < 0) return;

        const tempboards = [...boards];
        const tempCard = tempboards[s_bIndex].cards[s_cIndex];

        tempboards[s_bIndex].cards.splice(s_cIndex, 1);

        if (tempboards[t_bIndex].cards.length === 0) {
            addCard(tempCard.title, tempboards[t_bIndex].id);
        } else {
            tempboards[t_bIndex].cards.splice(t_cIndex, 0, tempCard);

            setboards(tempboards);
        }
    }

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
        return(
            <>
                <ProjectSidebar/>
                <NavBar/>
                <Skeleton />
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