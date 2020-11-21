import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { Collapse } from 'react-collapse';
import { Typography, TextField, Card, CardContent, Button } from '@material-ui/core';
import { amber } from '@material-ui/core/colors';

import { changePassword } from '../../../utils/request';
import Swal from 'sweetalert2';


const schema = yup.object().shape({
  oldPassword: yup.string().required('La contraseña antigua es requerida'),
  newPassword: yup.string().required('La contraseña nueva es requerida'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword'), null], 'Las contraseñas no coinciden')
    .required('Debes confirmar la contraseña')
});

const initialCollapse = {
  height: 0,
  overflow: 'hidden',
  transition: 'all .2s ease-in'
}

export default function UserUpdateForm({ user }) {

  const [collapseOpen, setCollapseOpen] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const changePasswordForm = async (data) => {
    try {
      const response = await changePassword(user.token, {
        username: user.username,
        oldpassword: data.oldPassword,
        newpassword: data.newPassword
      });
      if (response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Error en la contraseña'
        });
        return
      }
      else {
        Swal.fire({
          icon: 'success',
          title: 'Contraseña cambiada exitosamente',
          timer: 1500,
          showConfirmButton: false
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: error.message
      })
    }
    
  }

  return (
    <div className="mr-top">
      <Typography variant="h3" component="h2">{user?.username}</Typography>
      <div style={{minHeight: '70px'}}>
        <Collapse
            isOpened={user?.role === 'admin' ? collapseOpen : true}
            initialStyle={initialCollapse}
        >
          <div className={"ReactCollapse--collapse"}>
            <form className="form-horizontal" onSubmit={handleSubmit(changePasswordForm)}>
              <Card>
                <CardContent>
                  <div className="form-group">
                    <TextField
                      type="password"
                      name="oldPassword"
                      label="Contraseña antigua"
                      inputRef={register}
                      error={errors?.oldPassword ? true : false}
                      helperText={errors?.oldPassword?.message}
                      variant="outlined"
                      size="small"
                    />
                    <TextField
                      type="password"
                      name="newPassword"
                      label="Contraseña nueva"
                      inputRef={register}
                      error={errors?.newPassword ? true : false}
                      helperText={errors?.newPassword?.message}
                      variant="outlined"
                      size="small"
                    />
                    <TextField
                      type="password"
                      name="confirmPassword"
                      label="Confirmar contraseña"
                      inputRef={register}
                      error={errors?.confirmPassword ? true : false}
                      helperText={errors?.confirmPassword?.message}
                      variant="outlined"
                      size="small"
                    />
                  </div>
                  <Button
                    type="submit"
                    // disabled={submitting}
                    variant="contained"
                    style={{background: amber[700]}}
                  >
                    Cambiar contraseña
                  </Button>
                  {user?.role === 'admin' && <Button
                    type="button"
                    variant="outlined"
                    style={{ borderColor: amber[700], color: amber[700] }}
                    onClick={() => setCollapseOpen(false)}
                  >
                    Cancelar
                  </Button>}
                </CardContent>
              </Card>
            </form>
          </div>
        </Collapse>
        <Collapse
            isOpened={user?.role === 'admin' ? !collapseOpen : false}
          initialStyle={{
            height: 'auto',
            overflow: 'initial',
            transition: 'all .2s ease-in'
          }}
        >
          <div style={{margin: '20px 0'}}>
            <Button
              type="button"
              variant="contained"
              style={{ background: amber[700] }}
              onClick={() => setCollapseOpen(true)}
            >
              Cambiar Contraseña
            </Button>
          </div>
        </Collapse>
      </div>
    </div>
  )
}
