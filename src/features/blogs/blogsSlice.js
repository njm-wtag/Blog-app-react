import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  blogs: JSON.parse(localStorage.getItem("blogs")) || [],
  isLoading: false,
  isError: false,
  error: "",
};

export const postBlog = createAsyncThunk("blog/postBlog", async (blog) => {
  const existingBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const updatedBlogs = [blog, ...existingBlogs];

  localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

  return updatedBlogs;
});

const blogSlice = createSlice({
  name: "blog",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postBlog.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(postBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload;
      })
      .addCase(postBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.blogs = [];
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default blogSlice.reducer;
