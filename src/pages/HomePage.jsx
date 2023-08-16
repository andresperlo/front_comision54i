import React, { useEffect, useState } from 'react'
import CardComp from '../components/CardComp'
import clienteAxios from '../utils/axiosCliente'

const HomePage = () => {
  const [allProducts, setAllProducts] = useState([])

  const getAllProducts = async () => {
    const res = await clienteAxios.get('/products')
    setAllProducts(res.data.allProducts)
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <>
      <div className="container">
        <div className="row">
          <CardComp arrayProd={allProducts} />
        </div>
      </div>
    </>
  )
}

export default HomePage
