import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Loading from './Loading';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = false;
    const loadingUser = false;
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route {...rest} render={props => (
            !loadingUser ? (
                user ?
                    <Component {...props} />
                : <Redirect to="/admin-login" />
            )
            : <Loading />
        )} />
    );
};

export default PrivateRoute;
