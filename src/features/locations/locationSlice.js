import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLocations = createAsyncThunk("locations/fetchLocations", async () => {
  const local = localStorage.getItem('reduxState2') 
  ? JSON.parse(localStorage.getItem('reduxState2'))
  : {entities:[]}
  return local.entities;
});

const locationsSlice = createSlice({
  name: "locations",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    locationAdded(state, action) {
      state.entities.push(action.payload);
      localStorage.setItem('reduxState2', JSON.stringify(state))
    },
    locationUpdated(state, action) {
      const { id, name } = action.payload;
      const existingUser = state.entities.find((location) => location.id === id);
      if (existingUser) {
        existingUser.name = name;
      }
      localStorage.setItem('reduxState2', JSON.stringify(state))
    },
    locationDeleted(state, action) {
      const { id } = action.payload;
      const existingUser = state.entities.find((location) => location.id === id);
      if (existingUser) {
        state.entities = state.entities.filter((location) => location.id !== id);
      }
      localStorage.setItem('reduxState2', JSON.stringify(state))
    },
  },
  extraReducers: {
    [fetchLocations.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchLocations.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = [...state.entities, ...action.payload];
    },
    [fetchLocations.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { locationAdded, locationUpdated, locationDeleted } = locationsSlice.actions;

export default locationsSlice.reducer;
