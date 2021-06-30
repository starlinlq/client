import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import App from "./App";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { store, StoreContext } from "./app/stores/stores";
export const history = createBrowserHistory();

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Router history={history}>
      <App />
    </Router>
  </StoreContext.Provider>,

  document.getElementById("root")
);
