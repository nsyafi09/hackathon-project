import Navbar from '../components/Navbar';
import Showcase from '../components/Showcase';
import Genre from '../components/Genre';
import Footer from '../components/Footer';

function MainPage() {
  return (
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
}

export default MainPage