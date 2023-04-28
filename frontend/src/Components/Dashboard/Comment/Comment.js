import React, {useState} from 'react';
import styled from 'styled-components';
import Avatar from "react-avatar";

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: -35px;
  margin-top: -20px;
  margin-bottom: 30px;
`;

// const Avatar = styled.div`
//   display: inline-block;
//   width: 30px;
//   height: 30px;
//   border-radius: 50%;
//   margin-right: 10px;
//   background-color: #ccc;
//   margin-bottom: 40px;
// `;

const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentAuthor = styled.p`
  font-weight: bold;
  margin-right: 5px;
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
`;


function Comment({comment, index, onDelete, onEdit, selectedComment}) {
    const [editComment, setEditComment] = useState(comment);

    const handleEdit = () => {
        onEdit(index);
        setEditComment(comment);
    };

    const handleSave = () => {
        onEdit(index, editComment);
    };

    const handleDelete = () => {
        onDelete(index);
    };

    return (
        <li key={index} style={{listStyle:'none'}}>
            <CommentContainer>
                {/*<Avatar></Avatar>*/}

                <Avatar
                        name={"User"}
                        size={30}
                        round={true}
                        color="Grey"
                        style={{marginRight: '10px', marginTop:'-40px'}}
                    />

                <CommentInfo>
                    <CommentAuthor>User {index + 1}</CommentAuthor>
                    {selectedComment === index ? (
                        <>
                            <input
                                type="text"
                                placeholder="Edit comment"
                                value={editComment}
                                onChange={(e) => setEditComment(e.target.value)}
                            />
                            <button onClick={handleSave}>Save</button>
                        </>
                    ) : (
                        <>
                            <CommentText>{comment}</CommentText>
                            <CommentButtons>
                                <CommentActionButton onClick={handleEdit}>Edit</CommentActionButton>
                                <CommentActionButton onClick={handleDelete}>Delete</CommentActionButton>
                            </CommentButtons>
                        </>
                    )}
                </CommentInfo>
            </CommentContainer>
        </li>
    );
}

export default Comment