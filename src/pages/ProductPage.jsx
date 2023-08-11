import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';

const ProductPage = () => {
  const params = useParams()
  const [product, setProduct] = useState({})
  const [show, setShow] = useState(false);

  const token = localStorage.getItem('token')
  const navigate = useNavigate();

  const handleClose = () => setShow(false);

  const getOneProduct = async () => {
    const res = await fetch(`http://localhost:8080/api/products/${params.id}`)
    const response = await res.json()
    console.log(response)
    setProduct(response.oneProduct)
  }

  const handleClick = async(id) => {
    if (!token) {
      navigate('/login')
    } else {
      const idUser = JSON.parse(localStorage.getItem('idUser'))
      const resUser = await fetch(`http://localhost:8080/api/users/${idUser}`)
      const dataUser = await resUser.json()

      const idCart = dataUser.oneUser.idCart
      const resCart = await fetch(`http://localhost:8080/api/carts/${idCart}/${id}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        }
      })
      const dataCart = await resCart.json()
      if (dataCart.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: dataCart.msg
        })
      } else if (dataCart.status === 200) {
        Swal.fire(
          dataCart.msg,
          '',
          'success'
        )
      }
    }
  }

  useEffect(() => {
    getOneProduct()
  }, [])


  return (
    <Card style={{ width: '100%' }}>
      <div className='d-flex'>
        <Card.Img variant="top" src={product.image} style={{ width: '30%' }} />
        <Card.Body>
          <Card.Title>{product.nombre}</Card.Title>
          <Card.Text>
            ${product.precio}
          </Card.Text>
          <Card.Text>
            {product.description}
          </Card.Text>
          <Button variant="primary" onClick={() => handleClick(product._id)}>
            Agregar al Carrito
          </Button>
          {/* <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Pagar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Nombre del Titular</Form.Label>
                  <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Numeros de la Tarjeta</Form.Label>
                  <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group className='d-flex justify-content-between'>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Fecha de Vencimiento</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Codigo de Seguridad</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                  </Form.Group>
                </Form.Group>
                <Form.Group className='text-center'>
                  <Button>Finalizar el Pago</Button>
                </Form.Group>
              </Form>
            </Modal.Body>
          </Modal> */}
        </Card.Body>
      </div>
    </Card>
  )
}

export default ProductPage
