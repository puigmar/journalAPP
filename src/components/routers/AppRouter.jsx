import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { login } from "../../actions/auth.actions";
import { startLoadingNotes } from "../../actions/notes.actions";
import { firebase } from "../../firebase/firebase-config";
import { Journal } from "../journal/Journal";
import { AuthRouter } from "./AuthRouter";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const [checkin, setCheckin] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLogged(true);
        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLogged(false);
      }
      setCheckin(false);
    });
  }, [dispatch, isLogged]);

  if (checkin) return <p>Loading...</p>;
  console.log("isLogged: ", isLogged);
  return (
    <Router>
      <Switch>
        <PublicRouter path='/auth' isLogged={isLogged} component={AuthRouter} />
        <PrivateRouter exact path='/' isLogged={isLogged} component={Journal} />
        <Redirect to='/auth/login' />
      </Switch>
    </Router>
  );
};
