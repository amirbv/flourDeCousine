import React from 'react'
import PostsTable from './blog/PostsTable'

export default function DashBlog({ user }) {
  return (
    <>
      {
        user && <PostsTable user={user} />
      }
    </>
  )
}
