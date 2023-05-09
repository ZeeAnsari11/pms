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
`;

const InputField = styled.input`
    width: 456px;
    height: 29px;
    margin-left: -43px;
    border: 1px solid #ccc;
    border-radius: 3px;
`;

const ButtonForEditComment = styled.button`
    background-color: rgb(0, 82, 204);
    color: rgb(255, 255, 255);
    border: none;
    border-radius: 3px;
    margin-left: 428px;
    padding: 8px 13px;
    margin-top: -32px;
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