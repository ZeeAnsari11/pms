import React, {useState} from 'react';
import Avatar from 'react-avatar';
import * as CommentComponents from "./Style"


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
            <CommentComponents.CommentContainer>
                <Avatar
                    name={created_by}
                    size={30}
                    round={true}
                    color="Grey"
                    style={{marginRight: '10px', marginTop: '-40px'}}
                />

                <CommentComponents.CommentInfo>
                    <CommentComponents.CommentAuthor>
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
                    </CommentComponents.CommentAuthor>
                    <CommentComponents.CommentText>{comment}</CommentComponents.CommentText>
                    {selectedComment === index ? (
                        <>
                            <CommentComponents.InputField
                                type="text"
                                placeholder="Edit comment"
                                value={editComment}
                                onChange={(e) => setEditComment(e.target.value)}
                            />
                            <CommentComponents.ButtonForEditComment
                                onClick={handleSave}>Save</CommentComponents.ButtonForEditComment>
                        </>
                    ) : (
                        <>
                            {(commentUserId === currentUser?.id || currentUser?.user?.is_staff) && ( // Added conditional rendering
                                <CommentComponents.CommentButtons>
                                    <CommentComponents.CommentActionButton
                                        onClick={handleEdit}>Edit</CommentComponents.CommentActionButton>
                                    <CommentComponents.CommentActionButton
                                        onClick={handleDelete}>Delete</CommentComponents.CommentActionButton>
                                </CommentComponents.CommentButtons>
                            )}
                        </>
                    )}
                    {showDeleteConfirmation && (
                        <CommentComponents.DeleteConfirmation>
                            <CommentComponents.DeleteConfirmationText>
                                Are you sure you want to delete this comment?
                            </CommentComponents.DeleteConfirmationText>
                            <CommentComponents.DeleteConfirmationButton onClick={confirmDelete}>
                                Yes
                            </CommentComponents.DeleteConfirmationButton>
                            <CommentComponents.DeleteConfirmationButton onClick={cancelDelete}>
                                No
                            </CommentComponents.DeleteConfirmationButton>
                        </CommentComponents.DeleteConfirmation>
                    )}
                </CommentComponents.CommentInfo>
            </CommentComponents.CommentContainer>
        </li>
    );
}

export default Comment;
