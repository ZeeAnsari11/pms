import {Upload} from 'antd';
import React, {useState} from 'react';
import styled from 'styled-components';



const Buttonupload = styled.button`
  margin-left: 170px;
  background-color: #F5F6F8;
  border-radius: 5%;
  border: none;
  color: #050303;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #EBECF0;
  }
`;


const FileUploaderButton = ({handleUpload}) => {

    const [image, setImage] = useState(null);
    const props = {
        name: 'file',
        action: '/api/upload',
        onChange(info) {
            if (info.file) {
                console.log(`${info.file.name} file uploaded successfully`);
                handleUpload(info.file.name);
                setImage(info.file);
            }
        },
    };

    return (
        <Upload {...props} style={{
            marginLeft: '170px',
        }} accept=".jpg,.jpeg,.png" showUploadList={false}>
            <Buttonupload>Upload a photo</Buttonupload>
        </Upload>
    );
};

export default FileUploaderButton;
