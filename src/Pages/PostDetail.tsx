import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStateOrAny, useDispatch } from "react-redux";
import { IPost } from "../Interfaces";
import { useFetchPost } from "../Store/ActionCreators";
import { useNavigate } from "react-router-dom";

const PostDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.post_id;
  const dispatch = useDispatch();
  const posts = useSelector(
    (state: RootStateOrAny) => state.postsContent.posts
  );

  const post = posts !== undefined ? posts.find((p: IPost) => p.id === id) : {};
  console.log(post);

  const idString = id === undefined ? "" : id.toString();
  const refreshPost = useFetchPost(idString);

  useEffect(() => {}, [post]);

  useEffect(() => {
    dispatch(refreshPost);
  }, []);

  return (
    <>
      {post !== undefined && (
        <>
          <p>{post.title}</p>

          {post.comments !== undefined && <p>{post.comments.length}</p>}
          <button onClick={() => navigate(-1)}>go back</button>
        </>
      )}
    </>
  );
};

export default PostDetail;
