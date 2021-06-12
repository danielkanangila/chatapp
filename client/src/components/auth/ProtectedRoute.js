import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';


const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
    const { user } = useAuth();
    
    return (
        <Route
          {...restOfProps}
          render={(props) => {
            if (user?.id) {
              return <Component {...props} />;
            }
            return <Redirect to="/login" />;
          }}
        />
      );
};

export default ProtectedRoute;