import styled from "styled-components";
import {FaSearch, FaTimes} from "react-icons/fa";

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 5px;
  transition: width 0.3s ease-in-out;
  max-width: 300px;
  width: ${({ expanded }) => (expanded ? '600px' : '200px')};
  cursor: pointer;

  &:hover {
    max-width: 300px;
  }
`;

export const SearchResultsContainer = styled.div`
  position: absolute;
  margin: 10px;
  top: 100%;
  left: 60%;
  transform: translateX(-50%);
  width: 50%;
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 10px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
`;


export const SearchIcon = styled(FaSearch)`
  margin-right: 5px;
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
`;

export const CloseIcon = styled(FaTimes)`
  margin-left: 5px;
  cursor: pointer;
`;