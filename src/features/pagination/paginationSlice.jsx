import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    blogsPerPageInHome: 9,
    blogsPerPageInProfile: 3,
  },
  reducers: {
    incrementHomeBlogs(state) {
      state.blogsPerPageInHome += 6;
    },
    incrementProfileBlogs(state) {
      state.blogsPerPageInProfile += 2;
    },
  },
});

export const { incrementHomeBlogs, incrementProfileBlogs } =
  paginationSlice.actions;

export default paginationSlice.reducer;
