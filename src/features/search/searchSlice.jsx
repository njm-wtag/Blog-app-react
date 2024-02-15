import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  queryInHome: "",
  queryInProfile: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState: INITIAL_STATE,
  reducers: {
    updateHomeQuery(state, action) {
      state.queryInHome = action.payload;
    },
    updateProfileQuery(state, action) {
      state.queryInProfile = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const { updateHomeQuery, updateProfileQuery } = searchSlice.actions;
