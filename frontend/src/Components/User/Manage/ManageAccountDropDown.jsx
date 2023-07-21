import * as ManageAccountDropDownComponents from './ManageAccountDropDownStyle';
import React, {useEffect, useState} from 'react';
import { faChevronDown, faGlobeAfrica } from '@fortawesome/free-solid-svg-icons';


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
    <ManageAccountDropDownComponents.DropdownContainer className="dropdown-container">
      <ManageAccountDropDownComponents.DropdownButton onClick={handleButtonClick} isOpen={isOpen} style={{backgroundColor: isOpen ? '#253858' : ''}}>
        <ManageAccountDropDownComponents.RightIcon icon={faChevronDown} />
        <ManageAccountDropDownComponents.LeftIcon icon={faGlobeAfrica} />
        Anyone
      </ManageAccountDropDownComponents.DropdownButton>
      {isOpen && (
        <ManageAccountDropDownComponents.DropdownList>
          {props.options.map(option => (
            <ManageAccountDropDownComponents.DropdownItem key={option} onClick={handleItemClick}>
              {option}
            </ManageAccountDropDownComponents.DropdownItem>
          ))}
        </ManageAccountDropDownComponents.DropdownList>
      )}
    </ManageAccountDropDownComponents.DropdownContainer>
  );
};

export default Dropdown;