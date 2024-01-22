import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "../features/register/registerSlice";
import authSlice from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    register: registerSlice,
    auth: authSlice,
  },
});

export default store;
