import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./containers/Dashboard.component";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Dashboard />
      </Route>
    </Switch>
  );
}