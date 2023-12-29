// index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css"
import { TaskProvider } from "./contexts/TaskContext";
import { MenuProvider } from "./contexts/MenuContext";
ReactDOM.render(
  <React.StrictMode>
    <MenuProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </MenuProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
