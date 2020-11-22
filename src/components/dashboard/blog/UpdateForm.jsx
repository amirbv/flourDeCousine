import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import DialogActions from "@material-ui/core/DialogActions";
import {
  TextField,
  Button,
  Input,
  FormHelperText,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { amber } from "@material-ui/core/colors";

const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];
const schema = yup.object().shape({
  title: yup.string().required("El titulo es requerido"),
  ingredients: yup.string().notRequired(),
  content: yup.string().required("La descripción es requerida"),
  image: yup
    .mixed()
    .nullable()
    .notRequired()
    .test(
      "FILE_FORMAT",
      "El archivo no es de un formato permitido (.PNG/.JPEG)",
      (value) => {
        if (value.length === 0) return true;

        return !value || (value && SUPPORTED_FORMATS.includes(value[0]?.type));
      }
    ),
});

export default function UpdateForm({ onUpdate, handleOpen, post }) {
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      title: post.title,
      ingredients: post.ingredients,
      content: post.content,
    },
  });

  const handleUpdate = (data) => {
    onUpdate({ id: post._id, data });
  };

  return (
    <form className="form" onSubmit={handleSubmit(handleUpdate)}>
      <div className="form-group">
        <TextField
          type="text"
          margin="dense"
          id="title"
          label="Titulo"
          name="title"
          inputRef={register}
          error={errors?.title ? true : false}
          helperText={errors?.title?.message}
          fullWidth
        />
      </div>
      <div className="form-group">
        <TextField
          multiline
          type="text"
          margin="dense"
          id="ingredients"
          label="Ingredientes"
          name="ingredients"
          inputRef={register}
          error={errors?.ingredients ? true : false}
          helperText={errors?.ingredients?.message}
          fullWidth
        />
      </div>
      <div className="form-group">
        <TextField
          multiline
          type="text"
          margin="dense"
          id="content"
          label="Descripción"
          name="content"
          inputRef={register}
          error={errors?.content ? true : false}
          helperText={errors?.content?.message}
          fullWidth
        />
      </div>
      <div className="form-group">
        <FormControl
          error={errors?.image ? true : false}
          style={{ padding: "25px 0" }}
        >
          <InputLabel htmlFor="image">Imagen</InputLabel>
          <Input
            type="file"
            margin="dense"
            id="image"
            label="Cambiar imagen"
            name="image"
            inputRef={register}
            accept="image/png, image/jpeg"
          />
          <FormHelperText>{errors?.image?.message}</FormHelperText>
        </FormControl>
      </div>
      <DialogActions>
        <Button type="button" onClick={handleOpen} color="secondary">
          Cancelar
        </Button>
        <Button type="submit" variant="contained" style={{background: amber[700]}}>
          Añadir
        </Button>
      </DialogActions>
    </form>
  );
}
