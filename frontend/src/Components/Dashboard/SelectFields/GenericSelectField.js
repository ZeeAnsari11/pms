import React from 'react';
import {Select} from 'antd';
import styled from 'styled-components';

const {Option} = Select;

const StyledSelect = styled(Select)`
  width: 70%;
`;

const StyledOption = styled(Option)`
  color: ${({icon}) => icon && '#1890ff'};
  padding-left: ${({icon}) => icon && '30px'};
`;

const GenericSelectField = ({options, isMultiple, placeholder, defaultValue, isDisabled}) => {
    return (
        <StyledSelect
            mode={isMultiple ? 'multiple' : undefined}
            placeholder={placeholder}
            defaultValue={defaultValue}
            disabled={isDisabled}
        >
            {options.map((option) => (
                <StyledOption key={option.value} value={option.value} icon={option.icon}>
                    {option.icon} {option.label}
                </StyledOption>
            ))}
        </StyledSelect>
    );
};


export default GenericSelectField;
