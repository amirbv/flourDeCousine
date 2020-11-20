import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core'
import StarRateIcon from '@material-ui/icons/StarRate';
import BooksList from '../components/bookstore/BooksList';

import { getBooksList } from '../utils/request'; 

export default function Bookstore() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const { data } = await getBooksList();
        console.log(data);
        if (data) {
          setBooks(data);
        }
        
      } catch (error) {
        console.log(error);
      }
    }

    getBooks();
  }, []);

  return (
    <section className="bookstore">
      <Typography component="h1" variant="h3">Aquí podrás comprar nuestros libros de recetas</Typography>
      <Typography>
        Estamos orgullosos de nuestras recetas 5
        <StarRateIcon style={{ verticalAlign: 'bottom' }} />
      </Typography>
      
      <BooksList books={books} />
    </section>
  )
}
