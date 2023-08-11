import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const CartPage = () => {
  const [products, setProducts] = useState([])


  const getCart = async () => {
    const token = JSON.parse(localStorage.getItem('token'))
    const idUser = JSON.parse(localStorage.getItem('idUser'))
    const resUser = await fetch(`http://localhost:8080/api/users/${idUser}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'auth': `Bearer ${token}`
      }
    })
    const dataUser = await resUser.json()

    const idCart = dataUser.oneUser.idCart
    const resCart = await fetch(`http://localhost:8080/api/carts/${idCart}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'auth': `Bearer ${token}`
      }
    })
    const dataCart = await resCart.json()
    setProducts(dataCart.cart.products)
  }

  useEffect(() => {
    getCart()
  }, [])

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Codigo</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((producto) =>
              <tr key={producto._id}>
                <td>{producto._id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td>{producto.codigo}</td>
                <td>
                  <input type="number" name="" id="" className='form-control w-25' />
                </td>
                <td>0</td>
              </tr>)

          }
        </tbody>
      </Table>

      <Button>Pagar</Button>
    </>
  )
}

export default CartPage
