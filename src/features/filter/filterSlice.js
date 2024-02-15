import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  filteredTagsInHome: [],
  filteredTagsInProfile: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState: INITIAL_STATE,
  reducers: {
    tagSelectedInHome: (state, action) => {
      if (state.filteredTagsInHome.indexOf(action.payload) === -1) {
        state.filteredTagsInHome.push(action.payload);
      }
    },

    tagRemovedInHome: (state, action) => {
      const indexToRemove = state.filteredTagsInHome.indexOf(action.payload);

      if (indexToRemove !== -1) {
        state.filteredTagsInHome.splice(indexToRemove, 1);
      }
    },
    tagSelectedInProfile: (state, action) => {
      if (state.filteredTagsInProfile.indexOf(action.payload) === -1) {
        state.filteredTagsInProfile.push(action.payload);
      }
    },

    tagRemovedInProfile: (state, action) => {
      const indexToRemove = state.filteredTagsInProfile.indexOf(action.payload);

      if (indexToRemove !== -1) {
        state.filteredTagsInProfile.splice(indexToRemove, 1);
      }
    },
  },
});

export default filterSlice.reducer;
export const {
  tagSelectedInHome,
  tagRemovedInHome,
  tagSelectedInProfile,
  tagRemovedInProfile,
} = filterSlice.actions;
