import React from 'react';
import logo from './images/logo/rakuten-logo.png'
// Importing Navbar CSS
import '../css/navbar.css'


function Navbar() {
    return(
    <nav class="nav">
        <a class="nav-logo" href="/"
        ><img src={logo} class="logo"
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