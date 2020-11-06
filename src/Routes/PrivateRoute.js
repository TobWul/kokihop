import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ROUTES } from "./Router";

const PrivateRoute = ({ children, allowedCondition, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        allowedCondition ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.LOGIN,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
