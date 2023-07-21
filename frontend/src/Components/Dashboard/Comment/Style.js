import styled from "styled-components";

export const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: -35px;
  margin-top: -20px;
  margin-bottom: 30px;
`;

export const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentAuthor = styled.p`
  font-weight: bold;
  margin-right: 5px;
  margin-top: 5px;
`;

export const CommentText = styled.p`
  margin-top: -20px;
  font-size: 14px;
`;

export const CommentButtons = styled.div`
  display: flex;
`;

export const CommentActionButton = styled.button`
  background: none;
  border: none;
  color: gray;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  padding-right: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

export const InputField = styled.input`
  width: 456px;
  height: 29px;
  margin-top: 5px; /* Adjust the top margin */
  border: 1px solid #ccc;
  border-radius: 3px;
`;

export const ButtonForEditComment = styled.button`
  background-color: rgb(0, 82, 204);
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 3px;
  margin-top: 5px; /* Adjust the top margin */
  padding: 8px 13px;
`;

export const DeleteConfirmation = styled.div`
  background-color: #f8f8f8;
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
`;

export const DeleteConfirmationText = styled.p`
  margin-bottom: 10px;
`;

export const DeleteConfirmationButton = styled.button`
  background-color: #0052CC;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 8px 13px;
  margin-right: 5px;
  cursor: pointer;
`;
