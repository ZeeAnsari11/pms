import React, {useState} from "react";
import PropTypes from "prop-types";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as EditableComponents from "./Style"


const Editable = (props) => {
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
            {isEditable ? (
                <EditableComponents.EditableEdit
                    className={`${props.editClass || ""}`}
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        value={inputText}
                        placeholder={props.placeholder || "Add Item"}
                        onChange={handleInputChange}
                        autoFocus
                    />
                    <EditableComponents.EditableEditFooter>
                        <button type="submit">
                            <FontAwesomeIcon icon={faCheck}/></button>
                        <button type="button" onClick={handleCancel}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </button>
                    </EditableComponents.EditableEditFooter>
                </EditableComponents.EditableEdit>
            ) : (
                <EditableComponents.EditableDisplay
                    className={`${props.displayClass || ""}`}
                    onClick={() => setIsEditable(true)}
                    hoverBackgroundColor={`${props.hoverBackgroundColor}`}
                    fontWeight={`${props.fontWeight}`}
                    fontSize={`${props.fontSize}`}
                    padding={`${props.padding}`}
                    width={`${props.width}`}
                >
                    {props.icon && (
                        <span style={{marginRight: "5px"}}>
                            {props.icon}
                        </span>
                    )}
                    {props.text}
                </EditableComponents.EditableDisplay>

            )}
        </EditableComponents.EditableWrapper>
    );
};

Editable.propTypes = {
    text: PropTypes.string,
    placeholder: PropTypes.string,
    buttonText: PropTypes.string,
    editClass: PropTypes.string,
    icon: PropTypes.element,
    displayClass: PropTypes.string,
    fontWeight: PropTypes.string,
    fontSize: PropTypes.string,
    padding: PropTypes.string,
    width: PropTypes.string,
    hoverBackgroundColor: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    style: PropTypes.string,
};

export default Editable;