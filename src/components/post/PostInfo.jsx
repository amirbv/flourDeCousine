import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';

export default function PostInfo({ post }) {
  const { title, content, imageURL, ingredients } = post;

  return (
    <section className="post-content">
      <Typography
        component="h1"
        variant="h3"
        style={{ textTransform: 'capitalize' }}
      >{title}</Typography>
      <div className="post-image-container">
        <img src={imageURL} alt={title} className="post-image" />
      </div>

      {
        ingredients && (
          <div className="ingredients">
            <Typography variant="h4">Ingredientes</Typography>
            <Typography variant="subtitle1">{ingredients}</Typography>
          </div>
        )
      }
      <div className="content">
        <Card>
          <CardContent>
            {
              ingredients && (
                <Typography variant="h4">Preparación</Typography>
              )
            }
            <Typography style={{lineHeight: 2}}>{content}</Typography>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
