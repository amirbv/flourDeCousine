import React from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';

export default function HomeData() {
  return (
    <section className="home-data">
      <Grid container spacing={3} p={2}>
        <Grid item xs={6}>
          <Card>
            <CardMedia
              height={140}
              component="img"
              image="/images/pexels-chan-walrus-958545.jpg"
            />
            <CardContent>
              <Typography component="h3" variant="subtitle1">
                Bienvenidos a nuestro restaurante
              </Typography>
              <Typography variant="caption">
                Somos un restaurante dedicado a brindar momentos inolvidables y servicios gastronómicos de alta calidad ponemos nuestro amor y máximo empeño en beneficio de nuestros clientes.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardMedia
              height={140}
              component="img"
              image="/images/pexels-elevate-1267320.jpg"
            />
            <CardContent>
              <Typography component="h3" variant="subtitle1">
                Nuestra busqueda
              </Typography>
              <Typography variant="caption">
              Buscamos ser reconocidos por brindar a nuestros clientes sensaciones agradables y momentos felices posicionarnos en el corazón de las familias y de todos los que nos visitan contribuir y aportar nuestro granito de arena para generar felicidad y paz que brinda un mejor futuro a nuestras próximas generaciones.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </section>
  )
}
