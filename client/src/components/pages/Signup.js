import React from "react";
import { Redirect } from "react-router-dom";

import AuthContainer from "../auth/AuthContainer";
import RegisterForm from "../auth/RegisterForm";
import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  const { user } = useAuth();

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <AuthContainer title="Create an account." headerActionName="Login" headerActionPath="/login">
      <RegisterForm />
    </AuthContainer>
  );
};

export default Register;
