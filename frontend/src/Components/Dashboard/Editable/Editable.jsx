import React, {useState} from "react";
import PropTypes from "prop-types";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import {BsPlusSquare} from "react-icons/bs";

const EditableWrapper = styled.div`
  width: 100%;
  height: 100%;

  .editable_display {
    padding: 2px 8px;
    color: #000;
    cursor: pointer;
    transition: 200ms;
    text-align: center;
    border-radius: 4px;
    background-color: #f4f5f7;

    &:hover {
      background-color: #ebecf0;
    }
  }

  .editable_edit {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .editable_edit input {
    border: 2px solid #0079bf;
    border-radius: 5px;
    outline: none;
    font-size: 1rem;
    padding: 10px;
  }

  .editable_edit_footer {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-direction: row-reverse;
  }

  .editable_edit_footer button {
    cursor: pointer;
    border-radius: 5px;
    outline: none;
    background-color: #f5f5f5;
    color: black;
    border: none;
    transition: 100ms ease;
    padding: 10px;

    &:hover {
      background-color: #f5f5f5;
    }
  }

  .editable_edit_footer .closeIcon {
    cursor: pointer;
    height: 24px;
    width: 24px;
  }
`;


const EditableEdit = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  gap: 10px;
  margin-top: 15px;

  input {
    border: 2px solid #0079bf;
    border-radius: 5px;
    outline: none;
    font-size: 1rem;
    padding: 10px;
    margin-left: 20px;
    //width: 120px;
  }
`;

const EditableEditFooter = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-direction: row-reverse;

  button {
    cursor: pointer;
    border-radius: 5px;
    outline: none;
    background-color: #f5f5f5;
    color: black;
    border: none;
    transition: 100ms ease;
    padding: 10px;
    z-index: 100;

    &:hover {
      background-color: #f5f5f5;
    }
  }
`;

const EditableDisplay = styled.p`
  background-color: transparent;
  //font-size: 22px;
  font-size: ${props => props.fontSize || "22px"};
  font-weight: ${props => props.fontWeight || 'normal'};
  padding: ${props => props.padding || '0 0 0 0'};
  width: ${props => props.width};
  display: flex;

  &:hover {
    background-color: ${props => props.hoverBackgroundColor || '#ffffff'};
    border-radius: 5px;
  }
`;


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
        <EditableWrapper>
            {isEditable ? (
                <EditableEdit
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
                    <EditableEditFooter>
                        <button type="submit">
                            <FontAwesomeIcon icon={faCheck}/></button>
                        <button type="button" onClick={handleCancel}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </button>
                    </EditableEditFooter>
                </EditableEdit>
            ) : (
                <EditableDisplay
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
                </EditableDisplay>

            )}
        </EditableWrapper>
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