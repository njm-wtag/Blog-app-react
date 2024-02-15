import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    blogsPerPage: 3,
  },
  reducers: {
    incrementPage(state) {
      state.blogsPerPage += 2;
    },
  },
});

export const { incrementPage } = paginationSlice.actions;

export default paginationSlice.reducer;
