import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Editable.css";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <div className="editable">
      {isEditable ? (
        <form
          className={`editable_edit ${props.editClass || ""}`}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={inputText}
            placeholder={props.placeholder || "Add Item"}
            onChange={handleInputChange}
            autoFocus
          />
          <div className="editable_edit_footer">
            <button type="submit">
              <FontAwesomeIcon icon={faCheck} />
            </button>
            <button type="button" onClick={handleCancel}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </form>
      ) : (
        <p
          className={`editable_display ${props.displayClass || ""}`}
          onClick={() => setIsEditable(true)}
        >
          {props.text || "Add Card"}
        </p>
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
};

export default Editable;
