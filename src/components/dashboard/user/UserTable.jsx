import React, { useCallback, useEffect, useState } from 'react';
import swal from 'sweetalert2';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Card, CardContent, Typography } from '@material-ui/core';

import UserAddForm from './UserAddForm';

import { createUser, getUsersList, removeUser } from '../../../utils/request';

export default function UserTable({ user }) {
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    try {
      const { data } = await getUsersList(user.token);
      console.log(data);
      if (data) {
        setUsers(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    
    getUsers();
  }, [getUsers]);


  const deleteUser = async (id) => {
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
        await removeUser(user.token, id);
        swal.fire({
          icon: "success",
          title: "El usuario fue eliminado correctamente",
          timer: 1500,
          showConfirmButton: false
        });
        await getUsers();
      } catch (error) {
        swal.fire({
          icon: "error",
          title: "Hubo un error intente nuevamente"
        });
      }
    }

  }
  const addUser = async (data) => {
    try {
      const response = await createUser(user.token, {
        username: data.email,
        role: data.role,
        password: data.password
      });

      if (response.status === 401) {
        swal.fire({
          icon: 'error',
          title: 'Error en la creación',
          text: response.data.msg
        });
        return
      }
      else {
        swal.fire({
          icon: "success",
          title: "El usuario fue creado correctamente",
          timer: 1500,
          showConfirmButton: false
        });
      }
      
      await getUsers();

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
    <Card>
      <CardContent>
        <Typography variant="h5">Añadir usuario</Typography>
        <UserAddForm createUser={addUser} />
        <Typography variant="h5">Lista de usuarios</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>N°</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Fecha de creación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          {
            users.length > 0 && (
              <TableBody>
                {
                  users.map((userItem, index) => (
                    <TableRow key={userItem._id}>
                      <TableCell>{++index}</TableCell>
                      <TableCell>{userItem.username}</TableCell>
                      <TableCell>{userItem.role}</TableCell>
                      <TableCell>{userItem.created_at}</TableCell>
                      <TableCell>
                        {
                          (userItem.username !== user.username) && (<Button
                            color="secondary"
                            title="Delete user"
                            onClick={() => deleteUser(userItem._id)}
                          >
                            <DeleteIcon />
                          </Button>)
                        }
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            )
          }
        </Table>
        {
          users.length === 0 && <Typography align="center" style={{marginTop: '20px'}}>No se han podido cargar los usuarios</Typography>
        }
      </CardContent>
    </Card>
  )
}
