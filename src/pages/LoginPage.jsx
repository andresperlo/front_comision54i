import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios, { config } from '../utils/axiosCliente';

const LoginPage = () => {
  const [formValues, setFormValues] = useState({
    userName: '',
    pass: ''
  })

  const navigate = useNavigate();

  const handleChange = (ev) => {
    setFormValues({ ...formValues, [ev.target.name]: ev.target.value })
  }
  
  const handleClick = async () => {
    const res = await clienteAxios.post('/users/login', {
      username: formValues.userName,
      pass: formValues.pass
    }, config)

    if (res.status === 200) {
      localStorage.setItem('token', JSON.stringify(res.data.userExist.token))
      localStorage.setItem('role', JSON.stringify(res.data.userExist.role))
      localStorage.setItem('idUser', JSON.stringify(res.data.userExist._id))

      res.data.userExist.role === 'admin'
        ?
        navigate('/admin')
        :
        navigate('/user')
    } else {
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
