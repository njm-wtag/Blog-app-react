import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  blogs: JSON.parse(localStorage.getItem("blogs")) || [],
  isLoading: false,
  isError: false,
  error: "",
};

export const postBlog = createAsyncThunk("blog/postBlog", async (blog) => {
  const existingBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const updatedBlogs = [...existingBlogs, blog];

  localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

  return updatedBlogs;
});

const blogSlice = createSlice({
  name: "blog",
  initialState,
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
        state.videos = [];
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default blogSlice.reducer;
