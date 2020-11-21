import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { amber } from '@material-ui/core/colors';



export default function Header() {

  return (
    <AppBar style={{backgroundColor: amber[700]}} position="relative">
      <Toolbar>
        <Typography variant="h6" style={{flex: 1}}>
          <Link to='/' style={{ 'textDecoration': 'none', 'color': 'inherit' }}>
            Flour de Cousine
          </Link>
        </Typography>
        <div>
          <Link to="/blog" className="nav-link">Blog</Link>
          <Link to="/libros" className="nav-link">Libros</Link>
        </div>
      </Toolbar>
    </AppBar>
  )
}
