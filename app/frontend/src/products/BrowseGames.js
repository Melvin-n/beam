import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../css/game-page.css'
export default function BrowseGames() {
    
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const handleChange = (e) => {
        setSearchTerm(e.target.value)    
    }

    //when search term changes, send request to get matching search results
    useEffect(() => {
        axios.post('http://localhost:4000/search', {
            searchTerm: searchTerm
        })
        .then(res => setSearchResults(res.data))
    },[searchTerm])

  return (
    <>
    <div id='search-container'>
        <h3> Search for a game</h3>
        <input id='game-search-query' autoComplete='off'
        name='searchTerm' value={searchTerm} 
        onChange={handleChange}
        />

    </div>
    <div id='games-list'>
        {searchResults.map((game) => (
            <a href={`http://localhost:3000/game/${game.id}`}>
                <div className='game-brief'>
                    <img className='small-game-image' src={game.image} alt={game.title} />
                    <h4>{game.title}</h4>
                    <h5>${game.price.toFixed(2)}</h5>
                </div>
            </a>
        ))}
    </div>
    </>
  )
}

  
