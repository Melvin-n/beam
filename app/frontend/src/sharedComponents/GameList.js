//import dependencies
import axios from 'axios'
import React, { useEffect, useState } from 'react'

//import css
import '../css/homepage.css'


export default function GameList() {

    const [games, setGames] = useState()
    const [isLoaded, setIsLoaded] = useState(false)

    //send request for all games to backend
    useEffect(() => {
        axios.get('http://localhost:4000/games')
        .then(res => {
            setGames(res.data)
            setIsLoaded(true)
        })
    }, [])

    //check for data to be loaded before rendering componenets which require data
    if (!isLoaded) {
        return (
            <div>

            </div>
        )
    }
    
    return (
        <div id='games-list'>
            {/* for each game create href that redirects to game details page with id as param */}
            {games.map((game) => (
                <a href={`http://localhost:3000/game/${game.id}`}>
                    <div className='game-brief'>
                        <img className='small-game-image' src={game.image} alt={game.title} />
                        <h4 className='game-brief-title'>{game.title}</h4>
                        <h5 className='game-brief-price'>${game.price.toFixed(2)}</h5>
                    </div>
                </a>
            ))}
            <button id='view-more-btn'
                onClick={() => window.location = 'http://localhost:3000/browse-games'}>View more &gt;&gt; </button>
        </div>
    )
}
