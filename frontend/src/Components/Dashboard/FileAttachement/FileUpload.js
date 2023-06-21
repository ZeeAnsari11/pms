import React, {useState,useEffect} from "react";
import styled from "styled-components";
import {Card} from 'antd';
import {VscFileCode} from "react-icons/vsc";
import {AiOutlineFileZip, AiOutlineFilePdf, AiOutlineFileUnknown} from 'react-icons/ai'
import axios from "axios";

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

const PreviewContainer = styled.div`
  display: flex;
  flex-wrap: nowrap; // this will prevent wrapping of preview items
  overflow-x: auto; // this will enable horizontal scrolling
  padding: 10px 0; // optional: add some padding for better spacing
  border: 2px solid lightgrey;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const openFileWindow = (src) => {
    window.open(src, '_blank');
}

const PreviewItem = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: column;
`;

const DeleteButton = styled.button`
  background-color: ${props => props.hovered ? '#1E64D1' : '#ccc'};
  border: none;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background-color: #1E64D1;
  }
`;
const PreviewImage = styled.img`
  background-color: #D9DCE1;
  width: 100%;
  height: 155px;
  object-fit: cover;

`;

const PreviewPDF = styled.iframe`
  width: 100%;
  height: 150px;
`;

const PreviewFile = styled.iframe`
  width: 100%;
  height: 150px;
`;

const PreviewVideo = styled.video`
  width: 100%;
  height: 155px;
`;

const AttachmentsBoxTitle = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
`;

const CardContainer = styled.div`
  width: 180px;
  height: 250px;
`;

function FileUpload(props) {
    const [files, setFiles] = useState([]);


   useEffect(() => {
    if (props.fileAttachmentArray) {
        // Combine fileAttachmentsArray with existing files
      setFiles(props.fileAttachmentArray);
    }
  }, []);

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const fileList = [...event.dataTransfer.files];
        setFiles([...files, ...fileList]);

        props.onFilesChange([...files, ...fileList]);
    };

    const handleFileInput = (event) => {
        const fileList = [...event.target.files];
        setFiles([...files, ...fileList]);

        props.onFilesChange([...files, ...fileList]);
    };



    const handleRemoveFile = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);

        props.onFilesChange(newFiles);
    };


    const PreviewIcon = ({icon: Icon, onClick}) => (
        <div onClick={onClick} style={{marginTop: "5px", display: 'flex', justifyContent: 'center'}}>
            <Icon size={150} style={{alignItems: "center"}}/>
        </div>
    );

    const getFilePreview = (file) => {
        const fileExtension = typeof file === 'string' ? file.split('.').pop() : file.name.split('.').pop();

        if (typeof file === 'string') {
            // Handle existing files
            if (['png', 'jpeg', 'jpg'].includes(fileExtension)) {
                return (
                    <PreviewImage
                        src={file}
                        onClick={() => openFileWindow(file)}
                    />
                );
            } else if (['pdf'].includes(fileExtension)) {
                return (
                    <PreviewIcon
                        icon={AiOutlineFilePdf}
                        onClick={() => openFileWindow(file)}
                    />
                );
            } else if (['video'].includes(fileExtension)) {
                return (
                    <PreviewVideo
                        src={URL.createObjectURL(file)}
                        onClick={() => openFileWindow(file)}
                        controls
                    />
                );
            } else if (['js', 'jsx', 'ts', 'tsx', 'php', 'py'].includes(fileExtension)) {
                return (
                    <PreviewIcon
                        icon={VscFileCode}
                        onClick={() => openFileWindow(file)}
                    />
                );
            } else if (['zip'].includes(fileExtension)) {
                return (
                    <PreviewIcon
                        icon={AiOutlineFileZip}
                        onClick={() => openFileWindow(file)}
                    />
                );
            } else {
                // Default preview for other file types
                return (
                    <PreviewIcon
                        icon={AiOutlineFileUnknown}
                        onClick={() => openFileWindow(file)}
                    />
                );
            }
        } else {
            // Handle newly attached files
            if (file.type.includes('image')) {
                return (
                    <PreviewImage
                        src={URL.createObjectURL(file)}
                        onClick={() => openFileWindow(URL.createObjectURL(file))}
                    />
                );
            } else if (file.type.includes('pdf')) {
                return (
                    <PreviewIcon
                        icon={AiOutlineFilePdf}
                        onClick={() => openFileWindow(URL.createObjectURL(file))}
                    />
                );
            } else if (file.type.includes('video')) {
                return (
                    <PreviewVideo
                        src={URL.createObjectURL(file)}
                        onClick={() => openFileWindow(URL.createObjectURL(file))}
                        controls
                    />
                );
            } else if (['js', 'jsx', 'ts', 'tsx', 'php', 'py'].includes(fileExtension)) {
                return (
                    <PreviewIcon
                        icon={VscFileCode}
                        onClick={() => openFileWindow(URL.createObjectURL(file))}
                    />
                );
            } else if (['zip'].includes(fileExtension)) {
                return (
                    <PreviewIcon
                        icon={AiOutlineFileZip}
                        onClick={() => openFileWindow(URL.createObjectURL(file))}
                    />
                );
            } else {
                // Default preview for other file types
                return (
                    <PreviewIcon
                        icon={AiOutlineFileUnknown}
                        onClick={() => openFileWindow(URL.createObjectURL(file))}
                    />
                );
            }
        }
    };

    return (
        <div>
            <UploadContainer onDragOver={handleDragOver} onDrop={handleDrop}>
                <div className="upload-text">Drag and drop files here</div>
                <input
                    className="input"
                    type="file"
                    multiple
                    onChange={handleFileInput}
                />
            </UploadContainer>
            {files.length > 0 ? (
                <div>
                    <AttachmentsBoxTitle>Attachements ({files.length})</AttachmentsBoxTitle>
                    <PreviewContainer>
                        {files.map((file, index) => (
                            <PreviewItem key={index}>
                                <CardContainer>
                                    <Card
                                        hoverable
                                        cover={getFilePreview(file)}
                                        actions={[<DeleteButton
                                            onClick={() => handleRemoveFile(index)}>Remove</DeleteButton>]}
                                        size={"small"}
                                        style={{border: "1px solid grey"}}
                                    >
                                        <Card.Meta title={typeof file === 'string' ? file.split('/').pop() : file.name}
                                                   onClick={() => openFileWindow(typeof file === 'string' ? file : URL.createObjectURL(file))}/>
                                    </Card>
                                </CardContainer>
                            </PreviewItem>
                        ))}
                    </PreviewContainer>

                </div>
            ) : null}
        </div>
    );
}

export default FileUpload;
