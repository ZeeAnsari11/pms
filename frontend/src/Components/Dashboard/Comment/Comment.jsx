import React, {useState} from 'react';
import Avatar from 'react-avatar';
import * as CommentComponents from "./Style"
import {Modal} from "antd";
import ReactQuill from "react-quill";
import DOMPurify from 'dompurify';
import {modules} from "../../../Shared/Const/ReactQuillToolbarOptions";

function Comment({
                     comment,
                     created_at,
                     created_by,
                     commentUserId,
                     currentUser,
                     index,
                     onDelete,
                     onEdit,
                 }) {
    const [editComment, setEditComment] = useState(comment);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleEdit = () => {
        onEdit(index);
        setEditComment(comment);
        setShowEditModal(true);
    };

    const handleSave = () => {
        onEdit(index, editComment);
        setShowEditModal(false);
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

    const sanitizeComment = (comment) => {
        return {
            __html: DOMPurify.sanitize(comment),
        };
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
        <li key={index} style={{listStyle: 'none',}}
        >
            <CommentComponents.CommentContainer>

                <CommentComponents.CommentInfo>
                    <CommentComponents.CommentAuthor>
                        <Avatar
                            name={created_by?.username}
                            size={35}
                            color="#DE350B"
                            round={true}
                            src={`${process.env.REACT_APP_HOST}/${created_by?.userprofile?.image}`}
                            title={created_by?.username}
                            style={{marginRight: '10px'}}
                        />
                        {created_by?.username}
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
                    <CommentComponents.CommentText>
                        <div dangerouslySetInnerHTML={sanitizeComment(comment)}/>
                    </CommentComponents.CommentText>
                    {showEditModal && (
                        <>
                            <Modal
                                title="Edit Comment"
                                open={showEditModal}
                                onCancel={() => setShowEditModal(false)}
                                onOk={handleSave}
                                okButtonProps={{style: {backgroundColor: 'rgb(30, 100, 209)'}}}
                                okText="Save"
                                cancelText="Cancel"
                            >
                                <CommentComponents.CommentAuthor>
                                    <Avatar
                                        name={created_by?.username}
                                        size={35}
                                        color="#DE350B"
                                        round={true}
                                        src={`${process.env.REACT_APP_HOST}/${created_by?.userprofile?.image}`}
                                        title={created_by?.username}
                                        style={{marginRight: '10px'}}
                                    />
                                    {created_by?.username}
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
                                <ReactQuill
                                    modules={modules}
                                    value={editComment}
                                    onChange={(value) => setEditComment(value)}
                                />
                            </Modal>
                        </>
                    )}
                    <>
                        {(commentUserId === currentUser?.id || currentUser?.user?.is_staff) && (
                            <CommentComponents.CommentButtons>
                                <CommentComponents.CommentActionButton
                                    onClick={handleEdit}>
                                    Edit
                                    <CommentComponents.Dot/>
                                </CommentComponents.CommentActionButton>
                                <CommentComponents.CommentActionButton
                                    onClick={handleDelete}>
                                    Delete
                                    <CommentComponents.Dot/>
                                </CommentComponents.CommentActionButton>
                            </CommentComponents.CommentButtons>
                        )}
                    </>
                    {showDeleteConfirmation && (
                        <Modal
                            title="Delete this comment?"
                            open={showDeleteConfirmation}
                            onCancel={cancelDelete}
                            onOk={confirmDelete}
                            okButtonProps={{style: {backgroundColor: 'rgb(30, 100, 209)'}}}
                            okText="Delete"
                            cancelText="Cancel"
                        >
                            <p>
                                <strong>
                                    Once you delete, it's gone for good.
                                </strong>
                            </p>
                        </Modal>
                    )}
                </CommentComponents.CommentInfo>
            </CommentComponents.CommentContainer>
        </li>
    );
}

export default Comment;
