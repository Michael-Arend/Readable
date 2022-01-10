import { useDispatch } from "react-redux";
import { IComment } from "../Interfaces";
import { VoteForComment, RemoveComment } from "../Store/ActionCreators";

const CommentCard: React.FC<{
  comment: IComment;
  edit: (comment: IComment) => void;
}> = ({ comment, edit }) => {
  const dispatch = useDispatch();

  const HandleVoteClicked = (event: any, comment: IComment, count: number) => {
    event.stopPropagation();
    dispatch(VoteForComment(comment, count));
  };

  const time = () => {
    const date = new Date(comment.timestamp);
    const now = new Date();

    if (now.getTime() - date.getTime() < 60000) return "right now";
    if (now.getTime() - date.getTime() < 3600000) return "some minutes ago";

    return date.toLocaleString();
  };

  const deleteClickedHandler = (event: any) => {
    event.stopPropagation();
    dispatch(RemoveComment(comment));
  };

  const editClickHandler = (event: any) => {
    event.stopPropagation();
    edit(comment);
  };

  return (
    <>
      <div className="postcard-wrapper comment-wrapper">
        <div className="postcard-menu-wrapper">
          <p>...</p>

          <div className="postcard-dropdown">
            <p onClick={editClickHandler}>edit</p>
            <p style={{ color: "#952e2e" }} onClick={deleteClickedHandler}>
              delete
            </p>
          </div>
        </div>
        <div className="postcard-author-wrapper">
          <h3>{comment.author}</h3>
        </div>
        <p className="postcard-time"> {time()}</p>
        <p className="postcard-body">{comment.body}</p>

        <div className="postcard-votes-wrapper">
          <div className="postcard-votes">
            <img src="../like.png" width="20px"></img>
            <span>{comment.voteScore}</span>
          </div>
        </div>
        <div className="postcard-button-wrapper">
          <button
            className="postcard-button"
            onClick={(e) => HandleVoteClicked(e, comment, 1)}
          >
            <img src="../thumbup.png" width="15px"></img>
            like
          </button>
          <button
            className="postcard-button"
            onClick={(e) => HandleVoteClicked(e, comment, -1)}
          >
            <img src="../thumbdown.png" width="15px"></img>
            dislike
          </button>
        </div>
      </div>
    </>
  );
};

export default CommentCard;
