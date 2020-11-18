import React from 'react';
import { Switch } from 'react-router-dom';
import { Container, CssBaseline } from '@material-ui/core';

import PublicRoute from './components/global/PublicRoute';
import PrivateRoute from './components/global/PrivateRoute';
import Header from './components/global/Header';
import Footer from './components/global/Footer';

import Home from './pages/Home';
import Blog from './pages/Blog';
import Bookstore from './pages/Bookstore';
import Post from './pages/Post';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';


function App() {
  return (

    <React.Fragment>
      <CssBaseline />
      <Header />
      <div className="app">
        <Container fixed style={{padding: '20px 0'}}>
          <Switch>
            <PublicRoute restricted={false} component={Home} exact path='/' />
            <PublicRoute restricted={false} component={Blog} exact path='/blog' />
            <PublicRoute restricted={false} component={Post} exact path='/blog/:id' />
            <PublicRoute restricted={false} component={Bookstore} exact path='/libros' />
            <PublicRoute restricted={true} component={Login} exact path='/admin-login' />
            <PrivateRoute component={Dashboard} path='/dashboard' />
            <PublicRoute restricted={false} component={Error} />
          </Switch>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
