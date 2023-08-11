import React, { useCallback, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../css/NavbarComp.css'
import ModalComp from './ModalComp';

const NavbarComp = () => {
  const [userType, setUserType] = useState({})
  const token = JSON.parse(localStorage.getItem('token'))
  const role = JSON.parse(localStorage.getItem('role'))
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

 /*  const getUserType = () => {
    const allUsers = JSON.parse(localStorage.getItem('users'))
    const userFilter = allUsers.filter((user) => user.token === token)
    setUserType(userFilter[0])
  } */

/*   const getUserType = useCallback(async () => {
    const allUsers = JSON.parse(localStorage.getItem('users'))
    const userFilter = allUsers.filter((user) => user.token === token)
    setUserType(userFilter[0])
  }, []); */

/*   useEffect(() => {
    GetOrder()
  }, []) */

 /*  useEffect(() => {
    getUserType()
  }, [])
 */

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link to="/" className='navbar-link'>Logo</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {
            token && role === 'user'
              ?
              <Nav className="me-auto nav-navlink">
                <NavLink to={'/user'}>Inicio</NavLink>
                <NavLink to="/about">Sobre Nosotros</NavLink>
                <NavLink to="/contact">Contacto</NavLink>
                <NavLink to="/cartUser">Carrito</NavLink>
              </Nav>
              :
              token && role === 'admin'
                ?
                <Nav className="me-auto nav-navlink">
                  <NavLink to={'/admin'} className={'mx-3'}>Inicio</NavLink>
                  <NavLink to="/adminUsers">Usuarios</NavLink>
                  <ModalComp type={'nav'}/>
                  <NavLink to="/homeAdmin">Entrar como Usuario</NavLink>
                </Nav>
                :
                <Nav className="me-auto">
                  <NavLink to={"/"}>Inicio</NavLink>
                  <NavLink to="/about">Sobre Nosotros</NavLink>
                  <NavLink to="/contact">Contacto</NavLink>
                </Nav>
          }
          {
            token
              ?
              <>
                < Nav className='ms-auto nav-navlink'>
                  <NavLink onClick={handleClick}>Cerrar Sesion</NavLink>
                </Nav>
              </>
              :
              <>
                <Nav className='ms-auto'>
                  <NavLink to="/login">Iniciar Sesion</NavLink>
                  <NavLink to="/register">Registrarse</NavLink>
                </Nav>
              </>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar >
  )
}

export default NavbarComp
