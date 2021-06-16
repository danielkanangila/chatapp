import React, { useEffect, useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./store/utils/thunkCreators";
import Signup from "./components/pages/Signup.js";
import Login from "./components/pages/Login.js";
import { Home, SnackbarError } from "./components";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useWebSocket } from "./hooks/useWebSocket";
import { useWindowVisibility } from "./hooks/useWindowVisibility";

const Routes = (props) => {
  const { user, fetchUser } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const ws = useWebSocket();
  const myWindow = useWindowVisibility();

  useEffect(() => {
    window.addEventListener("visibilitychange", myWindow.updateVisibility);
    
    return () => window.removeEventListener("visibilitychange", myWindow.updateVisibility);
  });

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    // signal socket server that user is online
    if (user.id) ws.goOnline(user); 
  }, [user]); // eslint-disable-line

  useEffect(() => {
    if (user.error) {
      // check to make sure error is what we expect, in case we get an unexpected server error object
      if (typeof user.error === "string") {
        setErrorMessage(user.error);
      } else {
        setErrorMessage("Internal Server Error. Please try again");
      }
      setSnackBarOpen(true);
    }
  }, [user.error]);

  if (props.user.isFetchingUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {snackBarOpen && (
        <SnackbarError
          setSnackBarOpen={setSnackBarOpen}
          errorMessage={errorMessage}
          snackBarOpen={snackBarOpen}
        />
      )}
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Signup} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute path="/home" component={Home} />
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser() {
      dispatch(fetchUser());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
