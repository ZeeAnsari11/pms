import React, {useState} from 'react';
import styled from 'styled-components';
import Avatar from 'react-avatar';

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: -35px;
  margin-top: -20px;
  margin-bottom: 30px;
`;

const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentAuthor = styled.p`
  font-weight: bold;
  margin-right: 5px;
  margin-top: 5px;
`;

const CommentText = styled.p`
  margin-top: -20px;
  font-size: 14px;
`;

const CommentButtons = styled.div`
  display: flex;
`;

const CommentActionButton = styled.button`
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

const InputField = styled.input`
  width: 456px;
  height: 29px;
  margin-top: 5px; /* Adjust the top margin */
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const ButtonForEditComment = styled.button`
  background-color: rgb(0, 82, 204);
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 3px;
  margin-top: 5px; /* Adjust the top margin */
  padding: 8px 13px;
`;

const DeleteConfirmation = styled.div`
  background-color: #f8f8f8;
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
`;

const DeleteConfirmationText = styled.p`
  margin-bottom: 10px;
`;

const DeleteConfirmationButton = styled.button`
  background-color: #0052CC;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 8px 13px;
  margin-right: 5px;
  cursor: pointer;
`;

function Comment({
                     comment,
                     created_at,
                     created_by,
                     commentUserId,
                     currentUser,
                     index,
                     onDelete,
                     onEdit,
                     selectedComment
                 }) {
    const [editComment, setEditComment] = useState(comment);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const handleEdit = () => {
        onEdit(index);
        setEditComment(comment);
    };

    const handleSave = () => {
        onEdit(index, editComment);
    };

    const handleDelete = () => {
        setShowDeleteConfirmation(true);
    };

    const confirmDelete = () => {
        onDelete(index);
        setShowDeleteConfirmation(false);
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    function formatCreatedAt(created_at) {
        const date = new Date(created_at);

        const day = date.getDate();
        const month = date.toLocaleString('default', {month: 'long'});
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const formattedDate = `${day} ${month} ${year} at ${hours}:${minutes
            .toString()
            .padStart(2, '0')}`;

        return formattedDate;
    }

    return (
        <li key={index} style={{listStyle: 'none'}}>
            <CommentContainer>
                <Avatar
                    name={created_by}
                    size={30}
                    round={true}
                    color="Grey"
                    style={{marginRight: '10px', marginTop: '-40px'}}
                />

                <CommentInfo>
                    <CommentAuthor>
                        {created_by}
                        <span
                            style={{
                                marginLeft: '10px',
                                fontWeight: '500',
                                color: '#42526E'
                            }}
                        >
              {formatCreatedAt(created_at)}
            </span>
                    </CommentAuthor>
                    <CommentText>{comment}</CommentText>
                    {selectedComment === index ? (
                        <>
                            <InputField
                                type="text"
                                placeholder="Edit comment"
                                value={editComment}
                                onChange={(e) => setEditComment(e.target.value)}
                            />
                            <ButtonForEditComment onClick={handleSave}>Save</ButtonForEditComment>
                        </>
                    ) : (
                        <>
                            {commentUserId === currentUser?.id && ( // Added conditional rendering
                                <CommentButtons>
                                    <CommentActionButton onClick={handleEdit}>Edit</CommentActionButton>
                                    <CommentActionButton onClick={handleDelete}>Delete</CommentActionButton>
                                </CommentButtons>
                            )}
                        </>
                    )}
                    {showDeleteConfirmation && (
                        <DeleteConfirmation>
                            <DeleteConfirmationText>
                                Are you sure you want to delete this comment?
                            </DeleteConfirmationText>
                            <DeleteConfirmationButton onClick={confirmDelete}>
                                Yes
                            </DeleteConfirmationButton>
                            <DeleteConfirmationButton onClick={cancelDelete}>
                                No
                            </DeleteConfirmationButton>
                        </DeleteConfirmation>
                    )}
                </CommentInfo>
            </CommentContainer>
        </li>
    );
}

export default Comment;
