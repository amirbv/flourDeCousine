import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getUser } from '../../utils/session';

import Loading from './Loading';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        const userStorage = getUser();
        setUser(userStorage);
        setLoadingUser(false);
    }, [])
    
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
