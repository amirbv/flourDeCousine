import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Typography } from '@material-ui/core';
import PostInfo from '../components/post/PostInfo';
import { getPost } from '../utils/request';

export default function Post() {
  const { id: postId } = useParams();
  const [loadingPost, setLoadingPost] = useState(false);
  const [post, setPost] = useState(null);
  
  /* const fakePost = {
    title: 'Receta de Pollo a la milenaria',
    image: 'https://images.pexels.com/photos/1556688/pexels-photo-1556688.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
    ingredients: '1 pollo, 5 hojas de lechuga, 150ml  de salsa de tomate y amor',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis fugit porro obcaecati enim ipsam similique aspernatur, ratione dolorem ullam explicabo impedit animi libero aliquid, praesentium, repudiandae maxime quisquam qui vitae.'
  } */

  useEffect(() => {
    setLoadingPost(true);

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
      <>
        <Typography variant="h3">Cargando post...</Typography>
      </>
    )
  }
  else if (!post && !loadingPost) {
    return (
      <>
        <Typography variant="h3">Lo sentimos el post que buscas no existe</Typography>
        <Link to="/blog">Volver al blog</Link>
      </>
    )
  }
  else {
    return (
      <PostInfo post={post} />
    )

  }
}
