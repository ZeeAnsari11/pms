import React, { useState } from "react";
import "./FileUpload.css";

function FileUpload(props) {
  const [files, setFiles] = useState([]);

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const fileList = [...event.dataTransfer.files];
    setFiles([...files, ...fileList]);
  };

  const handleFileInput = (event) => {
    const fileList = [...event.target.files];
    setFiles([...files, ...fileList]);
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div
      class="file-upload-container"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="upload-text">Drag and drop files here
      <input type="file" multiple onChange={handleFileInput} style={{marginLeft: "65px", marginTop:"15px"}}/>
      <ul>
        {files.map((file, index) => (
          <li key={file.name}>
            <span>{file.name}</span>
            <button onClick={() => handleRemoveFile(index)}>x</button>
          </li>
        ))}
      </ul>
        </div>
    </div>
  );
}

export default FileUpload;
