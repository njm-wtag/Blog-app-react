import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "../features/register/registerSlice";
import authSlice from "../features/auth/authSlice";
import blogsSlice from "../features/blogs/blogsSlice";

const store = configureStore({
  reducer: {
    register: registerSlice,
    auth: authSlice,
    blogs: blogsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
