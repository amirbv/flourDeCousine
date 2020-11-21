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
    console.log(response);
    setUser(response.data);
    history.push('/dashboard');
    history.go(0);
    
    swal.fire({
      icon: 'success',
      title: 'Has iniciado sesión exitosamente'
    })
    
    setSubmitting(false);
  }
  return (
    <section className="login">
      <LoginForm submitting={submitting} onLogin={submitLogin} />
    </section>
  )
}
