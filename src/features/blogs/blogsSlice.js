import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  blogs: JSON.parse(localStorage.getItem("blogs")) || [],
  isLoading: false,
  isError: false,
  error: "",
};

export const postBlog = createAsyncThunk("blog/postBlog", async (blog) => {
  const existingBlogs = (await JSON.parse(localStorage.getItem("blogs"))) || [];
  const updatedBlogs = [blog, ...existingBlogs];

  localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

  return updatedBlogs;
});

export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async (updatedBlog) => {
    const existingBlogs = JSON.parse(localStorage.getItem("blogs"));
    const matchedIndex = existingBlogs?.findIndex(
      (blog) => blog.id === updatedBlog.id
    );
    existingBlogs[matchedIndex] = { ...updatedBlog };
    localStorage.setItem("blogs", JSON.stringify(existingBlogs));

    return existingBlogs;
  }
);

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
      })
      .addCase(updateBlog.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.blogs = [];
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default blogSlice.reducer;
