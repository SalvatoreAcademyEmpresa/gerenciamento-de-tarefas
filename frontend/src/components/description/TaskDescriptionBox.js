import React, { useState, useRef, useEffect, useCallback } from "react";
import "./css/TaskDescriptionBox.css";

const CommentBox = ({ onAddComment, index, onClose, existingComment }) => {
  const [newComment, setNewComment] = useState(existingComment);
  const commentBoxRef = useRef(null);

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment, index);
      setNewComment("");
      onClose();
    }
  };

  const handleClickOutside = useCallback(
    (event) => {
      if (
        commentBoxRef.current &&
        !commentBoxRef.current.contains(event.target)
      ) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    setNewComment(existingComment);
  }, [existingComment]);

  return (
    <div className="comment-box-overlay">
      <div className="comment-box" ref={commentBoxRef}>
        <div className="comment-content">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a description here..."
          />
          <button onClick={handleAddComment}>
            {index !== null ? "Save" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
