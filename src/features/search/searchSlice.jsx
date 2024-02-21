import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  homeQUery: "",
  profileQuery: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState: INITIAL_STATE,
  reducers: {
    updateHomeQuery(state, action) {
      state.homeQUery = action.payload;
    },
    updateProfileQuery(state, action) {
      state.profileQuery = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const { updateHomeQuery, updateProfileQuery } = searchSlice.actions;
