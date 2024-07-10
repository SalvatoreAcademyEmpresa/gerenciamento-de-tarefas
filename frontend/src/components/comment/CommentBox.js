import React, { useState, useRef, useEffect, useCallback } from "react";
import "../comment/css/CommentBox.css";

const CommentBox = ({ onAddComment, index, onClose }) => {
  const [newComment, setNewComment] = useState("");
  const commentBoxRef = useRef(null);

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment, index);
      setNewComment("");
      onClose();
    }
  };

  const handleClickOutside = useCallback((event) => {
    if (
      commentBoxRef.current &&
      !commentBoxRef.current.contains(event.target)
    ) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="comment-box-overlay">
      <div className="comment-box" ref={commentBoxRef}>
        <div className="comment-content">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment here..."
          />
          <button onClick={handleAddComment}>Comment</button>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
