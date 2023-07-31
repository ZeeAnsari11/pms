import styled from "styled-components";

export const ModalTitleStyling = styled.div`
  width: 100%;
`;

export const CardInfoBoxCustom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 25px;
`;

export const CardInfoBoxTitle = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const CardInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TaskList = styled.div`
  margin: 8px 0 25px;
`;


export const StyledSlug = styled.div`
  color: #0847A6;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const ModalTitle = styled.div`
  width: fit-content;
`;

export const Task = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;


export const ActivityButton = styled.button`
  cursor: pointer;
  border-radius: 5px;
  background-color: #F4F5F7;
  color: black;
  border: none;
  transition: 100ms ease;
  padding: 10px;
  font-size: inherit;
`;

export const CommentInput = styled.input`
  flex: 1;
  margin-right: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

export const CommentButton = styled.button`
  padding: 8px 12px;
  background-color: #0052cc;
  color: #fff;
  border: none;
  border-radius: 3px;
`;

export const FormContainer = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;


export const CardInfoClose = styled.div`
  gap: 10px;
  padding-bottom: 50px;
`;

export const CardInfoBoxClose = styled.div`
  float: right;
`;