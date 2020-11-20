import React, { useEffect, useState } from 'react';
import { getPostsList } from '../../utils/request';
import BlogElement from './BlogElement';



/* const postsFake = [
  {
    title: 'holaaaaaaaaaaaa aaaaaaaa aaaaaaaaaaa',
    image: 'https://www.hola.com/imagenes/cocina/recetas/20191014151334/recetas-rapidas-faciles-microondas/0-731-443/recetas-micro-m.jpg',
    id: '1234597543'
  },
  {
    title: 'hola2',
    image: 'https://www.hola.com/imagenes/cocina/recetas/20191014151334/recetas-rapidas-faciles-microondas/0-731-443/recetas-micro-m.jpg',
    id: '1234975163'
  },
  {
    title: 'hola3',
    image: 'https://www.hola.com/imagenes/cocina/recetas/20191014151334/recetas-rapidas-faciles-microondas/0-731-443/recetas-micro-m.jpg',
    id: '7897451398'
  },
  {
    title: 'hola4',
    image: 'https://www.hola.com/imagenes/cocina/recetas/20191014151334/recetas-rapidas-faciles-microondas/0-731-443/recetas-micro-m.jpg',
    id: '1231548952'
  },
  {
    title: 'hola5',
    image: 'https://www.hola.com/imagenes/cocina/recetas/20191014151334/recetas-rapidas-faciles-microondas/0-731-443/recetas-micro-m.jpg',
    id: '124549821'
  }
]; */

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
