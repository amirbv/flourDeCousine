import React, { useEffect, useState } from 'react';
import { getPostsList } from '../../utils/request';
import BlogElement from './BlogElement';

export default function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await getPostsList();
        console.log(data);
        if (data) {
          setPosts(data);
        }
        
      } catch (error) {
        console.log(error);
      }
    }

    getPosts();
  }, []);


  return (
    <div className="grid-container">
        {
          posts.map((post) => (
            <BlogElement key={post._id} post={post} />
          ))
        }
    </div>
  )
}
