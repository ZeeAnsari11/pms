import {Upload} from 'antd';
import React, {useState} from 'react';
import * as PhotoUploadComponents from './Style';


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
            <PhotoUploadComponents.ButtonUpload>Upload a photo</PhotoUploadComponents.ButtonUpload>
        </Upload>
    );
};

export default FileUploaderButton;
