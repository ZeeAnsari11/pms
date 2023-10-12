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
  margin-left: 45px;
  font-size: 14px;
`;

export const CommentEditedText = styled.span`
  font-weight: 400;
  color: #47546b;
  margin-left: 20px;
`;


export const CommentButtons = styled.div`
  display: flex;
  margin-left: 40px;
  align-items: center;
`;

export const CommentActionButton = styled.button`
  background: none;
  border: none;
  color: gray;
  font-weight: bold;
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


