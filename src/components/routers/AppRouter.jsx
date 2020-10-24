import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Journal } from "../journal/Journal";
import { AuthRouter } from "./AuthRouter";

export const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path='/auth' component={AuthRouter} />
        <Route exact path='/' component={Journal} />
        <Redirect to='/auth/login' />
      </Switch>
    </Router>
  );
};
