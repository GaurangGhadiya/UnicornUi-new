import React from 'react';
import { Route } from 'react-router-dom';

const AuthPrevented = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
};
export default AuthPrevented;
