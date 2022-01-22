import '../css/App.css';
import HeroCarousel from './HeroCarousel';
import '../css/homepage.css'
import GameList from '../sharedComponents/GameList';

function Homepage() {
  return (
    <div className="App">
        <HeroCarousel />
        <GameList />
    </div>
  );
}

export default Homepage;
