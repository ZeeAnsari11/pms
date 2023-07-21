import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const DropdownContainer = styled.div`
  position: relative;
  width: 165px;
  margin-left: -10px;
`;

export const DropdownButton = styled.button`
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

export const DropdownList = styled.ul`
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

export const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const LeftIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
`;

export const RightIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  font-weight: bold;
`;