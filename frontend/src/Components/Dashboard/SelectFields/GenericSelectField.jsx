import React, {useState, useEffect} from "react";
import * as GenericSelectFieldComponents from "./GenericSelectFieldStyle"


const GenericSelectField = ({
                                options,
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
        <GenericSelectFieldComponents.StyledSelect
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
        >
            {options.map((option) => (
                <GenericSelectFieldComponents.StyledOption key={option.value} value={option.id} icon={option.icon}>
                    {option.icon} {option.label}
                </GenericSelectFieldComponents.StyledOption>
            ))}
        </GenericSelectFieldComponents.StyledSelect>
    );
};

export default GenericSelectField;
