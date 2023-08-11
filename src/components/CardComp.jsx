import React from 'react'
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';

const CardComp = (props) => {
  const { arrayProd } = props

  const handleClick = async (id) => {
    const token = JSON.parse(localStorage.getItem('token'))
    console.log(token)
    const idUser = JSON.parse(localStorage.getItem('idUser'))
    const resUser = await fetch(`http://localhost:8080/api/users/${idUser}`, {
      method:'GET',
      headers:{
        'content-type':'application/json',
        'auth': `Bearer ${token}`
      }
    })
    const dataUser = await resUser.json()

    const idCart = dataUser.oneUser.idCart
    const resCart = await fetch(`http://localhost:8080/api/carts/${idCart}/${id}`,{
      method:'POST',
      headers:{
        'content-type':'application/json',
        'auth': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    const dataCart = await resCart.json()
    if(dataCart.status === 400){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: dataCart.msg
      })
    }else if(dataCart.status === 200){
      Swal.fire(
        dataCart.msg,
        '',
        'success'
      )
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
