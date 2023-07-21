import React from "react";
import Select from "react-select";
import * as MultiSelectFieldComponents from './MultiSelectFieldStyle';

const MultiSelectField = ({
                              options,
                              onSelectChange,
                              width = "100%",
                              defaultValue,
                              placeholder,
                              ...rest
                          }) => {
    const handleSelectChange = (selectedOption) => {
        const selectedValues = selectedOption ? selectedOption.map(option => option.id) : [];
        if (onSelectChange) {
            onSelectChange(selectedValues);
        }
    };

    const defaultValues = Array.isArray(defaultValue) ? defaultValue : [];

    return (
        <Select
            isMulti
            onChange={handleSelectChange}
            {...rest}
            styles={{
                control: provided => ({
                    ...provided,
                    width: width,
                    marginTop: "5px"
                })
            }}
            components={MultiSelectFieldComponents.animatedComponents}
            placeholder={placeholder}
            options={options}
            defaultValue={defaultValues}
            getOptionLabel={(option) => (
                <MultiSelectFieldComponents.Tag color={option.color}>
                    {option.name}
                </MultiSelectFieldComponents.Tag>
            )}
            getOptionValue={(option) => option.id}
        />
    );
};

export default MultiSelectField;
