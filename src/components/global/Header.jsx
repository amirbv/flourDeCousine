import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Tabs, Tab } from '@material-ui/core';
import { amber } from '@material-ui/core/colors';



export default function Header() {
  

  function LinkTab(props) {
    return (
      <Tab
        component={Link}
        {...props}
      />
    );
  }

  return (
    <AppBar style={{backgroundColor: amber[700]}} position="relative">
      <Toolbar>
        <Typography variant="h6" style={{flex: 1}}>
          <Link to='/' style={{ 'textDecoration': 'none', 'color': 'inherit' }}>
            Flour de Cousine
          </Link>
        </Typography>
        <Tabs aria-label="Navigation bar" value={false} >
          <LinkTab label="Blog" to="/blog" />
          <LinkTab label="Libros" to="/libros"  />
        </Tabs>
      </Toolbar>
    </AppBar>
  )
}
