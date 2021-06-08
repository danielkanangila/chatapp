import React from "react";
import { Redirect } from "react-router-dom";

import AuthContainer from "../auth/AuthContainer";
import LoginForm from "../auth/LoginForm";
import { useAuth } from "../../hooks/useAuth";


const Login = () => {
  const { user } = useAuth();

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <AuthContainer title="Welcome back!" headerActionName="Create account" headerActionPath="/register">
      <LoginForm />
    </AuthContainer>
  );
};

export default Login;
