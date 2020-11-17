import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";

export const AuthRouter = () => {
  return (
    <div className='auth__main'>
      <div className='auth__box-container'>
        <Switch>
          <Route exact path='/auth/login' component={Login} />
          <Route exact ath='/auth/register' component={Register} />
          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </div>
  );
};
