import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';


export default function BlogElement({ post }) {
  
  return (
    <Card>
      <Link to={`blog/${post.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
        <CardMedia
          height={300}
          component="img"
          image={post.image}
        />
        <CardContent>
          <Typography component="h3" variant="subtitle1" noWrap>
            {post.title}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  )
}
