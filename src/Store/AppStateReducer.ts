import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoading: false, hasError: false, error: "" };

const AppStateSlice = createSlice({
  name: "appState",
  initialState: initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
      console.log(action.payload);
    },
    setError(state, action) {
      state.hasError = action.payload !== "";
      state.error = action.payload;
    },
  },
});

export const appStateActions = AppStateSlice.actions;
export default AppStateSlice.reducer;
