import styled from "styled-components";

export const StyledChip = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 4px 8px;
  color: #fff;
  background-color: ${props => props.color || 'gray'};
  border-radius: 40px;
  font-size: 14px;
  width: fit-content;
  margin-right: 5px;
  margin-bottom: 5px;

  svg {
    height: 16px;
    width: 16px;
    cursor: pointer;
  }
`;
