import {Select} from "antd";
import styled from "styled-components";
import Avatar from 'react-avatar';
import React from "react";

export const {Option} = Select;

export const UserSelectContainer = styled.div`
  display: flex;
  align-items: center;

  .ant-select {
    border-radius: 9999px; /* set border-radius to a large value */
  }
`;

export const UserIcon = ({user}) => {
    const defaultAvatarStyle = {
        width: "30px",
        height: "30px",
        marginRight: "8px",
    };

    const avatarSrc = user && user.iconUrl;

    // Check if avatarSrc contains a protocol (e.g., http:// or https://)
    const hasProtocol = /^https?:\/\//i.test(avatarSrc);

    // Add the prefix if avatarSrc doesn't have a protocol
    const prefixedAvatarSrc = hasProtocol ? avatarSrc : `${process.env.REACT_APP_HOST}/${avatarSrc}`;

    return (
        <Avatar
            src={prefixedAvatarSrc}
            name={user ? user.username : ''}
            round
            size="30"
            title={user ? user.username : ''}
            style={defaultAvatarStyle}
        />
    );
};
