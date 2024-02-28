import { createSlice } from "@reduxjs/toolkit";

const INITIAL_BLOGS_PER_PAGE_IN_HOME = 9;
const INITIAL_BLOGS_PER_PAGE_IN_PROFILE = 3;
const INCREMENT_HOME_BLOGS = 6;
const INCREMENT_PROFILE_BLOGS = 2;

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    blogsPerPageInHome: INITIAL_BLOGS_PER_PAGE_IN_HOME,
    blogsPerPageInProfile: INITIAL_BLOGS_PER_PAGE_IN_PROFILE,
    currentHomePage: 1,
    currentProfilePage: 1,
  },
  reducers: {
    incrementHomeBlogs(state) {
      state.blogsPerPageInHome += INCREMENT_HOME_BLOGS;
      state.currentHomePage++;
    },
    decrementHomeBlogs(state) {
      state.blogsPerPageInHome = INITIAL_BLOGS_PER_PAGE_IN_HOME;
      state.currentHomePage--;
    },
    incrementProfileBlogs(state) {
      state.blogsPerPageInProfile += INCREMENT_PROFILE_BLOGS;
      state.currentProfilePage++;
    },
    decrementProfileBlogs(state) {
      state.blogsPerPageInProfile = INITIAL_BLOGS_PER_PAGE_IN_PROFILE;
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
