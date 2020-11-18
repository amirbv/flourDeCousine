import React from 'react';
import BlogElement from './BlogElement';

const posts = [
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
];

export default function BlogList() {


  return (
    <div className="blog-posts-container">
        {
          posts.map((post) => (
            <BlogElement key={post.id} post={post} />
          ))
        }
    </div>
  )
}
