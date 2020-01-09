import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./global";
import "./global.scss";
import App from "./App";
import WRedux from "dva-wyj";
import toDoList from "./models/toDoList";

const models = [toDoList];
const wApp = WRedux(models);
const store = wApp.run();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
