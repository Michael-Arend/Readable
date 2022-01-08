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
import Categories from "./Pages/Categories";

function App() {
  const dispatch = useDispatch();
  const fetchPosts = useFetchAllPosts();
  const fetchCategories = useFetchAllCategories();

  useEffect(() => {
    dispatch(fetchPosts);
    dispatch(fetchCategories);
  }, [dispatch]);

  return (
    <div>
      {
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={""} />
          <Route path="/:category" element={<Categories />} />
          <Route path="/:category/:post_id" element={<PostDetail />} />
        </Routes>
      }
    </div>
  );
}

export default App;
