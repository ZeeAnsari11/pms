import React, {useState} from "react";
import styled from "styled-components";
import Avatar from "react-avatar";

const CommentContainer = styled.div`
  display: block;
  align-items: center;
`;

// const Avatar = styled.div`
//   display: inline-block;
//   width: 30px;
//   height: 30px;
//   border-radius: 50%;
//   background-color: #ccc;
//   margin-left: -40px;
//   margin-bottom: -48px;
//   //margin-bottom: 40px;
// `;

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

function Worklog({worklog, index, onDelete, onEdit}) {
    const [editWorklog, setEditWorklog] = useState(worklog);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleEdit = () => {
        onEdit(index);
        setEditWorklog(worklog);
    };

    const handleSave = () => {
        onEdit(index, editWorklog);
    };

    const handleDelete = () => {
        setShowDeleteDialog(true);
    };

    const confirmDelete = () => {
        onDelete(index);
        setShowDeleteDialog(false);
    };

    const cancelDelete = () => {
        setShowDeleteDialog(false);
    };

    return (
        <li key={index} style={{listStyle: "none"}}>
            <CommentContainer>
                <Avatar
                    name={worklog.username}
                    size={30}
                    round={true}
                    color="Silver"
                    style={{marginRight: '10px', marginBottom: '-75px', marginLeft: '-40px'}}
                />
                <CommentButtons>
                    <CommentAuthor>{worklog.username}</CommentAuthor>
                    <p>
                        logged <strong>{worklog.timeTracked} hours</strong>
                    </p>
                </CommentButtons>
                <CommentText>{worklog.description}</CommentText>
                {/*<CommentButtons>*/}
                <CommentActionButton onClick={handleEdit}>Edit</CommentActionButton>
                <CommentActionButton onClick={handleDelete}>
                    Delete
                </CommentActionButton>
                {/*</CommentButtons>*/}
            </CommentContainer>
            {showDeleteDialog && (
                <div>
                    <p>Are you sure you want to delete this worklog?</p>
                    <button onClick={confirmDelete}>Yes</button>
                    <button onClick={cancelDelete}>No</button>
                </div>
            )}
        </li>
    );
}

export default Worklog;
