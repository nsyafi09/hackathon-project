import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Navbar from './components/Navbar';
import Showcase from './components/Showcase';
import Genre from './components/Genre';
import Footer from './components/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <body>
        <header>
            <Navbar />
        </header>
        <Showcase />
        {/* <App /> */}
        <Genre />
        <Footer />
    </body>
);

