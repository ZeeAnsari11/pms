import React, {useState} from 'react';
import Board from '../Board/Board';
import Editable from '../Editable/Editable';
import Sidebar from '../Sidebar/index';
import NavBar from "../Navbar/index";
import styled from 'styled-components';
import {useLocation} from 'react-router-dom';
import {BsPlusSquare} from "react-icons/bs";

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

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);


    const [target, setTarget] = useState({
        cid: "",
        bid: "",
    })
    const [boards, setboards] = useState([
        {
            id: Date.now() + Math.random() * 2,
            title: "Dashboard Frontend",
            cards: [
                {
                    id: Date.now() + Math.random(),
                    title: "I am testing this to check whether styling remains consistent or not.",
                    tasks: [],
                    labels: [
                        {
                            text: "critical",
                            color: "red",
                        },
                    ],
                    desc: "Frontend of Dashboard",
                    date: "",
                },
                {
                    id: Date.now() + Math.random(),
                    title: "Card 2",
                    tasks: [],
                    labels: [
                        {
                            text: "In queue",
                            color: "Grey",
                        },
                    ],
                    desc: "Second frontend of Dashboard",
                    date: "",
                },
                {
                    id: Date.now() + Math.random(),
                    title: "Card 3",
                    tasks: [],
                    labels: [
                        {
                            text: "In Progress",
                            color: "Blue",
                        },
                    ],
                    desc: "Backend of Dashboard",
                    date: "",
                },
            ],
        },
    ]);

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
        setboards(tempBoards);
    };

    const addBoard = (title) => {
        setboards([
            ...boards,
            {
                id: Date.now() + Math.random(),
                title,
                cards: [],
            },
        ]);
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

    const project = {
        name: searchParams.get('name'),
        category: searchParams.get('category')
    }

    return (
        <DashboardContainer>
            <Sidebar project={project}/>
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
                    <BoardDashboardBoards>
                        <Editable
                            icon={<BsPlusSquare size={30}/>}
                            className={BoardAdd}
                            placeholder="Enter Board Title"
                            onSubmit={(value) => addBoard(value)}
                        />
                    </BoardDashboardBoards>
                </DashboardBoards>
            </DashboardOuter>
        </DashboardContainer>
    );
};
export default Dashboard;