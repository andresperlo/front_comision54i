import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import clienteAxios, { config } from '../utils/axiosCliente';

const ModalComp = (props) => {
  const { type, idProd, getAllProducts } = props

  const [show, setShow] = useState(false);
  const [idProdState, setIdProdState] = useState('');
  const [product, setProduct] = useState({})

  const handleClose = () => setShow(false);

  const handleClick = async () => {
    const res = await clienteAxios.get(`/products/${idProd}`, config)
    setProduct(res.data.oneProduct)
    setShow(true)
  }

  const handleChange = (ev) => {
    const { name, value } = ev.target
    setProduct({ ...product, [name]: value })
  }

  const sendFormProd = async (id) => {
    try {
      const res = await clienteAxios.put(`/products/${id}`, product, config)

      if (res.status === 200) {
        Swal.fire(
          res.data.msg,
          '',
          'success'
        )
        getAllProducts()
        handleClose()
      }
    } catch (error) {
      if(error.response.status === 400){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.msg
        })
      }
    }
  }

  const createProd = async () => {
    const res = await clienteAxios.post('/products', product, config)

    if (res.status === 201) {
      Swal.fire(
        'Producto creado!',
        res.data.msg,
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
