import Navbar from '../components/Navbar';
import HeroArea from '../components/HeroArea';
import Genre from '../components/Genre';
import Footer from '../components/Footer';

// Showcase page as a Main page

function MainPage() {
  return (
    <div>
        <header>
            <Navbar />
        </header>
        <HeroArea />
        {/* <App /> */}
        <Genre />
        <Footer />
    </div>
  );
}

export default MainPage