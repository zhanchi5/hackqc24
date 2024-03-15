/*
 * Copyright (c) 2024. HackQC24.
 *  Author: Alpha Oumar
 *  Version: 1.0
 */

import "./css/navbar.scss";
import { Link } from "react-router-dom";

function Navbar()
{

  const user = true;
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <span>QLTRS</span>
        </a>
        <a href="/list">Listings</a>
        <a href="/">A Propos</a>
        <a href="/contact">Contactez-Nous</a>
      </div>
      <div className="right">
        {user ? (
          <div className="user">
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <span>Alpha</span>
            <Link to="/profile" className="profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/signin">Sign in</a>
            <a href="/register" className="register">
              Register
            </a>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
