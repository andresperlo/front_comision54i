import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import ContactPage from '../pages/ContactPage'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import UserPage from '../pages/UserPage'
import AdminPage from '../pages/AdminPage'
import ProductPage from '../pages/ProductPage'
import NavbarComp from '../components/NavbarComp'
import ErrorPage from '../pages/ErrorPage'
import CreateProdPage from '../pages/CreateProdPage'
import AdminUserPage from '../pages/AdminUserPage'
import CartPage from '../pages/CartPage'
import PrivateRoute from '../components/PrivateRoute'

const RoutesViews = () => {

  return (
    <>
      <NavbarComp />
      <Routes>
        <Route path='/' element={< HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />

        <Route path='/user' element={
          <PrivateRoute role='user'>
            <UserPage />
          </PrivateRoute>
        } />
        <Route path='/admin' element={
          <PrivateRoute role='admin'>
            <AdminPage />
          </PrivateRoute>
        } />
        <Route path='/product/:id' element={
          <PrivateRoute  role='user'>
            <ProductPage />
          </PrivateRoute>
        } />
        <Route path='/createProd' element={
          <PrivateRoute  role='admin'>
            <CreateProdPage />
          </PrivateRoute>
        } />
        <Route path='/adminUsers' element={
          <PrivateRoute  role='admin'>
            <AdminUserPage />
          </PrivateRoute>
        } />
        <Route path='/cartUser' element={
          <PrivateRoute  role='user'>
            <CartPage />
          </PrivateRoute>
        } />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default RoutesViews
