import React, { Fragment } from 'react';
import { Route, Redirect,Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    
    const {isAuthenticated,loading,user} = useSelector(state=>state.auth);

  return (
    <Fragment>
          {loading === 'false' && (
              <Route
                  {...rest}
                  component={props => {
                      if (isAuthenticated == false) {
                          return <Navigate to='/login' />;
                      }
                      return <Component {...props} />;
                  }}
              />
         )} 
    </Fragment>
  )
}

export default ProtectedRoute