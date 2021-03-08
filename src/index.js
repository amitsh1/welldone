import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { fetchCategories } from "./features/categories/categoriesSlice";
import { fetchLocations } from "./features/locations/locationSlice";
import store from "./store";

store.dispatch(fetchCategories());
store.dispatch(fetchLocations());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
