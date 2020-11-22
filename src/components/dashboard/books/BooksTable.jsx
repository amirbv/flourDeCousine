import React, { useCallback, useEffect, useState } from 'react';
import swal from 'sweetalert2';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import LinkIcon from '@material-ui/icons/Link';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { amber } from '@material-ui/core/colors';

import CreateBookForm from './CreateBookForm';
import UpdateBookModal from './UpdateBookModal';
import { getBooksList, removeBook, addBook, updateBook } from '../../../utils/request';

export default function BooksTable({ user }) {
  const [books, setBooks] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const getBooks = useCallback(async () => {
    try {
      const { data } = await getBooksList();
      if (data) {
        setBooks(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getBooks();
  }, [getBooks]);


  const deleteBook = async (id) => {
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
        await removeBook(user.token, id);
        swal.fire({
          icon: "success",
          title: "El libro fue eliminado correctamente",
          timer: 1500,
          showConfirmButton: false
        });
        await getBooks();
      } catch (error) {
        swal.fire({
          icon: "error",
          title: "Hubo un error intente nuevamente"
        });
      }
    }
  }

  const createNewBook = async (data) => {
    let formData = new FormData();

    const DATA = { ...data }
    for (const attribute in DATA) {
      if (attribute === 'image') {
        formData.append(attribute, DATA[attribute][0]);
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
        title: 'Agregando libro',
        showConfirmButton: false,
        willOpen: () => {
          swal.showLoading()
        }
      });
      const response = await addBook(user.token, formData);
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
          title: "El libro fue agregado correctamente",
          timer: 1500,
          showConfirmButton: false
        });
        
        await getBooks();
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

  const handleOpenUpdate = (book) => {
    setSelectedBook(book);
    setOpenUpdate(true);
  }
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedBook(null);
  }

  const editBook = async ({ id, data }) => {
    let formData = new FormData();

    const DATA = { ...data }
    for (const attribute in DATA) {
      if (attribute === 'image' && typeof DATA[attribute][0] === 'undefined') {
        continue;
      }
      else if (attribute === 'url' && DATA[attribute] === '') {
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
      const response = await updateBook(user.token, formData, id);
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
          title: "El libro fue actualizado correctamente",
          timer: 1500,
          showConfirmButton: false
        });
        
        await getBooks();
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
          <Typography variant="h5">Todos los libros</Typography>
          <Button
            style={{ color: amber[700], margin: '20px 0' }}
            onClick={() => setOpenCreate(true)}
          >Añadir libro</Button>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>N°</TableCell>
                <TableCell>Titulo</TableCell>
                <TableCell>Autor</TableCell>
                <TableCell>Editorial</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Imagen</TableCell>
                <TableCell>Fecha de creación</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            {
              books.length > 0 && (
                <TableBody>
                  {
                    books.map((book, index) => (
                      <TableRow key={book._id}>
                        <TableCell>{++index}</TableCell>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.publisher}</TableCell>
                        <TableCell>{book.price}</TableCell>
                        <TableCell align="center">
                          <a href={book.imageURL} target="_blank" rel="noopener noreferrer">
                            <LinkIcon />
                          </a>
                        </TableCell>
                        <TableCell>{book.created_at}</TableCell>
                        <TableCell>
                          <Button
                            color="primary"
                            title="Edit"
                            onClick={() => handleOpenUpdate(book)}
                          >
                            <BorderColorIcon />
                          </Button>
                          <Button
                            color="secondary"
                            title="Delete"
                            onClick={() => deleteBook(book._id)}
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
            books.length === 0 && <Typography align="center" style={{marginTop: '20px'}}>No se han podido cargar los libros</Typography>
          }
        </CardContent>
      </Card>
    
      <CreateBookForm open={openCreate} handleOpen={()=>setOpenCreate(false)} onCreate={createNewBook} />
      
      <UpdateBookModal open={openUpdate} handleOpen={handleCloseUpdate} onUpdate={editBook} book={selectedBook} />
    </>
  )
}
