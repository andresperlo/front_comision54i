import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import RoutesViews from './routes/RoutesViews'

const App = () => {
   const arrayUsers =  [
    {
      userName:'admin',
      pass:'admin',
      role:'admin',
      login: false,
      deleted: false,
      token: '11asd12'
    },
    {
      userName:'user',
      pass:'user',
      role:'user',
      login: false,
      deleted: false,
      token: '13asd14'
    }
  ]

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(arrayUsers))
  }, [])
  return (
    <>
      <Router>
        <RoutesViews />
      </Router>
    </>
  )
}

export default App
