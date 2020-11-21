import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, TextField, MenuItem } from "@material-ui/core";
import { amber } from "@material-ui/core/colors";

import ReactHookFormSelect from '../../global/ReactHookFormSelect';

const schema = yup.object().shape({
  email: yup.string().email().required("El email es requerido"),
  role: yup.string().required("Debe seleccionar un rol"),
  password: yup.string().required("La contraseña es requerida"),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('Debes confirmar la contraseña')
});

export default function UserAddForm({ createUser }) {
  const { register, handleSubmit, control, errors } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });


  return (
    <form className="form-horizontal" onSubmit={handleSubmit(createUser)}>
      <div className="form-group">
        <TextField
          type="email"
          name="email"
          label="Email"
          inputRef={register}
          error={errors?.email ? true : false}
          helperText={errors?.email?.message}
          variant="outlined"
          size="small"
        />
        
        <ReactHookFormSelect
          name="role"
          label="Rol"
          control={control}
          defaultValue=""
          helperMessage={errors?.role?.message}
          variant="outlined"
          size="small"
          error={errors?.role ? true : false}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="content manager">Content manager</MenuItem>
        </ReactHookFormSelect>

        <TextField
          type="password"
          name="password"
          label="Contraseña"
          inputRef={register}
          error={errors?.password ? true : false}
          helperText={errors?.password?.message}
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
        <div className="button-container">
          <Button
            type="submit"
            variant="contained"
            size="medium"
            style={{ background: amber[700] }}
          >
            Añadir
          </Button>
        </div>
      </div>
    </form>
  );
}
