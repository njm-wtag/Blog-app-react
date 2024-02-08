import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  query: "",
  blogs: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState: INITIAL_STATE,
  reducers: {
    updateQuery(state, action) {
      console.log(state.query, action.payload);
      state.query = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const { updateQuery } = searchSlice.actions;
