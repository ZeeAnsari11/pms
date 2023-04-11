import {useState} from 'react';

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
            <div className="comment-container">
                <div className="avatar"></div>
                <div className="comment-info">
                    <p className="comment-author">User {index + 1}</p>
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
                            <p className="comment-text">{comment}</p>
                            <div className="comment-buttons">
                                <button className="comment-action-button" onClick={handleEdit}>Edit</button>
                                <button className="comment-action-button" onClick={handleDelete}>Delete</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </li>
    );
}

export default Comment