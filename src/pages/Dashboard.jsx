import React, { useState, useEffect } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DashList from '../components/dashboard/DashList';
import DashUser from '../components/dashboard/DashUser';
import DashSales from '../components/dashboard/DashSales';
import DashBlog from '../components/dashboard/DashBlog';
import DashBook from '../components/dashboard/DashBook';

import BackLink from '../components/global/BackLink';

import { getUser } from '../utils/session';


export default function Dashboard() {
  const { path } = useRouteMatch();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = getUser();
    setUser(user);
  }, []);
  
  return (
    <Switch>
      <Route path={path} exact>
        <DashList user={user} />
      </Route>
      <Route path={path + '/usuarios'} exact>
        <DashUser user={user} />
        <BackLink to={path} title="Volver al dashboard" />
      </Route>
      <Route path={path + '/ventas'} exact>
        <DashSales user={user} />
        <BackLink to={path} title="Volver al dashboard" />
      </Route>
      <Route path={path + '/posts'} exact>
        <DashBlog user={user} />
        <BackLink to={path} title="Volver al dashboard" />
      </Route>
      <Route path={path + '/libros'} exact>
        <DashBook user={user} />
        <BackLink to={path} title="Volver al dashboard" />
      </Route>
    </Switch>
  )
}
