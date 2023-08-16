import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios, { config } from '../utils/axiosCliente';

const CreateProdPage = () => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    username: '',
    pass: '',
    rpass: '',
    role: ''
  })

  const handleChange = (ev) => {
    setFormValues({ ...formValues, [ev.target.name]: ev.target.value })
  }

  const handleClick = async () => {

    if (formValues.pass !== formValues.rpass) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no son iguales!'
      })
      return
    }

    const res = await clienteAxios.post('/users', {
      username: formValues.username,
      pass: formValues.pass,
      role: formValues.role
    }, config)


    if (res.status === 201) {
      Swal.fire(
        'Producto creado!',
        res.data.msg,
        'success'
      )
      navigate('/admin')
    }
  }

  return (
    <div className='d-flex justify-content-center mt-5'>
      <Form className='w-25'>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Usuario</Form.Label>
          <Form.Control type="text" name='username' onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" name='pass' onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Repetir Contraseña</Form.Label>
          <Form.Control type="password" name='rpass' onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Role</Form.Label>
          <Form.Control type="text" name='role' onChange={handleChange} />
        </Form.Group>
        <Button variant='success' onClick={handleClick} > Crear Usuario </Button>
      </Form>
    </div>
  );
}

export default CreateProdPage
