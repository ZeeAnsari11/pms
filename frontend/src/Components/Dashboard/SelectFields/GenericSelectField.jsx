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


    return (
        <GenericSelectFieldComponents.StyledSelect
            mode={isMultiple ? 'multiple' : undefined}
            style={{
                width: width,
                marginTop: "5px"
            }}
            showSearch
            optionFilterProp="value"
            placeholder={placeholder}
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
