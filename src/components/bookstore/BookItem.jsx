import React from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
// import { useRouteMatch } from "react-router-dom";
import { amber } from "@material-ui/core/colors";



export default function BookItem({ book }) {
  // const { path } = useRouteMatch();

  return (
    <Card className="book-card">
      <div className="book-card-image">
        <CardMedia
          className="book-image"
          component="img"
          image={book.imageURL}
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
        <Button
          className="snipcart-add-item"
          data-item-id={book._id}
          data-item-image={book.imageURL}
          data-item-name={book.title}
          data-item-url="/"
          data-item-price={book.price}
          variant="contained"
          style={{background: amber[500]}}
        >
          Comprar
        </Button>
      </CardActions>
    </Card>
  );
}
