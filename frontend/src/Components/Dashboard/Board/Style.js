import styled from "styled-components";

export const BoardContainer = styled.div`
  min-width: 290px;
  width: 290px;
  max-height: 100%;
  flex-basis: 290px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #ebebeb;
  margin-top: 15px;
  border-radius: 10px;
`;

export const BoardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BoardTopTitle = styled.p`
  margin-left: 10px;
  width: 100%;
`;

export const BoardTopMore = styled.button`
  position: relative;
  cursor: pointer;
  float: right;
  padding: 4px;
  height: 29px;
  width: 35px;
  margin-right: 5px;
  border: none;
  border-radius: 3px;

  &:hover {
    background-color: white;
  }

  &:active {
    background-color: #253858;
  }

  &:focus {
    background-color: #253858;
  }
`;


export const BoardDropdown = styled.div`
  box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.12);
  width: 100px !important;
  cursor: default;
  border-radius: 3px;
  margin-top: 25px;
  background-color: whitesmoke;


  p {
    cursor: pointer;
  }

  &:hover {
    background-color: #DADADA;
  }
`;


export const BoardCards = styled.div`
  background-color: #ebebeb;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
`;

export const ParagraphWrapper = styled.p`

`;