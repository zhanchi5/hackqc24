/*
 * Copyright (c) 2024. HackQC24.
 *  Author: Alpha Oumar
 *  Version: 1.0
 */

import "./css/layout.scss";
import Navbar from "../components/Navbar.tsx"
import { Outlet } from "react-router-dom";

function Layout()
{
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet/>
      </div>
    </div>
  );
}

export default Layout;
