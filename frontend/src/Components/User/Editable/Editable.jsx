import React, {useState} from "react";
import PropTypes from "prop-types";
import {faCheck, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as EditableComponents from "./style"

function Editable(props) {
    const [isEditable, setIsEditable] = useState(false);
    const [inputText, setInputText] = useState(props.text || "");

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputText && props.onSubmit) {
            props.onSubmit(inputText);
        }
        setIsEditable(false);
    };

    const handleCancel = () => {
        setIsEditable(false);
        setInputText(props.text || "");
    };

    return (
        <EditableComponents.EditableWrapper>
            <EditableComponents.EditableK>
                {isEditable ? (
                    <EditableComponents.EditableEditK className={`${props.editClass || ""}`} onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={inputText}
                            placeholder={props.placeholder || "Add Item"}
                            onChange={handleInputChange}
                            autoFocus
                        />
                        <EditableComponents.EditableEditFooterK>
                            <button type="submit">{props.buttonText || <FontAwesomeIcon icon={faCheck}/>}</button>
                            <button type="button" onClick={handleCancel}><FontAwesomeIcon icon={faXmark}/></button>
                        </EditableComponents.EditableEditFooterK>
                    </EditableComponents.EditableEditK>
                ) : (
                    <EditableComponents.HoverDiv>
                        <EditableComponents.EditableDisplay
                            className={`${props.displayClass || ""}`}
                            onClick={() => setIsEditable(true)}
                        >
                            {props.text || inputText || props.frontendText || props.frontendText}
                        </EditableComponents.EditableDisplay>
                        {/*<HoverTexts>Click to enter</HoverTexts>*/}
                    </EditableComponents.HoverDiv>
                )}
            </EditableComponents.EditableK>
        </EditableComponents.EditableWrapper>
    );
}

Editable.propTypes = {
    text: PropTypes.string,
    placeholder: PropTypes.string,
    buttonText: PropTypes.string,
    editClass: PropTypes.string,
    displayClass: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    frontendText: PropTypes.string,
};

export default Editable;
