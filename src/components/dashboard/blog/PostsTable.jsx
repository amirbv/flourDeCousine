import React, { useCallback, useEffect, useState } from 'react';
import swal from 'sweetalert2';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import LinkIcon from '@material-ui/icons/Link';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { amber } from '@material-ui/core/colors';

import CreatePostForm from './CreatePostForm';
import UpdatePostModal from './UpdatePostModal';

import { addPost, updatePost, getPostsList, removePost } from '../../../utils/request';

export default function PostsTable({ user }) {
  const [posts, setPosts] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const getPosts = useCallback(async () => {
    try {
      const { data } = await getPostsList();
      if (data) {
        setPosts(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);


  const deletePost = async (id) => {
    const result = await swal.fire({
      icon: 'warning',
      title: '¿Estas seguro?',
      text: 'No podrás deshacer los cambios',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Borrar',
      confirmButtonColor: '#f44336'
    });

    if (result.isConfirmed) {
      try {
        await removePost(user.token, id);
        swal.fire({
          icon: "success",
          title: "El Post fue eliminado correctamente",
          timer: 1500,
          showConfirmButton: false
        });
        await getPosts();
      } catch (error) {
        swal.fire({
          icon: "error",
          title: "Hubo un error intente nuevamente",
          text: error.message
        });
      }
    }
  }

  const createNewPost = async (data) => {
    let formData = new FormData();
    console.log(data);

    const DATA = { ...data }
    for (const attribute in DATA) {
      if (attribute === 'image') {
        formData.append(attribute, DATA[attribute][0]);
      }
      else if (attribute === 'ingredients' && DATA[attribute] === '') {
        continue;
      }
      else {
        formData.append(attribute, DATA[attribute]);
      }
    }
    /* for (const obj of formData.keys()) {
      console.log(obj);
    }// para mostrar el formData */
    /* for (const obj of formData.values()) {
      console.log(obj);
    }// para mostrar el formData */

    try {
      setOpenCreate(false);
      swal.fire({
        title: 'Creando post',
        showConfirmButton: false,
        willOpen: () => {
          swal.showLoading()
        }
      });
      const response = await addPost(user.token, formData);
      console.log(response);
      if (response.status === 400 || response.status === 405) {
        swal.fire({
          icon: 'error',
          title: 'Error en la creación',
          text: response.data.msg
        });
        return
      }
      else {
        setOpenCreate(false);

        await swal.fire({
          icon: "success",
          title: "El post fue creado correctamente",
          timer: 1500,
          showConfirmButton: false
        });
        
        await getPosts();
      }
    } catch (error) {
      console.log({error})
      swal.fire({
        icon: "error",
        title: "Hubo un error intente nuevamente",
        text: error.message
      });
    }
  }

  const handleOpenUpdate = (post) => {
    setSelectedPost(post);
    setOpenUpdate(true);
  }
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedPost(null);
  }

  const editPost = async ({ id, data }) => {
    let formData = new FormData();

    const DATA = { ...data }
    for (const attribute in DATA) {
      if (attribute === 'image' && typeof DATA[attribute][0] === 'undefined') {
        continue;
      }
      else if (attribute === 'ingredients' && DATA[attribute] === '') {
        continue;
      }
      else if (attribute === 'image' && typeof DATA[attribute][0] !== 'undefined') {
        formData.append(attribute, DATA[attribute][0]);
      }
      else {
        formData.append(attribute, DATA[attribute]);
      }
    }
    

    try {
      setOpenUpdate(false);
      swal.fire({
        title: 'Verificando y actualizando',
        showConfirmButton: false,
        willOpen: () => {
          swal.showLoading()
        }
      });
      const response = await updatePost(user.token, formData, id);
      if (response.status >= 400) {
        swal.fire({
          icon: 'error',
          title: 'Error en la actualización',
          text: response.data.msg
        });
        return
      }
      else {
        setOpenUpdate(false);

        await swal.fire({
          icon: "success",
          title: "El post fue actualizado correctamente",
          timer: 1500,
          showConfirmButton: false
        });
        
        await getPosts();
      }
    } catch (error) {
      console.log({error})
      swal.fire({
        icon: "error",
        title: "Hubo un error intente nuevamente",
        text: error.message
      });
    }
  }
  


  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5">Todos los posts del blog</Typography>
          <Button
            style={{ color: amber[700], margin: '20px 0' }}
            onClick={() => setOpenCreate(true)}
          >Añadir post</Button>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>N°</TableCell>
                <TableCell>Titulo</TableCell>
                <TableCell>Ingredientes</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Imagen</TableCell>
                <TableCell>Fecha de creación</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            {
              posts.length > 0 && (
                <TableBody>
                  {
                    posts.map((post, index) => (
                      <TableRow key={post._id}>
                        <TableCell>{++index}</TableCell>
                        <TableCell>{post.title}</TableCell>
                        <TableCell align="center">
                          {
                            post.ingredients && <CheckBoxIcon />
                          }
                          {
                            !(post.ingredients) && <CancelPresentationIcon />
                          }
                        </TableCell>
                        <TableCell align="center">
                          {
                            post.content && <CheckBoxIcon />
                          }
                        </TableCell>
                        <TableCell align="center">
                          <a href={post.imageURL} target="_blank" rel="noopener noreferrer">
                            <LinkIcon />
                          </a>
                        </TableCell>
                        <TableCell>{post.created_at}</TableCell>
                        <TableCell>
                          <Button
                            color="primary"
                            title="Edit"
                            onClick={() => handleOpenUpdate(post)}
                          >
                            <BorderColorIcon />
                          </Button>
                          <Button
                            color="secondary"
                            title="Delete"
                            onClick={() => deletePost(post._id)}
                          >
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              )
            }
          </Table>
          {
            posts.length === 0 && <Typography align="center" style={{marginTop: '20px'}}>No se han podido cargar los libros</Typography>
          }
        </CardContent>
      </Card>
    
      <CreatePostForm open={openCreate} handleOpen={()=>setOpenCreate(false)} onCreate={createNewPost} />
      
      <UpdatePostModal open={openUpdate} handleOpen={handleCloseUpdate} onUpdate={editPost} post={selectedPost} />
    </>
  )
}
