import React from 'react'
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import clienteAxios, { config } from '../utils/axiosCliente';

const CardComp = (props) => {
  const { arrayProd } = props

  const handleClick = async (id) => {
    try {
      const idUser = JSON.parse(localStorage.getItem('idUser'))
      const resUser = await clienteAxios.get(`/users/${idUser}`, config)
      const resCart = await clienteAxios.post(`/carts/${resUser.data.oneUser.idCart}/${id}`, {}, config)
  
      if(resCart.status === 200){
        Swal.fire(
          resCart.data.msg,
          '',
          'success'
        )
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

  return (
    <>
      {
        arrayProd?.map((prod) =>
          <Card className='my-3 mx-3' key={prod._id} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={prod.image} />
            <Card.Body>
              <Card.Title>{prod.nombre}</Card.Title>
              <Card.Text>
                ${prod.precio}
              </Card.Text>

              <Link to={`/product/${prod._id}`} className='btn btn-primary'>Ver Mas</Link>
              <Button variant='success' onClick={() => handleClick(prod._id)}>Agregar al Carrito</Button>
            </Card.Body>
          </Card>
        )
      }
    </>
  )
}

export default CardComp
