import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  users: [],
  error: "",
  success: false,
};

export const registeredUser = createAsyncThunk(
  "register/registeredUser",
  async (user) => {
    const existingUsers = JSON.parse(
      localStorage.getItem("users") || JSON.stringify([])
    );
    const updatedUsers = [...existingUsers, user];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return updatedUsers;
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registeredUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(registeredUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.users = [...state.users, action.payload];
        state.success = true;
      })
      .addCase(registeredUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default registerSlice.reducer;
