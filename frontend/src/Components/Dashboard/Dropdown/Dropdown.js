import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const StyledDropdown = styled.div`
  position: absolute;
  right: 0;
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

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // props.onClose();
      console.log("handleClickOutside Clicked")
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <StyledDropdown ref={dropdownRef} className={props.class}>
      {props.children}
    </StyledDropdown>
  );
}

export default Dropdown;
