import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import ProjectListing from "../ProjectListing/ProjectListing";
import {Link} from "react-router-dom";

const ProjectsPageContainer = styled.div`
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

const ProjectsHeaderContainer = styled.div`
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

const ProjectsHeader = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const ProjectButton = styled.button`
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

const SearchContainer = styled.div`
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

const SearchInputContainer = styled.div`
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

const SearchInput = styled.input`
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

const SearchIcon = styled(FaSearch)`
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


const ProjectsPage = () => {
    const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const submit = () => {
    window.location.href = '/create-project';
  };

  return (
    <ProjectsPageContainer>
      <ProjectsHeaderContainer>
        <ProjectsHeader>Projects</ProjectsHeader>
        <ProjectButton onClick={submit}>Create Project</ProjectButton>
      </ProjectsHeaderContainer>
      <SearchContainer>
        <SearchInputContainer>
          <SearchIcon />
          <SearchInput type="text" placeholder="Search Projects" value={searchValue} onChange={handleSearchChange} />
        </SearchInputContainer>
      </SearchContainer>
        <ProjectListing/>
        <hr></hr>
      {/* Add your projects list here */}
    </ProjectsPageContainer>
  );
};

export default ProjectsPage;
