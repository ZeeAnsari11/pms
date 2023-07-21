import React, {useState, useEffect} from "react";
import {Select} from "antd";
import * as UserSelectFieldComponents from "./UserSelectFieldStyle"

const UserSelect = ({
                        users,
                        isMultiple,
                        placeholder,
                        isDisabled,
                        defaultValue,
                        width = "100%",
                        onSelectChange,
                        ...rest
                    }) => {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    const handleSelectChange = (value) => {
        setValue(value);
        onSelectChange(value);
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
            disabled={isDisabled}
            onChange={handleSelectChange}
            {...rest}
        >
            {users.map((user) => (
                <UserSelectFieldComponents.Option key={user.id} value={user.id}>
                    <UserSelectFieldComponents.UserSelectContainer>
                        <UserSelectFieldComponents.UserIcon user={user}/>
                        {user.username}
                    </UserSelectFieldComponents.UserSelectContainer>
                </UserSelectFieldComponents.Option>
            ))}
        </Select>
    );
};

export default UserSelect;
