import styled from "styled-components";

export const CommentContainer = styled.div`
  display: block;
  align-items: center;
`;

export const EditModalContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 24px;
  grid-column-gap: 16px;

  .ql-toolbar {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    background-color: #f0f2f5;
  }

  .ql-container {
    height: 150px;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    border: 1px solid #ccc;
  }

  .ql-editor {
    padding: 8px;
    font-size: 14px;
  }
`;


export const InputHeading = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const StyledSpan = styled.span`
  display: inline-block;
  background-color: #DFE1E6;
  color: black;
  font-size: 0.8rem;
  padding: 0.1rem 0.5rem;
  border-radius: 40px;
`;

export const CommentButtons = styled.div`
  display: flex;
`;


export const CommentAuthor = styled.p`
  font-weight: bold;
  margin-right: 5px;
`;

export const CommentText = styled.p`
  margin-top: -20px;
  margin-left: 5px;
  font-size: 14px;
`;

export const CommentActionButton = styled.button`
  background: none;
  border: none;
  color: gray;
  font-weight: bold;
  margin-top: 15px;
  cursor: pointer;
  position: relative;
  padding-right: 10px;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

export const Dot = styled.span`
  display: inline-block;
  margin-left: 8px;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: gray;
`;
