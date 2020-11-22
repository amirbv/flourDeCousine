import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import swal from 'sweetalert2';

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, Button, FormControl, Typography } from "@material-ui/core";
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';

import { createNewSale } from '../../utils/request';
import { amber } from "@material-ui/core/colors";

const schema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  lastname: yup.string().required("El apellido es requerido"),
  email: yup.string().email('Ingrese un email válido').required("El email es requerido")
});

const ERROR_MESSAGES = {
  emptyCardNumber: 'El número de la tarjeta es inválido',
  invalidCardNumber: 'El número de la tarjeta es inválido',
  emptyExpiryDate: 'La fecha de expiración es inválida',
  monthOutOfRange: 'El mes de expiración debe estar entre 01 y 12',
  yearOutOfRange: 'El año de expiración no puede estar en el pasado',
  dateOutOfRange: 'La fecha de expiración no puede estar en el pasado',
  invalidExpiryDate: 'La fecha de expiración es inválida',
  emptyCVC: 'El código de seguridad es inválido',
  invalidCVC: 'El código de seguridad es inválido'
}

export default function BookShop({ open, handleOpen, book }) {
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps
  } = usePaymentInputs({
    errorMessages: ERROR_MESSAGES
  });

  const proceedToCheckout = async (data) => {
    swal.fire({
      title: 'Procesando compra',
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading()
      }
    });
    try {
      const response = await createNewSale(data, book._id);
      if (response.data.success === false) {
        swal.fire({
          icon: 'error',
          title: 'Hubo un error',
          text: response.data.msg
        });
        return;
      }
      else {
        await swal.fire({
          icon: "success",
          title: "Tu compra fue realizada exitosamete",
          text:'Revisa tu email dentro de los proximos minutos',
          showConfirmButton: true
        });
        handleOpen();
      }
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: error.message
      });
    }
  }

  return (
    <Dialog open={open} onClose={handleOpen} style={{zIndex: '999'}}>
      <DialogTitle>Comprar {book.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ingrese sus datos para proceder con la compra, el email ingresado será el lugar donde le llegará el producto
        </DialogContentText>
        <form className="form" onSubmit={handleSubmit(proceedToCheckout)}>
          <div className="form-group">
            <TextField
              type="text"
              margin="dense"
              id="name"
              label="Nombre"
              name="name"
              inputRef={register}
              error={errors?.name ? true : false}
              helperText={errors?.name?.message}
              fullWidth
            />
          </div>
          <div className="form-group">
            <TextField
              multiline
              type="text"
              margin="dense"
              id="lastname"
              label="Apellido"
              name="lastname"
              inputRef={register}
              error={errors?.lastname ? true : false}
              helperText={errors?.lastname?.message}
              fullWidth
            />
          </div>
          <div className="form-group">
            <TextField
              type="email"
              margin="dense"
              id="email"
              label="Email"
              name="email"
              inputRef={register}
              error={errors?.email ? true : false}
              helperText={errors?.email?.message}
              fullWidth
            />
          </div>
          <div className="form-group">
            <FormControl style={{padding: '10px 0'}} fullWidth>
              <Typography>Datos de la tarjeta</Typography>
              <Typography variant="caption" style={{margin: '5px 0'}}>Utilice 4242 4242 4242 4242 como numero, una fecha valida y cualquier cvc para proceder a la compra</Typography>
              <PaymentInputsWrapper {...wrapperProps}>
                <svg {...getCardImageProps({ images })} />
                <input
                  {...getCardNumberProps()}
                  name="card"
                />
                <input
                  {...getExpiryDateProps()}
                  name="date"
                />
                <input
                  {...getCVCProps()}
                  name="cvc"
                />
              </PaymentInputsWrapper>
            </FormControl>
          </div>

          <Typography component="p" variant="h5" align="right" style={{padding: '10p 25px'}}>
            Monto: ${book.price}
          </Typography>

          <DialogActions>
            <Button type="button" onClick={handleOpen} color="secondary">
              Cancelar
            </Button>
            <Button type="submit" variant="contained" style={{background: amber[700]}}>
              Comprar
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
      
    </Dialog>
  );
}

