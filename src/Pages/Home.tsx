import { useSelector, RootStateOrAny } from "react-redux";
import { ChangeEvent, useState } from "react";
import { IPost } from "../Interfaces";
import { useNavigate } from "react-router-dom";
import PostCard from "../Components/PostCard";
import NewPost from "../Components/NewPost";
import CategoryBox from "../Components/CategoryBox";
import { useParams } from "react-router-dom";

const Home = () => {
  const params = useParams();
  const selectedCategory = params.category;

  const navigate = useNavigate();

  const [sort, setSort] = useState("date");
  const posts = useSelector((state: RootStateOrAny) =>
    (sort === "date"
      ? [...state.postsContent.posts].sort(
          (a: IPost, b: IPost): number => b.timestamp - a.timestamp
        )
      : [...state.postsContent.posts].sort(
          (a: IPost, b: IPost): number => b.voteScore - a.voteScore
        )
    ).filter(
      (p: IPost) =>
        p.category === selectedCategory || selectedCategory === undefined
    )
  );

  const HandlePostClicked = (post: IPost) => {
    navigate(`/${post.category}/${post.id}`);
  };

  const HandleSortChanged = (event: ChangeEvent<HTMLSelectElement>): void => {
    setSort((prev: string): string => event.target.value);
  };

  return (
    <div className="main-wrapper">
      <div className="left-wrapper">
        <CategoryBox></CategoryBox>
      </div>
      <div className="center-wrapper">
        <div className="postcard-container">
          <NewPost></NewPost>
        </div>

        <select onChange={HandleSortChanged}>
          <option value="date">date</option>
          <option value="votes">votes</option>
        </select>
        {posts.map((post: IPost) => (
          <div
            className="postcard-container"
            key={post.id}
            onClick={() => HandlePostClicked(post)}
          >
            <PostCard post={post} commentsVisible={false} />
          </div>
        ))}
      </div>

      <div className="right-wrapper"></div>
    </div>
  );
};

export default Home;
