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
      const { id, category, name, address, coor } = action.payload;
      const existingUser = state.entities.find((location) => location.id === id);
      if (existingUser) {
        existingUser.category = category;
        existingUser.name = name;
        existingUser.address = address;
        existingUser.coor = coor;
      }
      localStorage.setItem('reduxState2', JSON.stringify(state))
    },
    locationDeleted(state, action) {
      
      const { id } = action.payload;
      state.entities = state.entities.filter((location) => !id.includes(location.id));
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
