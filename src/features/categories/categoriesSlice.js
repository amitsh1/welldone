import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
  // localStorage.clear();
  const local = localStorage.getItem('reduxState') 
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {entities:[]} 
  return local.entities;
});

const categorysSlice = createSlice({
  name: "categories",
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
      const existingCategory = state.entities.find((category) => category.id === id);
      if (existingCategory) {
        existingCategory.name = name;
      }
      localStorage.setItem('reduxState', JSON.stringify(state))
    },
    categoryDeleted(state, action) {
      const { id } = action.payload;
      const existingCategory = state.entities.find((category) => category.id === id);
      if (existingCategory) {
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
