import React from "react";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { StateProvider } from "./context/StateProvider";

import { ShoppingBagProvider } from "./context/ShoppingBagContext";
import { initialState } from "./context/initialState";
import reducer from "./context/reducer";

//Before React 18:
// import ReactDOM from "react-dom";
// ReactDOM.render(
//   <Router>
//     <StateProvider initialState={initialState} reducer={reducer}>
//       <App />
//     </StateProvider>
//   </Router>,
//   document.getElementById("root")
// );

//Update to React 18
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Router>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
  </Router>
);
