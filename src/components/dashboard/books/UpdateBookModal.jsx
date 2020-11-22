import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import UpdateForm from "./UpdateForm";


export default function UpdateBookForm({ open, handleOpen, onUpdate, book }) {

  if (book !== null) {
    return (
      <Dialog open={open} onClose={handleOpen}>
        <DialogTitle>Editar libro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edite los campos necesarios, dejar la url vacía o la imagen sin cargar significa que dichos campos no se actualizarán.
          </DialogContentText>
          <UpdateForm handleOpen={handleOpen} onUpdate={onUpdate} book={book} />
        </DialogContent>
      </Dialog>
    );
  }
  else {
    return <></>
  }
}
