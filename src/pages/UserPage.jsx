import React, { useEffect, useState } from 'react'
import CardComp from '../components/CardComp'

const UserPage = () => {
  const [allProducts, setAllProducts] = useState([])

  const getAllProducts = async () => {
    const res = await fetch('http://localhost:8080/api/products')
    const response = await res.json()
    console.log(response)
    setAllProducts(response.allProducts)
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  useEffect(() => {
    console.log(allProducts)
  }, [allProducts])
  
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

export default UserPage
