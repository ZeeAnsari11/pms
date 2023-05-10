import React from 'react';
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

const GenericSelectField = ({
                                options,
                                isMultiple,
                                placeholder,
                                defaultValue,
                                isDisabled,
                                width,
                                height,
                                onSelectChange
                            }) => {

    const handleSelectChange = (value) => {
        onSelectChange(value);
    };


    return (
        <StyledSelect
            mode={isMultiple ? 'multiple' : undefined}
            placeholder={placeholder}
            defaultValue={defaultValue}
            disabled={isDisabled}
            width={width}
            height={height}
            onChange={handleSelectChange}
        >
            {options.map((option) => (
                <StyledOption key={option.value} value={option.id} icon={option.icon}>
                    {option.icon} {option.label}
                </StyledOption>
            ))}
        </StyledSelect>
    );
};


export default GenericSelectField;
