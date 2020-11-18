import React from 'react';
import { Typography } from '@material-ui/core';
import BlogList from '../components/blog/BlogList';

export default function Blog() {
  return (
    <div>
      <Typography component="h1" variant="h3">Bienvenido a nuestra sección de blog</Typography>
      <Typography>Aquí encontraras todo tipo de recetas y noticias de nuestro restaurant</Typography>
      <BlogList />
    </div>
  )
}
