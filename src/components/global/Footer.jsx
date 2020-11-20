import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { amber } from '@material-ui/core/colors';

import { getUser, deleteUser } from '../../utils/session';


export default function Footer() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const userStorage = getUser();
    setUser(userStorage);
  }, []);

  const today = new Date();

  function LinkTab(props) {
    return (
      <Tab
        component={Link}
        {...props}
      />
    );
  }

  function logout() {
    deleteUser();
    history.push('/');
    history.go(0);
  }

  return (
    <AppBar style={{backgroundColor: amber[700]}} position="relative">
      <Toolbar>
        <Typography style={{flex: 1}}>
          Le Flour de Cousine - {today.getFullYear()}©
        </Typography>
        <Tabs aria-label="Navigation bar" component="nav" style={{ fontSize: '14px' }}>
          {
            user && (
              <>
                <LinkTab label="Admin" to="/dashboard" />
                <Tab component="button" label="Logout" onClick={logout}></Tab>
              </>
            )
          }
          {
            !user && <LinkTab label="Admin" to="/admin-login" />
          }
          
        </Tabs>
      </Toolbar>
    </AppBar>
  )
}
