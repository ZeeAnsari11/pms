import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';


const Description = ({ initialValue, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const editorRef = useRef(null);

  const handleEditorChange = (newValue) => {
    setValue(newValue);
  };

  const handleSave = () => {
    onSave(value);
    setValue(value);
    setIsEditing(false);
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleCloseEditor = (event) => {
    if (editorRef.current && !editorRef.current.contains(event.target)) {
      handleSave();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleCloseEditor);
    return () => document.removeEventListener('mousedown', handleCloseEditor);
  });

  return (
    <>
      {isEditing ? (
        <div ref={editorRef}>
          <ReactQuill value={value} onChange={handleEditorChange} />
          <button onClick={handleSave} style={{
            marginTop: '5px',
            padding: '10px',
            color: 'white',
            cursor: 'pointer',
            borderRadius: '5px',
            outline: 'none',
            backgroundColor: '#0065ff',
            border: 'none',
            transition: '100ms ease',
          }}>Save</button>
        </div>
      ) : (
          <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(value),
          }}
          onClick={handleClick}
        ></div>      )}
    </>
  );
};

export default Description;
