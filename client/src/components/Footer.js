import React from 'react';
// Importing genre CSS
import '../css/footer.css'
import logo from './images/logo/rakuten-logo.png'


function Footer() {
    return (
      <div className="Footer">
        <footer className="App-footer">
          <img src={logo} className="Footer-logo"/>
          <p>
            All rights reserved
          </p>
        </footer>
      </div>
    );
  }
  
  export default Footer;