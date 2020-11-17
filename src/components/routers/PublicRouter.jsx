import React from "react";
import { Redirect, Route } from "react-router";

export const PublicRouter = ({ component: Component, isLogged, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        !isLogged ? <Component {...props} /> : <Redirect to={"/"} />
      }
    />
  );
};
