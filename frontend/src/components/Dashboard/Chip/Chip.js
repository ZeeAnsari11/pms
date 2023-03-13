import React from 'react'
import { X } from 'react-feather'
import './Chip.css'

function Chip(props) {
  return (
    <div className="chip" style={{backgroundColor:props.color}}>
        {props.text}
        {props.close && <X />}


    </div>
  );
}

export default Chip