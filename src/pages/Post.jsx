import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Typography } from '@material-ui/core';
import PostInfo from '../components/post/PostInfo';
import { getPost } from '../utils/request';

export default function Post() {
  const { id: postId } = useParams();
  const [loadingPost, setLoadingPost] = useState(true);
  const [post, setPost] = useState(null);

  useEffect(() => {

    const getOnePost = async () => {
      try {
        const { data } = await getPost(postId);
      console.log(data);
      if (data) {
        setPost(data);
      }
      } catch (error) {
        console.log(error);
      }
      

      setLoadingPost(false);
    }
    
    
    getOnePost();
  }, [postId]);


  if (!post && loadingPost) {
    return (
      <section className="post-content">
        <Typography variant="h3">Cargando post...</Typography>
      </section>
    )
  }
  else if (!post && !loadingPost) {
    return (
      <section className="post-content">
        <Typography variant="h3">Lo sentimos el post que buscas no existe</Typography>
        <Link to="/blog">Volver al blog</Link>
      </section>
    )
  }
  else {
    return (
      <PostInfo post={post} />
    )

  }
}
