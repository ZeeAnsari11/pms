import {Button,Modal} from 'antd';

const NotificationModal = ({visible, onCancel, onConfirm, title, content}) => {
    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="confirm" type="primary" onClick={onConfirm}>
                    Confirm
                </Button>,
            ]}
        >
            <h2>{title}</h2>
            <p>{content}</p>
        </Modal>
    );
};

export default NotificationModal;
