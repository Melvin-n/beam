import React, { useState, useEffect } from 'react'
import Header from './Header.js'
import axios from 'axios'
import GameDetails from './GameDetails.js'
import { useParams } from 'react-router-dom'
import './game-page.css'
import Purchase from './Purchase.js'
import Footer from './Footer.js'

export default function GamePage(props) {

    //useparams gets params from the url defined in react router dom
    const { id } = useParams()

    const [gameData, setGameData] = useState()
    const [loaded, setLoaded] = useState(false)

    //sends a request to backend for data on game by {id} as defined in route (in App) and linked by game-brief div (in Gamelist)       
    useEffect(() => {
        axios.get(`http://localhost:4000/game/${id}`)
        .then(res => {
            setGameData(res.data[0])
            console.log(res.data[0])
            setLoaded(true)
        })
    }, [])

    //check for data to be loaded before rendering componenets which require data
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
            <Footer />
        </div>
    )
}
