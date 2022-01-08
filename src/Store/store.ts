import { configureStore } from "@reduxjs/toolkit";
import AppStateReducer from "./AppStateReducer";

import PostReducer from "./PostReducer";

const store = configureStore({
  reducer: { postsContent: PostReducer, appState: AppStateReducer },
});

export default store;
