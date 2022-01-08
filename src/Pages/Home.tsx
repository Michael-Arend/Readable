import { useSelector, RootStateOrAny } from "react-redux";
import { Fragment, MouseEvent } from "react";
import { IPost } from "../Interfaces";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const posts = useSelector(
    (state: RootStateOrAny) => state.postsContent.posts
  );
  const categories = useSelector(
    (state: RootStateOrAny) => state.postsContent.categories
  );
  const isLoading = useSelector(
    (state: RootStateOrAny) => state.appState.isLoading
  );

  console.log(posts);

  const HandlePostClicked = (post: IPost) => {
    navigate(`/${post.category}/${post.id}`);
  };

  return (
    <>
      <h1>Home</h1>
      {posts.map((post: IPost) => (
        <div key={post.id} onClick={() => HandlePostClicked(post)}>
          <p>{post.title}</p>
        </div>
      ))}
    </>
  );
};

export default Home;
