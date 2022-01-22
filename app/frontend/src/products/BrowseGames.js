import React, { useState } from 'react';
import axios from 'axios'

export default function BrowseGames() {
    
    const [searchTerm, setSearchTerm] = useState('')

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
        axios.post('http://localhost:4000/search', {
            searchTerm: searchTerm
        })
        .then(res => console.log(res))
    }
  return (
    <div>
        <input name='searchTerm' value={searchTerm} onChange={handleChange}/>
    </div>
  )
}

  
