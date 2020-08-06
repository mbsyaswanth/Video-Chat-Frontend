import { Route, Switch } from "react-router-dom";
import React from "react";

import Home from "./components/Home";
import Meeting from "./components/Meeting";
import ProtectedRoute from "./components/ProtectedRoute";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/:meetingId?">
        <Home />
      </Route>
      <ProtectedRoute path="/meeting/:meetingId">
        <Meeting />
      </ProtectedRoute>
      <Route path="*">
        <div>No match</div>
      </Route>
    </Switch>
  );
};

export default Routes;
