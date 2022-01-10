import { useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { ICategory, IPost } from "../Interfaces";
import { CreateNewPost, UpdatePost } from "../Store/ActionCreators";

const NewPost: React.FC<{ post?: IPost; setEditCompleted?: () => void }> = ({
  post,
  setEditCompleted,
}) => {
  const title = useRef<HTMLInputElement>(null);
  const text = useRef<HTMLTextAreaElement>(null);
  const category = useRef<HTMLSelectElement>(null);

  const categories = useSelector(
    (state: RootStateOrAny) => state.postsContent.categories
  );

  useEffect(() => {
    if (post !== undefined && title.current !== null && text.current !== null) {
      title.current.value = post.title;
      text.current.value = post.body;
    }
  }, []);

  const dispatch = useDispatch();
  const sendNewPostHandler = useCallback(() => {
    if (post !== undefined && text.current !== null && title.current !== null) {
      post = {
        ...post,
        body: text.current.value,
        title: title.current.value,
      };

      dispatch(UpdatePost(post));
      if (text.current != null) text.current.value = "";
      if (title.current != null) title.current.value = "";

      setEditCompleted != null && setEditCompleted();
      return;
    }

    const newPost: IPost = {
      id: "",
      timestamp: Date.now(),
      title: title.current === null ? "" : title.current.value,
      body: text.current === null ? "" : text.current.value,
      author: "Jon Doe",
      category: category.current === null ? "" : category.current.value,
      voteScore: 0,
      deleted: false,
      comments: [],
      commentCount: 0,
    };
    if (title.current !== null) title.current.value = "";
    if (text.current !== null) text.current.value = "";

    dispatch(CreateNewPost(newPost));
  }, []);

  return (
    <div className="postcard-wrapper new-post-wrapper">
      <h5>{post !== undefined ? "Edit Post" : "Create a new Post"}</h5>
      <input ref={title} type="text" placeholder="Title" />
      <textarea ref={text} placeholder="What´s happening?" />
      {post !== undefined ? (
        <div></div>
      ) : (
        <select ref={category}>
          {categories !== undefined &&
            categories.map((c: ICategory) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
        </select>
      )}

      <button className="light-button" onClick={sendNewPostHandler}>
        <img src="../plane.png" width="15px"></img>
        send
      </button>
    </div>
  );
};

export default NewPost;
