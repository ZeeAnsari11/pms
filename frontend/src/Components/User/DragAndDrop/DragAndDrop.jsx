import {Upload, message} from 'antd';
import {CloudUploadOutlined} from '@ant-design/icons';

const {Dragger} = Upload;

const PhotoUploader = ({handleUploadfForDragAndDrop}) => {

    const handleUpload = (info) => {
        if (info.file) {
            console.log(`${info.file.name} file uploaded successfully.`);
            handleUploadfForDragAndDrop(info.file.name);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const draggerStyle = {
        width: '160px',
        height: '440px',
        borderRadius: '70%',
        marginLeft: '155px',
    };

    return (
        <Dragger
            name="photo"
            multiple={false}
            accept=".jpg,.jpeg,.png"
            action="/api/upload"
            onChange={handleUpload}
            style={draggerStyle}
            showUploadList={false}
        >
            <p className="ant-upload-drag-icon">
                <CloudUploadOutlined/>
            </p>

            <p style={{fontSize: '12px'}}>
              Drag and drop here
            </p>
        </Dragger>
    );
};

export default PhotoUploader;
