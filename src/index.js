import "./index.css";
// import "https://unpkg.com/purecss@2.1.0/build/pure-min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import reducer from "./reducers";
import middleware from "./middleware";

const store = createStore(reducer, middleware);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
