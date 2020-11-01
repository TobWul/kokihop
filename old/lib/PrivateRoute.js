import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withFirebase } from "../firebase/context";

const PrivateRoute = ({ children, firebase, allowedCondition, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        allowedCondition ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default withFirebase(PrivateRoute);
