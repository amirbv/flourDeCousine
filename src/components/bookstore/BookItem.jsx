import React from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import { amber } from "@material-ui/core/colors";



export default function BookItem({ book }) {

  return (
    <>
      <Card className="book-card">
        <div className="book-card-image">
          <CardMedia
            className="book-image"
            component="img"
            image={book.imageURL}
            alt={book.title + ' preview'}
          />
          <div className="absolute-description">
            <Typography variant="caption">
              {book.description}
            </Typography>
            <Typography variant="caption">Editorial: {book.publisher}</Typography>
          </div>
        </div>
        <CardContent>
          <Typography component="h3" variant="h5" noWrap>
            {book.title}
          </Typography>
          <Typography component="p" variant="caption" noWrap>
            {book.author}
          </Typography>
          <Typography component="p" variant="subtitle2" >
            ${book.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" style={{background: amber[500]}}>
            Comprar
          </Button>
        </CardActions>
      </Card>
    
    </>
  );
}
