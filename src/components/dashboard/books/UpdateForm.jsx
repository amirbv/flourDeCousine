import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import DialogActions from "@material-ui/core/DialogActions";
import { TextField, Button, Input, FormHelperText, FormControl, InputLabel } from "@material-ui/core";


const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];
const schema = yup.object().shape({
  title: yup.string().required("El titulo es requerido"),
  description: yup.string().required("La descripción es requerida"),
  author: yup.string().required("El autor es requerido"),
  publisher: yup.string().required("La editorial es requerida"),
  price: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .typeError("Debe ser un numero")
    .positive("Debe ser un numero positivo")
    .required("El precio es requerido"),
  url: yup
    .string()
    .url("La url no tiene un formato válido")
    .notRequired(),
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
// titulo, descripción, autor, editorial, imagen, url y precio.

export default function UpdateForm({ onUpdate, handleOpen, book }) {
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      title: book.title,
      description: book.description,
      author: book.author,
      publisher: book.publisher,
      price: book.price || 0
    }
  });

  const handleUpdate = (data) => {
    onUpdate({ id: book._id, data });
  }

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
          id="description"
          label="Descripción"
          name="description"
          inputRef={register}
          error={errors?.description ? true : false}
          helperText={errors?.description?.message}
          fullWidth
        />
      </div>
      <div className="form-group">
        <TextField
          type="text"
          margin="dense"
          id="author"
          label="Autor"
          name="author"
          inputRef={register}
          error={errors?.author ? true : false}
          helperText={errors?.author?.message}
          fullWidth
        />
      </div>
      <div className="form-group">
        <TextField
          type="text"
          margin="dense"
          id="publisher"
          label="Editorial"
          name="publisher"
          inputRef={register}
          error={errors?.publisher ? true : false}
          helperText={errors?.publisher?.message}
          fullWidth
        />
      </div>
      <div className="form-group">
        <TextField
          type="number"
          margin="dense"
          id="price"
          label="Precio"
          name="price"
          inputRef={register}
          error={errors?.price ? true : false}
          helperText={errors?.price?.message}
          fullWidth
        />
      </div>
      <div className="form-group">
        <TextField
          type="text"
          margin="dense"
          id="url"
          label="URL del libro en PDF"
          name="url"
          inputRef={register}
          error={errors?.url ? true : false}
          helperText={errors?.url?.message}
          fullWidth
        />
      </div>
      <div className="form-group">
        <FormControl error={errors?.image ? true : false} style={{ padding: '25px 0' }}>
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
        <Button type="submit" color="primary">
          Añadir
        </Button>
      </DialogActions>
    </form>
  );
}
