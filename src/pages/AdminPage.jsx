import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import ModalComp from '../components/ModalComp';
import Swal from 'sweetalert2';

const AdminPage = () => {
  const [allProducts, setAllProducts] = useState([])
  const [refreshState, resRefreshState] = useState(false)

  const getAllProducts = async () => {
    const res = await fetch('http://localhost:8080/api/products')
    const response = await res.json()
    setAllProducts(response.allProducts)
  }

  const handleClick = async (id) => {
    const token = JSON.parse(localStorage.getItem('token'))
    
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

        fetch(`http://localhost:8080/api/products/${id}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'auth': `Bearer ${token}`
          }
        })
          .then(res => res.json())
          .then(res => {
            if (res.status === 200) {
              swalWithBootstrapButtons.fire(
                'Eliminado!',
                res.msg,
                'success'
              )
            }
          })

          resRefreshState(true)
      } else if (
        /* Read more about handling dismissals below */
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

  useEffect(() => {
    getAllProducts()
    resRefreshState(false)
  }, [refreshState])

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Codigo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {
          allProducts.map((prod) =>
            <tr key={prod._id}>
              <td>{prod._id}</td>
              <td>{prod.nombre}</td>
              <td>{prod.precio}</td>
              <td>{prod.codigo}</td>
              <td>
                <ModalComp idProd={prod._id} getAllProducts={getAllProducts} />
                <Button variant='danger' onClick={() => handleClick(prod._id)}>Eliminar</Button>
              </td>
            </tr>
          )
        }
      </tbody>
    </Table>
  )
}

export default AdminPage
