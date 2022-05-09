import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
        <h1>Not Found</h1>
        <h2>404</h2>
        <Link to="/" className='btn btn-outline-primary'>Inicio</Link>
    </div>
  )
}

export default NotFound