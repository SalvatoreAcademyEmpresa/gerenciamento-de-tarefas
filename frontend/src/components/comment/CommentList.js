import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../comment/css/CommentList.css";
import CommentBox from "./CommentBox";

const CommentList = ({ task, onClose }) => {
  const [comments, setComments] = useState(task.comments || []);
  const [isCommentBoxVisible, setIsCommentBoxVisible] = useState(false);
  const [activeCommentIndex, setActiveCommentIndex] = useState(null);

  const user = "User";

  const hasDescriptionOrComment =
    !!task.description || comments.some((comment) => comment.user === user);

  const handleAddComment = (comment, index) => {
    let updatedComments = [...comments];

    if (index !== null) {
      updatedComments[index].text = comment;
    } else {
      const newCommentObject = {
        text: comment,
        user: user,
        replies: [],
      };
      updatedComments.push(newCommentObject);
    }

    setComments(updatedComments);
    task.comments = updatedComments;
  };

  const handleEditComment = (index) => {
    setActiveCommentIndex(index);
    setIsCommentBoxVisible(true);
  };

  const handleAddDescription = () => {
    setActiveCommentIndex(null);
    setIsCommentBoxVisible(true);
  };

  return (
    <div className="task-details">
      <div className="task-details-icons">
        <FontAwesomeIcon
          icon={faTimes}
          className="task-details-icon"
          onClick={onClose}
        />
      </div>
      <div className="task-details-content">
        <p>{task.description}</p>
      </div>

      <div className="comments-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment-container">
            <div className="comment" onClick={() => handleEditComment(index)}>
              <div className="comment-user">
                <span className="user-icon">{comment.user[0]}</span>
                <span className="user-name">{comment.user}</span>
              </div>
              <div className="comment-text">{comment.text}</div>
            </div>
          </div>
        ))}
      </div>

      {!hasDescriptionOrComment && (
        <div className="task-details-actions">
          <button className="add-comment" onClick={handleAddDescription}>
            Description
          </button>
        </div>
      )}

      {isCommentBoxVisible && (
        <CommentBox
          onAddComment={handleAddComment}
          index={activeCommentIndex}
          onClose={() => setIsCommentBoxVisible(false)}
          existingComment={
            activeCommentIndex !== null ? comments[activeCommentIndex].text : ""
          }
        />
      )}
    </div>
  );
};

export default CommentList;
