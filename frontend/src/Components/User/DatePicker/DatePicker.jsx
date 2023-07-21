import React from 'react';
import * as DatePickerComponents from "./style"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';

const DatePicker = () => {
    return (
        <DatePickerComponents.DatePickerContainer>
            <DatePickerComponents.DatePickerLabel>
                <FontAwesomeIcon icon={faCalendar}/> Started work on
            </DatePickerComponents.DatePickerLabel>
            <DatePickerComponents.DatePickerInputContainer>
                <DatePickerComponents.DatePickerInput type="date" />
            <DatePickerComponents.DatePickerIcon className="fas fa-calendar-alt">
            </DatePickerComponents.DatePickerIcon>
            </DatePickerComponents.DatePickerInputContainer>
        </DatePickerComponents.DatePickerContainer>
    );
};

export default DatePicker;
