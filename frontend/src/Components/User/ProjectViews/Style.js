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

