import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { fetchCategories } from "./features/users/usersSlice";
import store from "./store";

store.dispatch(fetchCategories());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
