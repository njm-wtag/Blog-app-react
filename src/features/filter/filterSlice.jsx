import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  filteredTags: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState: INITIAL_STATE,
  reducers: {
    tagselected: (state, action) => {
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

export default filterSlice.reducer;
export const { tagselected, tagRemoved } = filterSlice.actions;
