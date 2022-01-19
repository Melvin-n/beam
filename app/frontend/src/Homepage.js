import './App.css';
import Header from './Header';
import HeroCarousel from './HeroCarousel';
import './homepage.css'
import GameList from './GameList';
import Footer from './Footer';

function Homepage() {
  return (
    <div className="App">
        <HeroCarousel />
        <GameList />
        <Footer />
    </div>
  );
}

export default Homepage;
