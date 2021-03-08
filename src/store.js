import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./features/categories/categoriesSlice";
import locationsReducer from "./features/locations/locationSlice";
export default configureStore({
  reducer: {
    categories: categoriesReducer,
    locations: locationsReducer
  },
});
