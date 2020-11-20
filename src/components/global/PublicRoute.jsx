import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getUser } from '../../utils/session';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userStorage = getUser();
        setUser(userStorage);
    }, [])

    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            user && restricted ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;
