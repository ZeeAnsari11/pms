import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const StyledDropdown = styled.div`
  position: absolute;
  right: 0;
  //top: 100%;
  //background-color: #fff;
  //border-radius: 3px;
  margin-right: 5px;
  margin-top: -20px;
  min-height: 40px;
  min-width: 80px;
  width: fit-content;
  height: fit-content;
  max-width: 250px;
  max-height: 390px;
  overflow-y: auto;
  z-index: 5;
`;

function Dropdown(props) {
  const dropdownRef = useRef();

  const handleClick = (event) => {
    if (dropdownRef && !dropdownRef?.current?.contains(event?.target)) {
      if (props.onClose) props.onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  return (
    <StyledDropdown ref={dropdownRef} className={props.class}>
      {props.children}
    </StyledDropdown>
  );
}

export default Dropdown;
