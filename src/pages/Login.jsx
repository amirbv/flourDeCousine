import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert2';
import LoginForm from '../components/login/LoginForm';

import { login } from '../utils/request';
import { setUser } from '../utils/session';

export default function Login() {
  const [submitting, setSubmitting] = useState(false);
  const history = useHistory()

  const submitLogin = async (data) => {
    setSubmitting(true);
    swal.fire({
      title: 'Verificando datos',
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading()
      }
    });
    try {
      const response = await login({
        username: data.email,
        password: data.password
      });
      
      if (response.status === 401) {
        swal.fire({
          icon: 'error',
          title: 'Usuario o contraseña incorrectos'
        })
        return setSubmitting(false);
      }
      setSubmitting(false);
      console.log(response);
      setUser(response.data);
      
      await swal.fire({
        icon: 'success',
        title: 'Has iniciado sesión exitosamente',
        timer: 1500
      })
      history.push('/dashboard');
      history.go(0);
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      })
      setSubmitting(false);
    }
  }
  return (
    <section className="login">
      <LoginForm submitting={submitting} onLogin={submitLogin} />
    </section>
  )
}
