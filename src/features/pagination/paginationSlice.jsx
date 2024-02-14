import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    currentPage: 1,
    blogsPerPage: 9,
  },
  reducers: {
    incrementPage(state) {
      state.currentPage += 1;
      state.blogsPerPage += 6;
    },
  },
});

export const { incrementPageCount } = paginationSlice.actions;

export default paginationSlice.reducer;
