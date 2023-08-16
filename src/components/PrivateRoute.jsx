
const PrivateRoute = ({ children, role }) => {
  const token = JSON.parse(localStorage.getItem('token'))
  const roleLS = JSON.parse(localStorage.getItem('role'))

  if (token) {
    if (role === roleLS) {
      return children
    } else {
      if (roleLS === 'admin') {
        location.href = '/admin'
      } else {
        location.href = '/user'
      }
    }
  } else {
    location.href = '/'
  }

}

export default PrivateRoute
