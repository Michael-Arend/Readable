import { useEffect } from "react";
import {
  useFetchAllCategories,
  useFetchAllPosts,
} from "./Store/ActionCreators";
import { useDispatch } from "react-redux";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import PostDetail from "./Pages/PostDetail";
import NewPost from "./Components/NewPost";
import NotFound from "./Components/NotFound";

function App() {
  const dispatch = useDispatch();
  const fetchPosts = useFetchAllPosts();
  const fetchCategories = useFetchAllCategories();

  useEffect(() => {
    dispatch(fetchPosts);
    dispatch(fetchCategories);
  }, [dispatch, fetchCategories, fetchPosts]);

  return (
    <div>
      {
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewPost />} />
          <Route path="/:category" element={<Home />} />
          <Route path="/:category/:post_id" element={<PostDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      }
    </div>
  );
}

export default App;
