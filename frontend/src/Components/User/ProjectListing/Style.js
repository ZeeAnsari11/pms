import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import {Link} from 'react-router-dom';

export const ProjectListingTable = styled.div`
  width: 100%;
  margin-top: 5px;
`;


export const ProjectLink = styled(Link)`
  display: flex;
  align-items: center;
`;

export const ProjectIcon = styled.span`
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 8px;
`;

export const ProjectAvatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const modalStyle = {
    borderRadius: 0,
};


export const NoProjectsMessage = styled.tr`
  text-align: center;
  font-weight: bold;

  td {
    padding: 24px 0;
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
  padding: 10px 40px 10px 30px;
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
    padding: 10px 50px 10px 30px;
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
  @media (min-width: 768px) {
    font-size: 24px;
    left: 20px;
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