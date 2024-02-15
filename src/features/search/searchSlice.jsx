import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  queryInHome: "",
  queryInProfile: "",
  filteredTags: [],
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

    tagSelected: (state, action) => {
      if (state.filteredTags.indexOf(action.payload) === -1) {
        state.filteredTags.push(action.payload);
      }
    },

    tagRemoved: (state, action) => {
      const indexToRemove = state.filteredTags.indexOf(action.payload);

      if (indexToRemove !== -1) {
        state.filteredTags.splice(indexToRemove, 1);
      }
    },

    tagSelected: (state, action) => {
      if (state.filteredTags.indexOf(action.payload) === -1) {
        state.filteredTags.push(action.payload);
      }
    },

    tagRemoved: (state, action) => {
      const indexToRemove = state.filteredTags.indexOf(action.payload);

      if (indexToRemove !== -1) {
        state.filteredTags.splice(indexToRemove, 1);
      }
    },
  },
});

export default searchSlice.reducer;
export const { updateHomeQuery, updateProfileQuery, tagSelected, tagRemoved } =
  searchSlice.actions;
