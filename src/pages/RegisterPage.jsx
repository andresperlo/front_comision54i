import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const RegisterPage = () => {
  const [formValues, setFormValues] = useState({
    userName: '',
    pass: '',
    rpass: '',
    deleted: false
  })

  const [checkInputUser, setCheckInputUser] = useState(false)
  const [checkInputPass, setCheckInputPass] = useState(false)

  const navigate = useNavigate();

  const handleChange = (ev) => {
    setFormValues({ ...formValues, [ev.target.name]: ev.target.value })

    if (formValues.userName) {
      setCheckInputUser(false)
    } else if (formValues.pass) {
      setCheckInputPass(false)
    }
  }

  /*   const handleClick = () => {
      if (formValues.pass === formValues.rpass) {
        localStorage.setItem('user', JSON.stringify(formValues))
        Swal.fire(
          'Bienvenido!',
          'Registro Exitoso!',
          'success'
        )
        navigate('/login')
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario y/o contraseña incorrecto',
        })
      }
    } */

  const handleClick = async (ev) => {
    if (formValues.userName) {
      if (formValues.pass && formValues.pass.length >= 8) {
        if (formValues.pass === formValues.rpass) {
          const res = await fetch('http://localhost:8080/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: formValues.userName,
              pass: formValues.pass
            })
          })

          const data = await res.json()

          if(data.status === 201){
            Swal.fire(
              'Bienvenido!',
              'Registro Exitoso!',
              'success'
            )
            navigate('/login')
          }
        }
      } else {
        setCheckInputPass(true)
      }

    } else {
      setCheckInputUser(true)

    }

  }

  return (
    <Container className='w-50'>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Usuario</Form.Label>
          <Form.Control type="text" name='userName' className={checkInputUser ? 'form-control is-invalid' : 'form-control'} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control className={checkInputPass ? 'form-control is-invalid' : 'form-control'} type="text" name='pass' onChange={handleChange} />
          {
            checkInputPass &&
            <p>Min. 8 Max. 50 caracteres</p>
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Repetir Contraseña</Form.Label>
          <Form.Control type="text" name='rpass' onChange={handleChange} />
        </Form.Group>

      </Form>
      <Button onClick={handleClick} variant='success'>Registrarse</Button>
    </Container>
  )
}

export default RegisterPage
