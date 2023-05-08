import React, {useState} from 'react';
import {Select} from 'antd';
import styled from 'styled-components';

const {Option} = Select;

const StyledSelect = styled(Select)`
  width: ${({width}) => width ? width : '70%'};
  height: ${({height}) => height ? height : '32px'};

`;

const StyledOption = styled(Option)`
  color: ${({icon}) => icon && '#1890ff'};
  padding-left: ${({icon}) => icon && '30px'};
`;

const GenericSelectField = ({options, isMultiple, placeholder, defaultValue, isDisabled, width, height, onSelect}) => {
    const [selectedValues, setSelectedValues] = useState(defaultValue);

    const handleSelectChange = (values) => {
        setSelectedValues(values);
        onSelect(values); // Pass selected values back to parent component
    };

    return (
        <StyledSelect
            mode={isMultiple ? 'multiple' : undefined}
            placeholder={placeholder}
            value={selectedValues}
            onChange={handleSelectChange}
            disabled={isDisabled}
            width={width}
            height={height}
        >
            {options.map((option) => (
                <StyledOption key={option.value} value={option.label} icon={option.icon}>
                    {option.icon} {option.label}
                </StyledOption>
            ))}
        </StyledSelect>
    );
};


export default GenericSelectField;
