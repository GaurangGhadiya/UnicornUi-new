import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import Auth from '../Auth';
import { useSelector } from 'react-redux';
import { getAuth } from '../../redux/reducer/profileUpdateSlice';
import { Modal_Commen } from 'src/components/modal/Modal_Commen';

const AuthProtected = ({ component: Component, ...rest }: any) => {
  const isAuth = useSelector(getAuth);
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuth ? (
          <Component {...props} />
        ) : (
          // <Link to={{ pathname: '/', state: { from: props.location } }}>
          //   <Modal_Commen flag={true} />
          // </Link>
          <Redirect
            to={{
              pathname: `/dashboard`,
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

export default AuthProtected;
