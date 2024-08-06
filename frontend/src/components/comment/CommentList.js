import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faComment } from "@fortawesome/free-solid-svg-icons";
import "../comment/css/CommentList.css";
import CommentBox from "./CommentBox";

const CommentList = ({ task, onClose }) => {
  const [comments, setComments] = useState(task.comments || []);
  const [isCommentBoxVisible, setIsCommentBoxVisible] = useState(false);
  const [activeCommentIndex, setActiveCommentIndex] = useState(null);

  const users = ["Alice", "Bob", "Charlie"];

  const getRandomUser = () => users[Math.floor(Math.random() * users.length)];

  const handleAddComment = (comment, index) => {
    const newCommentObject = {
      text: comment,
      user: comments.length === 0 ? "Jordan" : getRandomUser(),
      replies: [],
    };

    let updatedComments;
    if (index !== null) {
      updatedComments = [...comments];
      updatedComments[index].replies.push(newCommentObject);
    } else {
      updatedComments = [...comments, newCommentObject];
    }

    setComments(updatedComments);
    task.comments = updatedComments;
  };

  const handleReply = (index) => {
    setIsCommentBoxVisible(true);
    setActiveCommentIndex(index);
  };

  const openGoogleReminder = () => {
    const url = "https://calendar.google.com/calendar/u/0/r";
    window.location.href = url;
  };

  return (
    <div className="task-details">
      <div className="task-details-header">
        <div className="task-details-header-content">
          <h3>{task.title}</h3>
        </div>

        <div className="task-details-icons">
          <FontAwesomeIcon
            icon={faTimes}
            className="task-details-icon"
            onClick={onClose}
          />
        </div>
      </div>

      <div className="task-details-content">
        <p>{task.description}</p>
      </div>

      <div className="comments-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment-container">
            <div className="comment" onClick={() => handleReply(index)}>
              <div className="comment-user">
                <span className="user-icon">{comment.user[0]}</span>
                <span className="user-name">{comment.user}</span>
              </div>

              <div className="comment-text">{comment.text}</div>
            </div>

            {comment.replies && comment.replies.length > 0 && (
              <div className="replies-list">
                {comment.replies.map((reply, replyIndex) => (
                  <div key={replyIndex} className="comment reply">
                    <div className="comment-user">
                      <span className="user-icon">{reply.user[0]}</span>
                      <span className="user-name">{reply.user}</span>
                    </div>

                    <div className="comment-text">{reply.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="task-details-actions">
        <button className="add-reminder" onClick={openGoogleReminder}>
          Add reminder
        </button>

        <FontAwesomeIcon
          icon={faComment}
          className="task-details-icon"
          onClick={() => {
            setActiveCommentIndex(null);
            setIsCommentBoxVisible(true);
          }}
        />
      </div>

      {isCommentBoxVisible && (
        <CommentBox
          onAddComment={handleAddComment}
          index={activeCommentIndex}
          onClose={() => setIsCommentBoxVisible(false)}
        />
      )}
    </div>
  );
};

export default CommentList;
