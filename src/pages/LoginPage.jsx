import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const [formValues, setFormValues] = useState({
    userName: '',
    pass: ''
  })

  const navigate = useNavigate();

  const handleChange = (ev) => {
    setFormValues({ ...formValues, [ev.target.name]: ev.target.value })
  }
/* 
  const handleClick = () => {
    const usuarioLS = JSON.parse(localStorage.getItem('users'))
    const userFilter = usuarioLS.filter((user) => user.userName === formValues.userName)

    if (formValues.userName === userFilter[0].userName && formValues.pass === userFilter[0].pass) {
      userFilter[0].role === 'admin'
        ?
        (
          localStorage.setItem('token', userFilter[0].token),
          navigate('/admin')
        )
        :

        (
          localStorage.setItem('token', userFilter[0].token),
          navigate('/user')
          )
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario y/o contraseña incorrecto',
      })
    }
  } */

  const handleClick = async() => {
    const res = await fetch('http://localhost:8080/api/users/login', {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: formValues.userName,
        pass: formValues.pass
      })
    })
    
    const data = await res.json()
    if(data?.userExist?.token){
      localStorage.setItem('token', JSON.stringify(data.userExist.token))
      localStorage.setItem('role', JSON.stringify(data.userExist.role))
      localStorage.setItem('idUser', JSON.stringify(data.userExist._id))
      data.userExist.role === 'admin'
      ?
      (
        navigate('/admin')
      )
      :

      (
        navigate('/user')
        )
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario y/o contraseña incorrecto',
      })
    }
  }

  return (
    <Container className='w-50'>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Usuario</Form.Label>
          <Form.Control name='userName' onChange={handleChange} type="text" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control name='pass' onChange={handleChange} type="text" />
        </Form.Group>

        <Button onClick={handleClick}>Iniciar Sesion</Button>
      </Form>
    </Container>
  )
}

export default LoginPage
