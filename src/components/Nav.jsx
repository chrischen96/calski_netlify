import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
// import { useEffect } from 'react'
import { useLogout } from '../hooks/useLogout.jsx'

const Nav = () => {
  const handleClick = (e) => {
    document.querySelector('.navbar-toggler').click()
  }

  const { logout } = useLogout()
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div className='nav-bar'>
      <nav className="navbar navbar-expand-md bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/"><img src={logo} alt='logo' className='logo'/></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link className='nav-link active' to='/' onClick={handleClick}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to='/resorts' onClick={handleClick}>Resorts</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to='/plans' onClick={handleClick}>My Plans</Link>
              </li>
            </ul>
            {/* <ul className="navbar-nav ms-auto mb-2 mb-md-0">
              <li className="nav-item">
              <Link className='nav-link' to='/login' onClick={handleClick}>Login</Link>
              </li>
              <li className="nav-item">
              <Link className='nav-link' to='/signup' onClick={handleClick}>Signup</Link>
              </li>
            </ul> */}

            {user? (
              <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <Link className='nav-link' to='/plans' onClick={handleClick}>{user.email}</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to='/login' onClick={logout}>Logout</Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <Link className='nav-link' to='/login' onClick={handleClick}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to='/signup' onClick={handleClick}>Signup</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav