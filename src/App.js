import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import loading from "./routes/Loading";
import Layout from "./layouts/index";
const IndexPage = Loadable({
  loading,
  loader: () => import("./routes/IndexPage")
});
const NotFount = Loadable({ loading, loader: () => import("./routes/404") });
const ReduxTest = Loadable({
  loading,
  loader: () => import("./routes/redux-tests/test/index")
});
const ReduxSaga = Loadable({
  loading,
  loader: () => import("./routes/redux-tests/sagaTest/index")
});
export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" component={IndexPage} exact />
            <Route path="/404" component={NotFount} exact />
            <Route path="/redux/test" component={ReduxTest} exact />
            <Route path="/redux/saga" component={ReduxSaga} exact />
            <Redirect to="/404" />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}
