import React from 'react';
import logo from './images/logo/rakuten-logo.png'
// Importing Navbar CSS
import '../css/navbar.css'


function Navbar() {
    return(
    <nav className="nav">
        <a className="nav-logo" href="/"
        ><img src={logo} className="logo"
        /></a>
        <div>
        <ul>
            {/* <!-- List for links on navbar --> */}
            <li><a href="">LINK 1</a></li>
            <li><a href="">LINK 2</a></li>
            <li><a href="">LINK 3</a></li>
        </ul>
        </div>
    </nav>
    )
}

export default Navbar