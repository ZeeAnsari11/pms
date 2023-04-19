import React from 'react';
import { X } from 'react-feather';
import styled from 'styled-components';

const StyledChip = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 4px 8px;
  color: #fff;
  background-color: ${props => props.color || 'gray'};
  border-radius: 40px;
  font-size: 14px;
  width: fit-content;

  svg {
    height: 16px;
    width: 16px;
    cursor: pointer;
  }
`;

function Chip(props) {
  return (
    <StyledChip color={props.color}>
      {props.text}
      {props.close && (
        <X onClick={() => (props.onClose ? props.onClose() : '')} />
      )}
    </StyledChip>
  );
}

export default Chip;
