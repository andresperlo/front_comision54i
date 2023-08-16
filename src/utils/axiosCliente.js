import axios from 'axios'

const token = JSON.parse(localStorage.getItem('token'))

const clienteAxios = axios.create({
  baseURL: 'http://localhost:8080/api'
  /* baseURL: 'http://vercel.api/api' */
})

export const config = {
  headers: {
    'content-type': 'application/json',
    'auth': `Bearer ${token}`
  }
}

export default clienteAxios
