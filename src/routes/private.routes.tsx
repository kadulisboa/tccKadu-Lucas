import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';

interface PrivateProps extends RouteProps {
  isAuth: boolean;
}

const PrivateRoute: React.FC<PrivateProps> = ({ isAuth, ...routeProps }) => {
  if (isAuth) {
    return <Route {...routeProps} />
  }
  return <Redirect to='/login' />
}

export default PrivateRoute;
