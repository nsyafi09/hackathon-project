import React from 'react';
import logo from './images/logo/rakuten-logo.png'
// Importing Navbar CSS
import '../css/navbar.css'
import {Link} from 'react-router-dom'


function Navbar() {
    return(
    <nav className="nav">
        <a className="nav-logo" href="/"
        ><img src={logo} className="logo"
        /></a>
        <div>
        <ul>
            {/* <!-- List for links on navbar --> */}
            <li><a href="">Rakuten</a></li>
        </ul>
        </div>
    </nav>
    )
}

export default Navbar