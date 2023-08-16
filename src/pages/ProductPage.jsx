import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios, { config } from '../utils/axiosCliente';

const ProductPage = () => {
  const params = useParams()
  const navigate = useNavigate();

  const [product, setProduct] = useState({})

  const token = localStorage.getItem('token')

  const getOneProduct = async () => {
    const res = await clienteAxios.get(`/products/${params.id}`)
    setProduct(res.data.oneProduct)
  }

  const handleClick = async (id) => {
    if (!token) return navigate('/login')

    try {
      const idUser = JSON.parse(localStorage.getItem('idUser'))
      const resUser = await clienteAxios.get(`/users/${idUser}`, config)
      const resCart = await clienteAxios.post(`/carts/${resUser.data.oneUser.idCart}/${id}`, {}, config)

      if (resCart.status === 200) {
        Swal.fire(
          resCart.data.msg,
          '',
          'success'
        )
      }
    } catch (error) {
      if (error.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.msg
        })
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
        </Card.Body>
      </div>
    </Card>
  )
}

export default ProductPage
