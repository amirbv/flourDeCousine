import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";

export default function BookItem({ book }) {
  return (
    <Card className="book-card">
      <div className="book-card-image">
        <CardMedia
          className="book-image"
          component="img"
          image={
            "https://i.pinimg.com/originals/04/7d/b5/047db521aeb13ec2ee3eee9551776fee.jpg"
          }
        />
        <div className="absolute-description">
          <Typography variant="caption">
            {book.description}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus reprehenderit dolorum cumque qui nihil doloribus fugiat eum veritatis voluptatem esse nobis, porro eligendi consectetur ipsam ipsa aperiam explicabo ratione inventore!
          </Typography>
        </div>
      </div>
      <CardContent>
        <Typography component="h3" variant="h5" noWrap>
          {book.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
