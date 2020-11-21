import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DashList from '../components/dashboard/DashList';
import DashUser from '../components/dashboard/DashUser';

import BackLink from '../components/global/BackLink';

export default function Dashboard() {
  const { path } = useRouteMatch();
  
  return (
    <Switch>
      <Route path={path} exact>
        <DashList />
      </Route>
      <Route path={path + '/usuarios'} exact>
        <DashUser />
        <BackLink to={path} title="Volver al dashboard" />
      </Route>
      <Route path={path + '/ventas'} exact>
        <div>VENTAS</div>
        <BackLink to={path} title="Volver al dashboard" />
      </Route>
      <Route path={path + '/posts'} exact>
        <div>POSTS</div>
        <BackLink to={path} title="Volver al dashboard" />
      </Route>
      <Route path={path + '/libros'} exact>
        <div>LIBROS</div>
        <BackLink to={path} title="Volver al dashboard" />
      </Route>
    </Switch>
  )
}
