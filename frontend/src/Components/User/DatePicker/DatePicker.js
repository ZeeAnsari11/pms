import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';

const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  width: 200px;
`;

const DatePickerLabel = styled.label`
  margin-bottom: 0.5rem;
  padding-right: 52px;
  padding-bottom: 10px;
  font-size: 18px;
  color: #666;
  //font-weight: bold;
`;

const DatePickerInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DatePickerInput = styled.input`
  padding: 0.5rem 2rem 0.5rem 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s ease-in-out;
  width: 220px;

  &:focus {
    outline: none;
    border-color: #0079bf;
    box-shadow: 0 0 0 3px rgba(27, 149, 224, 0.4);
  }
`;

const DatePickerIcon = styled.i`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;

`;

const DatePicker = () => {
  return (
    <DatePickerContainer>
      <DatePickerLabel><FontAwesomeIcon icon={faCalendar}/> Started work on</DatePickerLabel>
      <DatePickerInputContainer>
        <DatePickerInput type="date" />
        <DatePickerIcon className="fas fa-calendar-alt"></DatePickerIcon>
      </DatePickerInputContainer>
    </DatePickerContainer>
  );
};

export default DatePicker;
