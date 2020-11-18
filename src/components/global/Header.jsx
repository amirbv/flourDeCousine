import React from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { deepPurple } from '@material-ui/core/colors';

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
    <AppBar style={{backgroundColor: deepPurple[500]}} position="relative">
      <Toolbar>
        <Typography variant="h6" style={{flex: 1}}>
          <Link to='/' style={{ 'textDecoration': 'none', 'color': 'inherit' }}>
            Flour de Cousine
          </Link>
        </Typography>
        <Tabs aria-label="Navigation bar" component="nav">
          <LinkTab label="Blog" to="/blog" />
          <LinkTab label="Libros" to="/libros" />
        </Tabs>
      </Toolbar>
    </AppBar>
  )
}
