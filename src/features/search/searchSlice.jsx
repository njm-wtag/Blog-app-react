import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  query: "",
  filteredTags: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState: INITIAL_STATE,
  reducers: {
    updateQuery(state, action) {
      state.query = action.payload;
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
export const { updateQuery, tagSelected, tagRemoved } = searchSlice.actions;
