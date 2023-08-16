import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import clienteAxios, { config } from '../utils/axiosCliente';

const CartPage = () => {
  const [products, setProducts] = useState([])
  
  const getCart = async () => {
    try {
      const idUser = JSON.parse(localStorage.getItem('idUser'))
      const resUser = await clienteAxios.get(`/users/${idUser}`, config)
      const resCart = await clienteAxios.get(`/carts/${resUser.data.oneUser.idCart}`, config)
  
      if(resCart.status === 200){
        setProducts(resCart.data.cart.products)
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
