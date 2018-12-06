import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import loading from "./routes/Loading";
import Layout from "./layouts/index";
import { createStore } from "redux";
import { Provider } from "react-redux";
import appReducer from "./redux/reducers/index";
const store = createStore(appReducer);
const IndexPage = Loadable({
  loading,
  loader: () => import("./routes/IndexPage")
});
const NotFount = Loadable({ loading, loader: () => import("./routes/404") });
const ToDoList = Loadable({
  loading,
  loader: () => import("./routes/redux-tests/todolist/index")
});
const ReduxSaga = Loadable({
  loading,
  loader: () => import("./routes/redux-tests/sagaTest/index")
});
export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Layout>
            <Switch>
              <Route path="/" component={IndexPage} exact />
              <Route path="/404" component={NotFount} exact />
              <Route path="/redux/todolist" component={ToDoList} exact />
              <Route path="/redux/saga" component={ReduxSaga} exact />
              <Redirect to="/404" />
            </Switch>
          </Layout>
        </Provider>
      </BrowserRouter>
    );
  }
}
