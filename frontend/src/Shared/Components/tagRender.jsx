import React from 'react';
import { Tag } from 'antd';

const tagRender = (props) => {
    const { label, value, closable, onClose } = props;

    const onPreventMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <Tag
            color={value}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{
            marginRight: 3,
            }}
        >
            {label}
        </Tag>
    );
};

export default tagRender;
