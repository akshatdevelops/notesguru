import React from 'react'
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate("/Login")
  }
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand text-white" to="/">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active text-white" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/About">About</Link>
        </li>
        <li className="nav-item dropdown">
        </li>
        <li className="nav-item">
        </li>
      </ul>
      {!localStorage.getItem('token')?<form className="d-flex">
      <Link className="btn btn-primary mx-2" to="/Login" role="button">Login</Link>
      <Link className="btn btn-primary mx-2" to="/Signup" role="button">Signup</Link>
      </form>:<button onClick={handleLogout} className='btn btn-primary'>Logout</button>  }
    </div>
  </div>
</nav>

  )
}

export default Navbar
