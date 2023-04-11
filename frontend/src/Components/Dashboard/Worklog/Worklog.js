import { useState } from 'react';

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
      <div className="comment-container">
        <div className="avatar"></div>
        <div className="worklog-info">
          <div className="comment-buttons">
            <p className="comment-author">{worklog.username}</p>
            <p className="time-tracked">logged <strong>{worklog.timeTracked} hours</strong></p>
          </div>
              <p className="comment-text">{worklog.description}</p>
              <div className="comment-buttons">
                <button className="comment-action-button" onClick={handleEdit}>
                  Edit
                </button>
                <button className="comment-action-button" onClick={handleDelete}>
                  Delete
                </button>
              </div>
        </div>
      </div>
    </li>
  );
}

export default Worklog;
