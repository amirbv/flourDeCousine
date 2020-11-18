import React from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { deepPurple } from '@material-ui/core/colors';

export default function Footer() {
  const today = new Date();

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
        <Typography style={{flex: 1}}>
          Le Flour de Cousine - {today.getFullYear()}©
        </Typography>
        <Tabs aria-label="Navigation bar" component="nav" style={{fontSize: '14px'}}>
          <LinkTab label="Admin" to="/admin-login" />
        </Tabs>
      </Toolbar>
    </AppBar>
  )
}
