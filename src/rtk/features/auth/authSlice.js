import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authenticateUser from "../../../utils/authUtils";

const initialState = {
  loading: false,
  authUser: null,
  error: null,
  success: false,
};

export const userLoggedIn = createAsyncThunk(
  "auth/userLoggedIn",
  async (user) => {
    const authUser = authenticateUser(user);
    if (authUser) {
      localStorage.setItem("authUser", JSON.stringify(authUser));
    }
    return authUser;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedOut: () => {
      localStorage.removeItem("authUser");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLoggedIn.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(userLoggedIn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.authUser = action.payload;
        state.success = true;
      })
      .addCase(userLoggedIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
export const { userLoggedOut } = authSlice.actions;
