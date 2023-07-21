import React from "react";
import Select from "react-select";
import styled from "styled-components";
import makeAnimated from 'react-select/animated';


const animatedComponents = makeAnimated();

const Tag = styled.span`
  background-color: ${(props) => props.color};
  color: #fff;
  padding: 3px 6px;
  border-radius: 3px;
  margin-right: 5px;
`;

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
            components={animatedComponents}
            placeholder={placeholder}
            options={options}
            defaultValue={defaultValues}
            getOptionLabel={(option) => (
                <Tag color={option.color}>
                    {option.name}
                </Tag>
            )}
            getOptionValue={(option) => option.id}
        />
    );
};

export default MultiSelectField;
