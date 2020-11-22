import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PostAddIcon from '@material-ui/icons/PostAdd';
import MenuBookIcon from '@material-ui/icons/MenuBook';


export default function DashList({ user }) {
  const { path } = useRouteMatch();

  return (
    <div className="grid-container alt">
      <Card style={{height: '100%'}}>
        <Link to={`${path}/usuarios`} style={{textDecoration: 'none', color: 'inherit'}}>
          <CardMedia
            className="dash-icon"
            component="div"
          ><GroupIcon fontSize="inherit" /></CardMedia>
          <CardContent>
            <Typography component="h3" variant="h5" align="center">
              Usuario
            </Typography>
          </CardContent>
        </Link>
      </Card>
      {
        (user?.role === 'admin') && <Card style={{ height: '100%' }}>
          <Link to={`${path}/ventas`} style={{textDecoration: 'none', color: 'inherit'}}>
            <CardMedia
              className="dash-icon"
              component="div"
            ><MonetizationOnIcon fontSize="inherit" /></CardMedia>
            <CardContent>
              <Typography component="h3" variant="h5" align="center">
                Ventas
              </Typography>
            </CardContent>
          </Link>
        </Card>
      }
      <Card style={{height: '100%'}}>
        <Link to={`${path}/posts`} style={{textDecoration: 'none', color: 'inherit'}}>
          <CardMedia
            className="dash-icon"
            component="div"
          ><PostAddIcon fontSize="inherit" /></CardMedia>
          <CardContent>
            <Typography component="h3" variant="h5" align="center">
              Posts
            </Typography>
          </CardContent>
        </Link>
      </Card>
      {
        (user?.role === 'admin') && <Card style={{ height: '100%' }}>
          <Link to={`${path}/libros`} style={{textDecoration: 'none', color: 'inherit'}}>
            <CardMedia
              className="dash-icon"
              component="div"
            ><MenuBookIcon fontSize="inherit" /></CardMedia>
            <CardContent>
              <Typography component="h3" variant="h5" align="center">
                Libros
              </Typography>
            </CardContent>
          </Link>
        </Card>
      }
    </div>
  )
}
