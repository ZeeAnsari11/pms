import React, {useState} from "react";
import {Select} from "antd";
import styled from "styled-components";
import {FaUserCircle} from "react-icons/fa";

const {Option} = Select;

const UserSelectContainer = styled.div`
  display: flex;
  align-items: center;

  .ant-select {
    border-radius: 9999px; /* set border-radius to a large value */
  }
`;

const UserIcon = ({user}) => {
    const defaultIcon = <FaUserCircle/>;
    const iconUrl = user && user.iconUrl;

    const userIcon = iconUrl ? (
        <img src={iconUrl} alt="User icon" style={{width: "10px", height: "10px"}}/>
    ) : (
        defaultIcon
    );

    return <span style={{marginRight: "8px"}}>{userIcon}</span>;
};

const UserSelect = ({users, isMultiple, placeholder, defaultValue, width = "100%", ...rest}) => {
    const [value, setValue] = useState(undefined);

    const handleChange = (value) => {
        setValue(value);
    };

    const filterOption = (input, option) => {
        const optionLabel = option.props.children;
        if (typeof optionLabel === "string") {
            return optionLabel.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }
        return false;
    };

    return (
        <Select
            mode={isMultiple ? 'multiple' : undefined}
            style={{
                width: width,
                marginTop: "5px"
            }}
            placeholder={placeholder}
            showSearch={true}
            filterOption={filterOption}
            value={value}
            defaultValue={defaultValue}
            allowClear
            onChange={handleChange}
            {...rest}
        >
            {users.map((user) => (
                <Option key={user.id} value={user.id}>
                    <UserSelectContainer>
                        <UserIcon user={user}/>
                        {user.username}
                    </UserSelectContainer>
                </Option>
            ))}
        </Select>
    );
};

export default UserSelect;
