import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authenticateUser from "../../utils/authUtils";

const INITIAL_STATE = {
  loading: false,
  authUser: JSON.parse(localStorage.getItem("authUser")),
  error: "",
  success: false,
};

export const loggedInUser = createAsyncThunk(
  "auth/loggedInUser",
  async (user) => {
    try {
      const authUser = await authenticateUser(user);

      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        return authUser;
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (error) {
      throw error.message;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    loggedOutUser: () => {
      localStorage.removeItem("authUser");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loggedInUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = "";
      })
      .addCase(loggedInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.authUser = action.payload;
        state.success = true;
      })
      .addCase(loggedInUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
export const { loggedOutUser } = authSlice.actions;
