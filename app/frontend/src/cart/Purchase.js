//import dependencies
import React from 'react'
import axios from 'axios'

export default function Purchase(props) {


    //Adds an item to the users cart
    const handleClick = (game_id, username) => {
        if (!username) {
            alert('Please log in to use cart.')
        } else {
            axios.post('http://localhost:4000/add-to-cart', {game_id: game_id, username: username})
            .then(res => {
                if (res.data.inCart) {
                    alert('Item already in cart!')
                } else {
                    alert('Added to cart!')
                }
            })
        }
    }

    return (
        <div id='game-purchase-card'>
            <h1>{props.gameData.title}</h1>
            <h2 id='price-purchase-card'>${props.gameData.price.toFixed(2)}</h2>
            <div id='purchase-page-btn-container'>
                <button className='purchase-page-btn' 
                    onClick={() => {handleClick(props.gameData.id, props.username)}}>
                    Add to cart
                </button>
                <button className='purchase-page-btn' 
                    onClick={() => window.location = 'http://localhost:3000/browse-games'}>
                    Back to store
                </button>
            </div>
        </div>
    )
}
