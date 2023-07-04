import React, {useEffect, useState} from 'react';
import Board from '../Board/Board';
import Editable from '../Editable/Editable';
import ProjectSidebar from '../Sidebar/ProjectSidebar';
import NavBar from "../Navbar/index";
import styled from 'styled-components';
import {useLocation, useParams} from 'react-router-dom';
import {BsPlusSquare} from "react-icons/bs";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const DashboardContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const DashboardOuter = styled.div`
  flex: 1;
  overflow-x: auto;
  padding: 0px 20px 0px 20px;
  margin-left: 200px;
  margin-bottom: -10px;
`;

const DashboardBoards = styled.div`
  min-width: fit-content;
  display: flex;
  gap: 30px;
  height: 100%;
  margin-top: 50px;
`;

const BoardDashboardBoards = styled.div`
  min-width: 290px;
  width: 290px;
`;

const BoardAdd = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 1px 2px 0 1px rgba(0, 0, 0, 0.15);

  &:hover {
    box-shadow: 1px 2px 0 1px #ccc;
  }
`;


function Dashboard(props) {
    let authToken = localStorage.getItem('auth_token')

    const [projectData, setProjectData] = useState({});
    const [issuesData, setIssuesData] = useState({});
    const [issuesStatues, setIssuesStatues] = useState({});
    const [name, setName] = useState('');
    const [projectCategory, setProjectCategory] = useState('');
    const [projectIcon, setProjectIcon] = useState('');
    const [target, setTarget] = useState({ cid: "", bid: "", })
    const [boards, setboards] = useState([]);

    const {projectId} = useParams()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const deleteIssue =  (issueId) => {
        axios
            .delete(`${process.env.REACT_APP_HOST}/api/projects/${projectId}/issues/${issueId}/`, {
                headers: { Authorization: `Token ${authToken}`},
            } )
            .then(response => {
                displaySuccessMessage(`Successfully delete the task.`)
            })
            .catch(error => {
                displayErrorMessage(`An error occurred while deleting the task. Please try again.`)
            })
    };

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/projects/${projectId}`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setProjectData(response.data);

        };

        const fetchProjectIssues = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/projects/${projectId}/issues`, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            setIssuesData(response.data);
        };

        const fetchProjectIssuesStatuses = async () => {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/project_status`, {
                params: { project: projectId },
                headers: { Authorization: `Token ${authToken}`},
            });
            setIssuesStatues(response.data);
        };

        fetchProjects();
        fetchProjectIssues();
        fetchProjectIssuesStatuses()
    }, []);


    useEffect(() => {
        if (projectData.name) {
            setName(projectData.name);
            setProjectIcon(projectData.icon);
            setProjectCategory(projectData.category)
        }
    }, [projectData]);

    useEffect(() => {
        const issuesValueMapper = (issue) => {
            return {
                id: issue?.id,
                title: issue?.name,
                tasks: [],
                labels: [
                    {
                        text: issue?.label?.name,
                        color: issue?.label?.color,
                    },
                ],
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
                console.error('Issues is not iterable.');
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
            console.log('Status Mapped is', statusMap);
            return statusMap;
        };

        if(issuesData && Array.isArray(issuesStatues)){
            const cardsData = prepareIssuesData(issuesData);
            const newBoardData = issuesStatues.map((status) => {
            return {
                id: Date.now() + Math.random() * 2,
                title: status.status,
                cards: cardsData.hasOwnProperty(status.status) ? cardsData[status.status] : []
            };
        })

        if(cardsData.hasOwnProperty('Unknown Status')) {
            newBoardData.push({
                id: Date.now() + Math.random() * 2,
                title: 'Unknown Status',
                cards: cardsData['Unknown Status']
            });
        }

        setboards(newBoardData);
        }
    }, [issuesData, issuesStatues]);

    const displayErrorMessage = (message) => {
        toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }

    const displaySuccessMessage = (message) => {
        toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
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

    let IconPath = projectData.icon
    if (IconPath != null) {
        IconPath = `${process.env.REACT_APP_HOST}/${projectIcon}`
    } else {
        IconPath = 'http://localhost:3000/Images/NoImage.jpeg'
    }


    return (
        <DashboardContainer>
            <ProjectSidebar/>
            <NavBar/>
            <DashboardOuter>
                <DashboardBoards>
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
                </DashboardBoards>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </DashboardOuter>
        </DashboardContainer>
    );
};
export default Dashboard;