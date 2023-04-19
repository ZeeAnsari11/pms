import React, { useState } from "react";
import styled from "styled-components";

const UploadContainer = styled.div`
  border: 2px dashed #ccc;
  border-radius: 5px;
  padding: 20px;
  text-align: center;

  &:hover {
    border-color: #666;
  }

  .upload-text {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .input {
    margin-left: 65px;
  }

  .upload-button {
    background-color: #2196f3;
    border: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: #0c7cd5;
    }
  }
`;

const UploadText = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Input = styled.input`
  margin-left: 65px;
`;

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
    <UploadContainer
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <UploadText>Drag and drop files here
      <Input type="file" multiple onChange={handleFileInput} style={{marginLeft: "65px", marginTop:"15px"}}/>
      <ul>
        {files.map((file, index) => (
          <li key={file.name}>
            <span>{file.name}</span>
            <button onClick={() => handleRemoveFile(index)}>x</button>
          </li>
        ))}
      </ul>
        </UploadText>
    </UploadContainer>
  );
}

export default FileUpload;
