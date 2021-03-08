import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk("categorys/fetchCategories", async () => {
  const local = localStorage.getItem('reduxState') 
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {entities:[]} 
  return local.entities;
});

const categorysSlice = createSlice({
  name: "categorys",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    categoryAdded(state, action) {
      state.entities.push(action.payload);
      localStorage.setItem('reduxState', JSON.stringify(state))
    },
    categoryUpdated(state, action) {
      const { id, name } = action.payload;
      const existingUser = state.entities.find((category) => category.id === id);
      if (existingUser) {
        existingUser.name = name;
      }
      localStorage.setItem('reduxState', JSON.stringify(state))
    },
    categoryDeleted(state, action) {
      const { id } = action.payload;
      const existingUser = state.entities.find((category) => category.id === id);
      if (existingUser) {
        state.entities = state.entities.filter((category) => category.id !== id);
      }
      localStorage.setItem('reduxState', JSON.stringify(state))
    },
  },
  extraReducers: {
    [fetchCategories.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = [...state.entities, ...action.payload];
    },
    [fetchCategories.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { categoryAdded, categoryUpdated, categoryDeleted } = categorysSlice.actions;

export default categorysSlice.reducer;
