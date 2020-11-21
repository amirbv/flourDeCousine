import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardContent, TextField, Typography } from "@material-ui/core";
import { amber } from "@material-ui/core/colors";

const schema = yup.object().shape({
  email: yup.string().email().required('El email es requerido'),
  password: yup.string().required('La contraseña es requerida'),
});


export default function LoginForm({ submitting, onLogin }) {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  return (
    <div className="form-container">
      <form className="form-centered" onSubmit={handleSubmit(onLogin)}>
        <Card>
          <CardContent>
            <Typography component="h2" variant="h3">Iniciar sesión</Typography>
            <div className="form-group">
              <TextField
                type="text"
                name="email"
                label="Email"
                inputRef={register}
                error={errors?.email ? true : false}
                helperText={errors?.email?.message}
                variant="outlined"
                fullWidth
              />

            </div>

            <div className="form-group">
              <TextField
                type="password"
                name="password"
                label="Password"
                inputRef={register}
                error={errors?.password ? true : false}
                helperText={errors?.password?.message}
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="form-group-button">
              <Button
                type="submit"
                disabled={submitting}
                variant="contained"
                style={{ background: amber[700] }}
              >
                Iniciar sesión
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
