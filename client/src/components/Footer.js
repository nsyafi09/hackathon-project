import React from 'react';
// Importing genre CSS
import '../css/footer.css'
import logo25 from './images/logo/logo_25th.png'


function Footer() {
    return (
      <div className="footer">
        <img src={logo25} className="logo25"
        />
        <p className="ri-copyright"><font size="-1"> © Rakuten Group, Inc.</font></p>
      </div>
    );
  }
  
  export default Footer;