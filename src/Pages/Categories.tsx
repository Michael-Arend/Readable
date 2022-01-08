import { RootStateOrAny, useSelector } from "react-redux";
import { ICategory, IPost } from "../Interfaces";
import { useParams } from "react-router-dom";

const Categories = () => {
  const params = useParams();
  const name = params.category;

  const categories = useSelector(
    (state: RootStateOrAny) => state.postsContent.categories.categories
  );

  const posts = useSelector(
    (state: RootStateOrAny) => state.postsContent.posts
  );

  const category: ICategory =
    categories !== undefined
      ? categories.find((c: ICategory) => c.name === name)
      : {};

  const categoryPosts =
    posts !== undefined
      ? posts.filter((p: IPost) => p.category === category.name)
      : [];

  return (
    <div>
      {categoryPosts.length > 0 &&
        categoryPosts.map((p: IPost) => <p key={p.id}>{p.body}</p>)}
    </div>
  );
};

export default Categories;
