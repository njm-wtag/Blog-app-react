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
    decrementHomeBlogs(state) {
      state.blogsPerPageInHome = 9;
    },
    incrementProfileBlogs(state) {
      state.blogsPerPageInProfile += 2;
    },
    decrementProfileBlogs(state) {
      state.blogsPerPageInProfile = 3;
    },
  },
});

export const {
  incrementHomeBlogs,
  incrementProfileBlogs,
  decrementHomeBlogs,
  decrementProfileBlogs,
} = paginationSlice.actions;

export default paginationSlice.reducer;
