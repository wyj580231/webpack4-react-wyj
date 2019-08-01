import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import appReducer, { rootSaga, allSaga } from "./redux/reducers/index";
import App from "./App";
import "./global";
import "./global.scss";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(appReducer, applyMiddleware(sagaMiddleware));
const { dispatch } = store;
store.dispatch = action => {
  return allSaga.some(v => `${v.model.namespace}/${v.name}` === action.type)
    ? new Promise(resolve =>
        dispatch({ ...action, [Symbol.for("dispatchPromiseResolve")]: resolve })
      )
    : dispatch(action);
};
sagaMiddleware.run(rootSaga);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
