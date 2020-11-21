import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";

export default function BookItem({ book }) {
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus reprehenderit dolorum cumque qui nihil doloribus fugiat eum veritatis voluptatem esse nobis, porro eligendi consectetur ipsam ipsa aperiam explicabo ratione inventore!
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
      </CardContent>
    </Card>
  );
}
