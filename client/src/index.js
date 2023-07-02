import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
// import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import "./index.css";
import App from "./App";
import Reducers from "./reducers";

// Create the Redux store with the root reducer and middleware
const store = createStore(Reducers, compose(applyMiddleware(thunk)));

// Create a root element for rendering the React app
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app component within the Redux provider and strict mode
root.render(
  /**
   * The root component of the application.
   *
   * @returns {JSX.Element} The root component JSX element.
   */
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
