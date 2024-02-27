import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    blogsPerPageInHome: 9,
    blogsPerPageInProfile: 3,
    currentHomePage: 1,
    currentProfilePage: 1,
  },
  reducers: {
    incrementHomeBlogs(state) {
      state.blogsPerPageInHome += 6;
      state.currentHomePage++;
    },
    decrementHomeBlogs(state) {
      state.blogsPerPageInHome = 9;
      state.currentHomePage--;
    },
    incrementProfileBlogs(state) {
      state.blogsPerPageInProfile += 2;
      state.currentProfilePage++;
    },
    decrementProfileBlogs(state) {
      state.blogsPerPageInProfile = 3;
      state.currentProfilePage--;
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
