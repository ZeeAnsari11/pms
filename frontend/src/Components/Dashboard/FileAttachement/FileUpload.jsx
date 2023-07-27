import React, {useState, useEffect} from "react";
import * as FileUploadComponents from "./Style";
import {Card} from 'antd';
import {VscFileCode} from "react-icons/vsc";
import {AiOutlineFileZip, AiOutlineFilePdf, AiOutlineFileUnknown} from 'react-icons/ai'

function FileUpload(props) {
    const [files, setFiles] = useState([]);
    const openFileWindow = (src) => {
        window.open(src, '_blank');
    }

    useEffect(() => {
        if (props.fileAttachmentArray) {
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
                    <FileUploadComponents.PreviewImage
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
                    <FileUploadComponents.PreviewVideo
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
                    <FileUploadComponents.PreviewImage
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
                    <FileUploadComponents.PreviewVideo
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
            <FileUploadComponents.UploadContainer onDragOver={handleDragOver} onDrop={handleDrop}>
                <div className="upload-text">Drag and drop files here</div>
                <input
                    className="input"
                    type="file"
                    multiple
                    onChange={handleFileInput}
                />
            </FileUploadComponents.UploadContainer>
            {files.length > 0 ? (
                <div>
                    <FileUploadComponents.AttachmentsBoxTitle>Attachements
                        ({files.length})</FileUploadComponents.AttachmentsBoxTitle>
                    <FileUploadComponents.PreviewContainer width={props.width}>
                        {files.map((file, index) => (
                            <FileUploadComponents.PreviewItem key={index}>
                                <FileUploadComponents.CardContainer>
                                    <Card
                                        hoverable
                                        cover={getFilePreview(file)}
                                        actions={[<FileUploadComponents.DeleteButton
                                            onClick={() => handleRemoveFile(index)}>Remove</FileUploadComponents.DeleteButton>]}
                                        size={"small"}
                                        style={{border: "1px solid grey"}}
                                    >
                                        <Card.Meta title={typeof file === 'string' ? file.split('/').pop() : file.name}
                                                   onClick={() => openFileWindow(typeof file === 'string' ? file : URL.createObjectURL(file))}/>
                                    </Card>
                                </FileUploadComponents.CardContainer>
                            </FileUploadComponents.PreviewItem>
                        ))}
                    </FileUploadComponents.PreviewContainer>

                </div>
            ) : null}
        </div>
    );
}

export default FileUpload;
