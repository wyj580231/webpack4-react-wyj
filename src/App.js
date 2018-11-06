import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import loading from "./routes/Loading";
const IndexPage = Loadable({
  loading,
  loader: () => import("./routes/IndexPage")
});
const NotFount = Loadable({ loading, loader: () => import("./routes/404") });
export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={IndexPage} exact />
          <Route path="/404" component={NotFount} exact />
          <Redirect to="/404" />
        </Switch>
      </BrowserRouter>
    );
  }
}
