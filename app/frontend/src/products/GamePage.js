//import dependencies
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

//import components
import GameDetails from './GameDetails.js'
import Purchase from '../cart/Purchase.js'

//import css
import '../css/game-page.css'


export default function GamePage(props) {

    //useparams gets params from the url defined in react router dom
    const { id } = useParams()

    const [gameData, setGameData] = useState()
    const [loaded, setLoaded] = useState(false)

    //sends a request to backend for data on game by {id}        
    useEffect(() => {
        axios.get(`http://localhost:4000/game/${id}`)
        .then(res => {
            setGameData(res.data[0])
            setLoaded(true)
        })
    }, [])

    //check for data to be loaded before rendering componnets which require data
    if (!loaded) {
        return (
            ''
        )
    }

    return (
        <div>
            <div id='game-page-main'>
                <GameDetails gameData={gameData}  />
                <Purchase gameData={gameData} username={props.username} user_id={props.user_id}/>
            </div>
        </div>
    )
}
