
const PrivateRoute = ({children}) => {
  const token = JSON.parse(localStorage.getItem('token'))

  if(token){
    return children
  }else{
    location.href = '/'
  }

}

export default PrivateRoute
