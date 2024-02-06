import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  loading: false,
  users: JSON.parse(localStorage.getItem("users")),
  error: "",
  success: false,
};

export const registeredUser = createAsyncThunk(
  "register/registeredUser",
  async (user) => {
    const existingUsers = await JSON.parse(localStorage.getItem("users"));
    const updatedUsers = [...existingUsers, user];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return updatedUsers;
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: INITIAL_STATE,
  reducers: {
    resetRegisterState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
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
export const { resetRegisterState } = registerSlice.actions;
