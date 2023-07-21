import styled from 'styled-components';
import {FaSearch} from 'react-icons/fa';

export const ProjectsPageContainer = styled.div`
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

export const ProjectsHeaderContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-bottom: 40px;
  }
`;

export const ProjectsHeader = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

export const ProjectButton = styled.button`
  background-color: #0052cc;
  color: #FFFFFF;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #005CA9;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 20px;
  position: relative;

  @media (min-width: 768px) {
    margin-bottom: 40px;
  }
`;

export const SearchInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 300px;
  position: relative;

  @media (min-width: 768px) {
    max-width: 400px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 40px 10px 30px; /* Added left padding of 30px */
  font-size: 16px;
  border: 2px solid #CCCCCC;
  border-radius: 4px;
  margin-right: 10px;
  text-align: center;

  &:hover {
    border-color: #005CA9;
    background: #EBECF0;
  }

  @media (min-width: 768px) {
    padding: 10px 50px 10px 30px; /* Added left padding of 30px */
  }
`;

export const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 1px;
  flex-direction: row-reverse;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #999999;
  //padding-left: 10px;

  @media (min-width: 768px) {
    font-size: 24px;
    left: 20px;
  }
`;