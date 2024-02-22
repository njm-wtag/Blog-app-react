import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  homeQuery: "",
  profileQuery: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState: INITIAL_STATE,
  reducers: {
    updateHomeQuery(state, action) {
      state.homeQuery = action.payload;
    },
    updateProfileQuery(state, action) {
      state.profileQuery = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const { updateHomeQuery, updateProfileQuery } = searchSlice.actions;
