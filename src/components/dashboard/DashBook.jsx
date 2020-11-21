import React from 'react'
import BooksTable from './books/BooksTable'

export default function DashBook({ user }) {
  return (
    <>
      {
        user && <BooksTable user={user}/>
      }
    </>
  )
}
