import { useState } from 'react';
import styled from 'styled-components';

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: #ccc;
  margin-bottom: 40px;
`;

const CommentButtons = styled.div`
  display: flex;
`;

const CommentAuthor = styled.p`
  font-weight: bold;
  margin-right: 5px;
`;

const CommentText = styled.p`
  margin-top: -20px;
  font-size: 14px;
`;

const CommentActionButton = styled.button`
  background: none;
  border: none;
  color: gray;
  font-weight: bold;
  cursor: pointer;
`;





function Worklog({ worklog, index, onDelete, onEdit, selectedWorklog }) {
  const [editWorklog, setEditWorklog] = useState(worklog);

  const handleEdit = () => {
    onEdit(index);
    setEditWorklog(worklog);
  };

  const handleSave = () => {
    onEdit(index, editWorklog);
  };

  const handleDelete = () => {
    onDelete(index);
  };

  return (
    <li key={index} style={{listStyle:'none'}}>
      <CommentContainer>
        <Avatar></Avatar>
          <CommentButtons>
            <CommentAuthor>{worklog.username}</CommentAuthor>
            <p>logged <strong>{worklog.timeTracked} hours</strong></p>
          </CommentButtons>
              <CommentText>{worklog.description}</CommentText>
              <CommentButtons>
                <CommentActionButton onClick={handleEdit}>
                  Edit
                </CommentActionButton>
                <CommentActionButton onClick={handleDelete}>
                  Delete
                </CommentActionButton>
              </CommentButtons>
      </CommentContainer>
    </li>
  );
}

export default Worklog;
