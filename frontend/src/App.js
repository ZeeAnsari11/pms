import React, { Component, useState } from 'react';
import "./App.css";
import Board from './components/Board/Board';
import Editable from './components/Editable/Editable';
import Sidebar from './components/Sidebar/Sidebar';
import Dropdown from "./components/Dropdown/Dropdown";

function App(props){
  const [showDropDown, setShowDropdown]= useState(false);
  const [target,setTarget] = useState({
    cid: "",
    bid: "",
  })
  const [boards,setboards]=useState([
  {
    id:Date.now()+Math.random()*2,
    title: "Dashboard Frontend",
    cards:[
      {
        id:Date.now()+Math.random(),
        title: "Card 1",
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
        id:Date.now()+Math.random(),
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
        id:Date.now()+Math.random(),
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

    const addCard = (title, bid)=> {
      const card={
        id: Date.now() + Math.random(),
        title,
        labels: [],
        tasks: [],
        date: "",
        desc: "",
      };

      const index = boards.findIndex((item ) => item.id === bid)
      if (index<0) return;

      const tempBoards = [...boards]
      tempBoards[index].cards.push(card);
      setboards(tempBoards);
    };

    const removeCard = (cid,bid) => {
      const bIndex = boards.findIndex((item) => item.id === bid);
      if (bIndex < 0) return;

      const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid);
      if (cIndex < 0) return;

      const tempBoards = [...boards];
      tempBoards[bIndex].cards.splice(cIndex, 1);
      setboards(tempBoards) ;
    };

    const addBoard = (title) => {
      setboards ([
        ...boards,
        {
          id: Date.now() + Math.random(),
          title,
          cards: [],
        },
      ]);
    };

    const removeBoard = bid=>{
      const tempBoards = boards.filter((item)=> item.id !== bid);

      setboards(tempBoards);
    };

    const handleDragEnter=(cid, bid)=>{
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
  }

  setboards(tempboards);
};


    return (
      <div className="app">
        <Sidebar /> {/* Include the Sidebar component */}
        <div className="app_navbar">
          <h2>PHPStudios Project Management Dashboard</h2>
        </div>
        <div className="app_navbar_one">
          <button id="btn_1" className='Dashboard_nav'>Only My Issue</button>
          <button id="btn_2" className='Dashboard_nav'>Recently Updated</button>

          <div className="user-profile">
            <div className="user-profile-icon" onClick={()=> setShowDropdown(!showDropDown)}>
              {/* Replace `user-image.jpg` with the actual URL or path to the user's profile picture */}
              <img src="user-image.jpg" alt="User Profile"/>
                    {showDropDown && (
              <Dropdown onClick={()=> setShowDropdown(!showDropDown)}>
                  <div className="board_dropdown">
                      <p onClick={()=>props.removeBoard(props.board?.id)}>Delete Board</p>
                  </div>
              </Dropdown>
              )}
            </div>
          </div>
        </div>

      <div className="app_outer">
      <div className="app_boards">
        {
          boards.map((item)=><Board
          key={item.id} board={item}
          removeBoard={removeBoard}
          addCard={addCard}
          removeCard={removeCard}
          handleDragEnd={handleDragEnd}
          handleDragEnter={handleDragEnter}
          />)
        }
        <div className='app_boards_board'>
          <Editable className = 'app_boards_board_add'
          text = "Add Board" placeholder = "Enter Board Title"
          onSubmit={(value)=> addBoard(value)}
          />
        </div>
      </div>
    </div>
    </div>
    );
  }
// }

export default App;