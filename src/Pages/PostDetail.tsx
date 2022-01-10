import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStateOrAny, useDispatch } from "react-redux";
import { IPost } from "../Interfaces";
import { useFetchPost } from "../Store/ActionCreators";
import PostCard from "../Components/PostCard";
import NotFound from "../Components/NotFound";

const PostDetail = () => {
  const params = useParams();
  const id = params.post_id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector(
    (state: RootStateOrAny) => state.postsContent.posts
  );

  const post = posts !== undefined ? posts.find((p: IPost) => p.id === id) : {};

  const idString = id === undefined ? "" : id.toString();
  const refreshPost = useFetchPost(idString);

  useEffect(() => {
    if (post !== undefined) dispatch(refreshPost);
  }, []);

  const HandleBackButtonClicked = (): void => {
    navigate("/");
  };

  return (
    <>
      {post === undefined ? (
        <NotFound></NotFound>
      ) : (
        <div className="main-wrapper">
          <div className="left-wrapper">
            <button
              className="light-button"
              style={{ width: "100px", margin: "20px" }}
              onClick={HandleBackButtonClicked}
            >
              back
            </button>
          </div>
          <div className="center-wrapper">
            {post !== undefined && (
              <div className="postcard-container" key={post.id}>
                <PostCard post={post} commentsVisible={true} />
              </div>
            )}
          </div>

          <div className="right-wrapper"></div>
        </div>
      )}
    </>
  );
};

export default PostDetail;
