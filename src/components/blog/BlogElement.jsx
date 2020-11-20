import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';


export default function BlogElement({ post }) {
  
  return (
    <Card style={{height: '100%'}}>
      <Link to={`blog/${post._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
        <CardMedia
          height={300}
          component="img"
          image={post.imageURL}
        />
        <CardContent>
          <Typography component="h3" variant="h5" noWrap>
            {post.title}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  )
}
