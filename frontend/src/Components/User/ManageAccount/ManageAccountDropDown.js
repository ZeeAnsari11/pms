import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from "react";
import { faChevronDown, faGlobeAfrica } from '@fortawesome/free-solid-svg-icons';


const DropdownContainer = styled.div`
  position: relative;
  width: 165px;
  margin-left: -10px;
`;

const DropdownButton = styled.button`
  background-color: transparent;
  font-weight: bold;
  border: none;
  border-radius: 3px;
  width: 100%;
  padding: 10px 65px 10px 20px; /* Adjusted padding */
  box-sizing: border-box;
  font-size: 14px; /* Adjusted font-size */
  color: ${props => props.isOpen ? '#fff' : '#000'};
  margin-right: 100px;
  
  &:hover {
    background-color: #f5f5f5;
  }
  &:focus {
    outline: none;
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fdfdfd;
  list-style: none;
  margin: 0;
  padding: 0;
  box-shadow: var(--ds-shadow-raised, 0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px 1px rgba(9, 30, 66, 0.13));
`;

const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const LeftIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
`;

const RightIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  font-weight: bold;
`;



const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  //const options = ['Option 1', 'Option 2', 'Option 3'];

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (event.target.closest('.dropdown-container') === null) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <DropdownContainer className="dropdown-container">
      <DropdownButton onClick={handleButtonClick} isOpen={isOpen} style={{backgroundColor: isOpen ? '#253858' : ''}}>
        <RightIcon icon={faChevronDown} />
        <LeftIcon icon={faGlobeAfrica} />
        Anyone
      </DropdownButton>
      {isOpen && (
        <DropdownList>
          {props.options.map(option => (
            <DropdownItem key={option} onClick={handleItemClick}>
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;