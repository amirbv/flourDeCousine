import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import BackLink from '../global/BackLink';

export default function PostInfo({ post }) {
  const { title, content, imageURL, ingredients } = post;
  let ingredientsArray;
  if (ingredients) {
    ingredientsArray = ingredients.split('\n').filter(string => (string !== '')).filter(string => (string !== ' '));
  }
  const description = content.split('\n').filter(string => (string !== '')).filter(string => (string !== ' '));

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
            <ul>
              {
                ingredientsArray.map((ingredient, index) => {
                  return <li key={index}><Typography style={{lineHeight: 2}}>{ingredient}</Typography></li>
                })
              }

            </ul>
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
            {
              description.map((content, index) => {
                return <Typography key={index} style={{lineHeight: 2}}>{content}</Typography>
              })
            }
          </CardContent>
        </Card>
      </div>

      <div>
        <BackLink to="/blog" title="Volver al blog" />
      </div>
    </section>
  )
}
