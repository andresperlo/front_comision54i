import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';

const ModalComp = (props) => {
  const { type, idProd, getAllProducts } = props

  const [show, setShow] = useState(false);
  const [idProdState, setIdProdState] = useState('');
  const [product, setProduct] = useState({})

  const handleClose = () => setShow(false);

  const handleClick = async () => {
    const res = await fetch(`http://localhost:8080/api/products/${idProd}`)
    const response = await res.json()
    console.log(response)
    setProduct(response.oneProduct)
    setShow(true)
  }

  const handleChange = (ev) => {
    const { name, value } = ev.target
    setProduct({ ...product, [name]: value })
  }

  const sendFormProd = async (id) => {
    const token = JSON.parse(localStorage.getItem('token'))

    const res = await fetch(`http://localhost:8080/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth': `Bearer ${token}`
      },
      body: JSON.stringify(product)
    })

    const data = await res.json()
    if (data.status === 200) {
      Swal.fire(
        data.msg,
        '',
        'success'
      )
      getAllProducts()
      handleClose()
    }
  }

  const createProd = async () => {
    const token = JSON.parse(localStorage.getItem('token'))

    const res = await fetch('http://localhost:8080/api/products', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'auth': `Bearer ${token}`
      },
      body: JSON.stringify(product)
    })

    const data = await res.json()

    if (data.status === 201) {
      Swal.fire(
        'Producto creado!',
        data.msg,
        'success'
      )
      navigate('/admin')
    }
  }

  useEffect(() => {
    setIdProdState(idProd)
  }, [])

  return (
    <>
      <Button variant="primary" onClick={handleClick}>
        {
          type === 'nav'
            ?
            'Crear Producto'
            :
            'Editar'
        }
      </Button>
      {
        idProd
          ?
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" name='nombre' placeholder="name@example.com" value={product?.nombre} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control type="text" name='precio' placeholder="name@example.com" value={product?.precio} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Codigo</Form.Label>
                  <Form.Control type="text" name='codigo' placeholder="name@example.com" value={product?.codigo} onChange={handleChange} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => sendFormProd(product._id)}>Guardar Cambios</Button>
            </Modal.Footer>
          </Modal>
          :
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Crear Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" name='nombre' placeholder="name@example.com" value={product?.nombre} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control type="text" name='precio' placeholder="name@example.com" value={product?.precio} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Codigo</Form.Label>
                  <Form.Control type="text" name='codigo' placeholder="name@example.com" value={product?.codigo} onChange={handleChange} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={createProd}>Guardar Cambios</Button>
            </Modal.Footer>
          </Modal>
      }

    </>
  )
}

export default ModalComp
