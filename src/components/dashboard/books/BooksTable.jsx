import React, { useCallback, useEffect, useState } from 'react';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { Card, CardContent, Typography, Button, TextField } from '@material-ui/core';




import { getBooksList, removeBook, addBook } from '../../../utils/request';
import swal from 'sweetalert2';
import { amber } from '@material-ui/core/colors';
import CreateBookForm from './CreateBookForm';

export default function BooksTable({ user }) {
  const [books, setBooks] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const getBooks = useCallback(async () => {
    try {
      const { data } = await getBooksList();
      console.log(data);
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

  const editBook = async () => {

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
    // for (const obj of formData.values()) {
    //   console.log(obj);
    // }// para mostrar el formData
    try {
      const response = await addBook(user.token, formData);
      console.log(response);
      
    } catch (error) {
      console.log(error)
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
                <TableCell>Fecha de creación</TableCell>
                <TableCell>Precio</TableCell>
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
                        <TableCell>{book.created_at}</TableCell>
                        <TableCell>{book.price}</TableCell>
                        <TableCell>
                          <Button
                            color="primary"
                            title="Edit"
                            onClick={() => editBook(book._id)}
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
      
    </>
  )
}
