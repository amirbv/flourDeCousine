import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { amber } from '@material-ui/core/colors';

import { getUser, deleteUser } from '../../utils/session';


export default function Footer() {
  const [user, setUser] = useState(null);
  const history = useHistory();
  const today = new Date();

  useEffect(() => {
    const userStorage = getUser();
    setUser(userStorage);
  }, []);


  function logout() {
    deleteUser();
    history.push('/');
    history.go(0);
  }

  return (
    <AppBar style={{backgroundColor: amber[700],zIndex: '800'}} position="relative" component="footer" >
      <Toolbar>
        <Typography style={{flex: 1}}>
          Le Flour de Cousine - {today.getFullYear()}©
        </Typography>
        <div>
          {
            user && (
              <>
                <Link className="nav-link" to="/dashboard" >Admin</Link>
                <Button
                  variant="text"
                  style={{ color: "inherit", textTransform: 'none', fontWeigth: 'initial' }}
                  onClick={logout}
                  disableElevation
                  disableFocusRipple
                  disableRipple
                >
                  Cerrar sesión
                </Button>
              </>
            )
          }
          {
            !user && <Link className="nav-link" to="/admin-login" >Admin</Link>
          }
        </div>
      </Toolbar>
    </AppBar>
  )
}
