import React, { useEffect, useState } from 'react';

const Navbar = ({user}) => {
  return (
    <nav className="navbar">
      <div className="logo">Techtonic</div>
      <div className="nav-links active">
        {user ? (
          <>
            <a href="#how" className="flex items-center text-2xl">Hi, {user.firstName}</a>
            <a href="/dashboard" className="btn btn-primary">Dashboard</a>
          </>
        ) : (
          <>
            <a href="#" className="btn btn-secondary">Contact Us</a>
            <a href="http://localhost:3000/auth/google" className="btn btn-primary">Sign In</a>
          </>
        )
        }
      </div>
    </nav>
  )
}

export default Navbar

