import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { IComment } from "../Interfaces";
import { CreateNewComment, UpdateComment } from "../Store/ActionCreators";

const NewComment: React.FC<{
  parentId: string;
  setEditCompleted?: () => void;
  comment?: IComment;
}> = ({ parentId, setEditCompleted, comment }) => {
  const text = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (text.current != null && comment != null)
      text.current.value = comment.body;
  }, []);

  if (comment !== undefined) {
    console.log(text.current);
    if (text.current != null) text.current.value = comment.body;
  }

  const sendNewCommentHandler = () => {
    if (comment !== undefined && text.current !== null) {
      comment = { ...comment, body: text.current.value };
      dispatch(UpdateComment(comment));
      if (text.current != null) text.current.value = "";
      setEditCompleted != null && setEditCompleted();
      return;
    }

    const newComment: IComment = {
      id: comment !== undefined ? comment.id : "0",
      parentId,
      timestamp: Date.now(),
      body: text.current != null ? text.current.value : "",
      author: "John Doe",
      voteScore: comment !== undefined ? comment.voteScore : 0,
      deleted: false,
      parentDeleted: false,
    };

    dispatch(CreateNewComment(newComment));
    if (text.current != null) text.current.value = "";
  };

  const editCanceledHandler = () => {
    if (text.current != null) text.current.value = "";
    setEditCompleted != null && setEditCompleted();
    return;
  };

  return (
    <div className="postcard-wrapper new-comment-wrapper">
      {comment !== undefined && (
        <button className="edit-close-button" onClick={editCanceledHandler}>
          x
        </button>
      )}

      <h5>{comment !== undefined ? "Edit Comment" : "Create a new Comment"}</h5>
      <textarea ref={text} placeholder="What´s your comment?" />

      <button className="light-button" onClick={sendNewCommentHandler}>
        <img src="../plane.png" width="15px"></img>
        send
      </button>
    </div>
  );
};

export default NewComment;
