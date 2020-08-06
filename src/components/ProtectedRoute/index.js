import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location, match }) =>
        window.sessionStorage.getItem("name") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: `/${match.params.meetingId}`,
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
