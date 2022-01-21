//import dependencies
import React from 'react'
import axios from 'axios'

export default function Purchase(props) {


    //Adds an item to the users cart
    const handleClick = (game_id, username) => {
        axios.post('http://localhost:4000/add-to-cart', {game_id: game_id, username: username})
        .then(res => console.log(res))
    }

    return (
        <div id='game-purchase-card'>
            <h1>{props.gameData.title}</h1>
            <h2 id='price-purchase-card'>${props.gameData.price}</h2>
            <button onClick={() => {handleClick(props.gameData.id, props.username)}}>Add to cart</button>
            <button>Add to wishlist</button>
        </div>
    )
}
