import {Select} from "antd";
import styled from "styled-components";
import {FaUserCircle} from "react-icons/fa";
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
    const defaultIcon = <FaUserCircle/>;
    const iconUrl = user && user.iconUrl;

    const userIcon = iconUrl ? (
        <img src={iconUrl} alt="User icon" style={{width: "10px", height: "10px"}}/>
    ) : (
        defaultIcon
    );

    return <span style={{marginRight: "8px"}}>{userIcon}</span>;
};