import React from 'react'
import BookItem from './BookItem'


export default function BooksList({books}) {
  return (
    <div className="grid-container">
      {
        books.map(book => (
          <BookItem book={book} key={book._id} />
        ))
      }
    </div>
  )
}
