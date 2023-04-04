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
  width: ${({ expanded }) => (expanded ? '700px' : '200px')};
  cursor: pointer;

  &:hover {
    max-width: 300px;
  }
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