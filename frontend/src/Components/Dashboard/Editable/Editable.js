// import React, { useState } from "react";
//
// import { X } from "react-feather";
//
// import "./Editable.css";
//
// function Editable(props) {
//   const [isEditable, setIsEditable] = useState(false);
//   const [inputText, setInputText] = useState(props.default || "");
//
//   const submission = (e) => {
//     e.preventDefault();
//     if (inputText && props.onSubmit) {
//       setInputText("");
//       props.onSubmit(inputText);
//     }
//     setIsEditable(false);
//   };
//
//   return (
//     <div className="editable">
//       {isEditable ? (
//         <form
//           className={`editable_edit ${props.editClass || ""}`}
//           onSubmit={(event)=>{ event.preventDefault();
//             if (props.onSubmit) props.onSubmit(inputText);
//             setIsEditable(false);
//             setInputText("");
//           }}
//         >
//           <input
//             type="text"
//             value={inputText}
//             placeholder={props.placeholder || props.text || "Add Item"}
//             onChange={(event) => setInputText(event.target.value)}
//             autoFocus
//           />
//           <div className="editable_edit_footer">
//             <button type="submit">{props.buttonText || "Add"}</button>
//             <X onClick={() => setIsEditable(false)} className="closeIcon" />
//           </div>
//         </form>
//       ) : (
//         <p
//           className={`editable_display ${
//             props.displayClass ? props.displayClass : ""
//           }`}
//           onClick={() => setIsEditable(true)}
//         >
//           {props.text || "Add Card"}
//         </p>
//       )}
//     </div>
//   );
// }
//
// export default Editable;

import React, { useState } from "react";
import PropTypes from "prop-types";
import { X } from "react-feather";
import "./Editable.css";

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
        <form className={`editable_edit ${props.editClass || ""}`} onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputText}
            placeholder={props.placeholder || "Add Item"}
            onChange={handleInputChange}
            autoFocus
          />
          <div className="editable_edit_footer">
            <button type="submit">{props.buttonText || "Add"}</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
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
