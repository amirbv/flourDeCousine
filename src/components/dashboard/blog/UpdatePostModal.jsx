import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import UpdateForm from "./UpdateForm";


export default function UpdatePostModal({ open, handleOpen, onUpdate, post }) {

  if (post !== null) {
    return (
      <Dialog open={open} onClose={handleOpen}>
        <DialogTitle>Editar Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edite los campos necesarios, ingredientes es un campo opcional para las recetas, si no desea cambiar la imagen deje el campo vacío.
          </DialogContentText>
          <UpdateForm handleOpen={handleOpen} onUpdate={onUpdate} post={post} />
        </DialogContent>
      </Dialog>
    );
  }
  else {
    return <></>
  }
}
