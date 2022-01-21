import React from 'react'

export default function GameDetails(props) {
    return (
        <div id='game-details-card'>
            <img id='game-details-image' src={props.gameData.image} alt='' />
            <h3>Game description</h3>
            <p id='game-description-paragraph'>{props.gameData.description}</p>
        </div>
    )
}
