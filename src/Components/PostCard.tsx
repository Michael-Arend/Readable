import { VoteForPost, RemovePost } from "../Store/ActionCreators";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IPost, IComment } from "../Interfaces";
import CommentCard from "./CommentCard";
import { useState } from "react";
import NewComment from "./NewComment";
import NewPost from "./NewPost";

const PostCard: React.FC<{ post: IPost; commentsVisible: boolean }> = ({
  post,
  commentsVisible,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editableComment, setEditableComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const HandleVoteClicked = (event: any, post: IPost, count: number) => {
    event.stopPropagation();
    dispatch(VoteForPost(post, count));
  };

  const time = () => {
    const date = new Date(post.timestamp);
    const now = new Date();

    if (now.getTime() - date.getTime() < 60000) return "right now";
    if (now.getTime() - date.getTime() < 3600000) return "some minutes ago";

    return date.toLocaleString();
  };

  const deleteClickedHandler = (event: any) => {
    event.stopPropagation();
    dispatch(RemovePost(post));
  };

  const categoryClickedHandler = (event: any) => {
    event.stopPropagation();
    navigate(`/${post.category}`);
  };

  const HandleCommentEdited = (comment: IComment) => {
    setEditableComment(comment.id);
  };

  return (
    <>
      {isEditing ? (
        <NewPost
          post={post}
          setEditCompleted={() => setIsEditing(false)}
        ></NewPost>
      ) : (
        <div className="postcard-wrapper">
          <div className="postcard-menu-wrapper">
            <p>...</p>

            <div className="postcard-dropdown">
              <p onClick={() => setIsEditing(true)}>edit</p>
              <p style={{ color: "#952e2e" }} onClick={deleteClickedHandler}>
                delete
              </p>
            </div>
          </div>
          <div className="postcard-author-wrapper">
            <h3>{post.author}</h3>
            <p
              style={{ cursor: "pointer" }}
              onClick={categoryClickedHandler}
              className="postcard-category"
            >
              @{post.category}
            </p>
          </div>
          <p className="postcard-time"> {time()}</p>

          <h5>{post.title}</h5>
          <p className="postcard-body">{post.body}</p>

          <div className="postcard-votes-wrapper">
            <div className="postcard-votes">
              <img src="../like.png" width="20px"></img>
              <span>{post.voteScore}</span>
            </div>
            <p>{post.commentCount} comments</p>
          </div>
          <div className="postcard-button-wrapper">
            <button
              className="postcard-button"
              onClick={(e) => HandleVoteClicked(e, post, 1)}
            >
              <img src="../thumbup.png" width="15px"></img>
              like
            </button>
            <button
              className="postcard-button"
              onClick={(e) => HandleVoteClicked(e, post, -1)}
            >
              <img src="../thumbdo wn.png" width="15px"></img>
              dislike
            </button>
            {!commentsVisible && (
              <button className="postcard-button">
                <img src="../comment.png" width="15px"></img>
                comment
              </button>
            )}
          </div>
        </div>
      )}
      {commentsVisible && (
        <div>
          <h3>comments:</h3>
          <div style={{ marginBottom: "90px" }}>
            <NewComment parentId={post.id}></NewComment>
          </div>
          {post.comments != undefined &&
            post.comments.map((c: IComment) => (
              <div key={c.id}>
                {editableComment === c.id ? (
                  <NewComment
                    setEditCompleted={() => setEditableComment("0")}
                    parentId={c.parentId}
                    comment={c}
                  ></NewComment>
                ) : (
                  <CommentCard
                    comment={c}
                    edit={HandleCommentEdited}
                  ></CommentCard>
                )}
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default PostCard;
