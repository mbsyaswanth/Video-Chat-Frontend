import { Route, Switch } from "react-router-dom";
import React from "react";

import Home from "./components/Home";
import Meeting from "./components/Meeting";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/meeting/:meetingId">
        <Meeting />
      </Route>
      <Route path="*">
        <div>No match</div>
      </Route>
    </Switch>
  );
};

export default Routes;
