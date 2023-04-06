import React, {useState} from "react";
import PropTypes from "prop-types";
import "./Editable.css";
import {faCheck, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

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
        <div className="editable_k">
            {isEditable ? (
                <form className={`editable_edit_k ${props.editClass || ""}`} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={inputText}
                        placeholder={props.placeholder || "Add Item"}
                        onChange={handleInputChange}
                        autoFocus
                    />
                    <div className="editable_edit_footer_k">
                        <button type="submit">{props.buttonText || <FontAwesomeIcon icon={faCheck}/>}</button>
                        <button type="button" onClick={handleCancel}><FontAwesomeIcon icon={faXmark}/></button>
                    </div>
                </form>
            ) : (
                <div className="hover-div">
                    <p
                        className={`editable_display_k ${props.displayClass || ""}`}
                        onClick={() => setIsEditable(true)}
                    >
                        {props.text || inputText || props.frontendText || props.frontendText}
                    </p>
                    <span className="hover-text_k">Click to enter</span>
                </div>
            )}
        </div>
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
