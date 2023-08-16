import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import clienteAxios, { config } from '../utils/axiosCliente';

const AdminUserPage = () => {
  const [allUsers, setAllUsers] = useState([])
  const [refreshState, resRefreshState] = useState(false)

  const handleShow = (user) => {
    const updatedUsers = allUsers.map(u => u._id === user._id ? { ...u, showModal: true } : u);
    setAllUsers(updatedUsers);
  };

  const handleClose = (user) => {
    const updatedUsers = allUsers.map(u => u._id === user._id ? { ...u, showModal: false } : u);
    setAllUsers(updatedUsers);
  };

  const getAllUsers = async () => {
    const res = await clienteAxios.get('/users', config)
    setAllUsers(res.data.allUsers)
  }

  const handleChange = (ev, userId) => {
    const { name, value } = ev.target;
    const updatedUsers = allUsers.map(user =>
      user._id === userId ? { ...user, [name]: value } : user
    );
    setAllUsers(updatedUsers);
  };

  const handleClick = async (id) => {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        clienteAxios.delete(`users/${id}`, config)
          .then(res => {
            if (res.status === 200) {
              swalWithBootstrapButtons.fire(
                'Eliminado!',
                res.data.msg,
                'success'
              )
            }
          })

        resRefreshState(true)
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  const handleSendClick = async (id) => {
    const filterUserSend = allUsers.filter((user) => user._id === id)
    const res = await clienteAxios.put(`/users/${id}`, filterUserSend[0], config)

    if (res.status === 200) {
      Swal.fire(
        res.data.msg,
        '',
        'success'
      )
    }
    handleClose(filterUserSend[0])
  }

  useEffect(() => {
    getAllUsers()
    resRefreshState(false)
  }, [refreshState])

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Role</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {
          allUsers.map((user) =>
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>

                <Button variant="warning" onClick={() => handleShow(user)} >
                  Editar
                </Button>

                <Modal show={user.showModal} onHide={() => handleClose(user)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Editar Usuario</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId={`exampleForm.ControlInput1${user._id}`}>
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control type="text" name='username' value={user.username} onChange={(ev) => handleChange(ev, user._id)} />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId={`exampleForm.ControlInput1${user._id}`}>
                        <Form.Label>Role</Form.Label>
                        <Form.Control type="text" name='role' value={user.role} onChange={(ev) => handleChange(ev, user._id)} />
                      </Form.Group>
                    </Form>
                    <Button onClick={() => handleSendClick(user._id)}>Guardar Cambios</Button>
                  </Modal.Body>
                </Modal>
                <Button variant='danger' onClick={() => handleClick(user._id)}>Eliminar</Button>
              </td>
            </tr>
          )
        }
      </tbody>
    </Table>
  )
}

export default AdminUserPage

