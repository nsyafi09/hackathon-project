import React from 'react';
import logo from './images/logo/rakuten-logo.png'
// Importing Navbar CSS
import '../css/navbar.css'
import {Link} from 'react-router-dom'
import { useState } from "react";


function Navbar() {
    const [isNavExpanded, setIsNavExpanded] = useState(false);


    return(
    <nav className="nav">
        <a className="nav-logo" href="/"
        ><img src={logo} className="logo"
        /></a>
        <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}>
        {/* svg from Heroicons.com */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>

        </button>

        <div
        className={
            isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
          }>
        <ul>
            {/* <!-- List for links on navbar --> */}
            <li><a href="/">Home</a></li>
        </ul>
        </div>
    </nav>
    )
}

export default Navbar