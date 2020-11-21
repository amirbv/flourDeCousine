import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { Button, Card, CardContent, TextField } from "@material-ui/core";
import { amber } from "@material-ui/core/colors";

const schema = yup.object().shape({
  email: yup.string().email().required("El email es requerido"),
  password: yup.string().required("La contraseña es requerida"),
  role: yup.string().required("Debe seleccionar un rol"),
});

export default function UserAddForm() {
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const addUser = (data) => {};

  return (
    <form className="form-horizontal" onSubmit={handleSubmit(addUser)}>
      
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
            style={{ background: amber[700] }}
          >
            Cambiar contraseña
          </Button>
    </form>
  );
}
