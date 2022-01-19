import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './homepage.css'

//import images
// import goldSilver from '../public/heroimages/goldsilver.jpg'
// import gta3 from '../public/heroimages/gta3.jpg'
// import sf2 from '../public/heroimages/sf2.jpg'
// import tekken4 from '../public/heroimages/tekken4.jpg'



export default function HeroCarousel() {

    const [saleItems, setSaleItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:4000/api/sale')
        .then(res => {
            setSaleItems(res.data)
            setIsLoading(false)
        })
            
    }, [])

    //set scroll carousel
    const [currentHero, setCurrentHero] = useState(0)
    setTimeout(() => {
        if (currentHero > 2) {
            setCurrentHero(0) 
        } else {
            setCurrentHero(currentHero + 1)
        }
        
    }, 2500)

    

    if (isLoading) {
        return (
            <div id='sale-hero'>
                <h2 id='hero-header'>Games on sale</h2>
            </div>
        )
    }
     return (
        <div id='sale-hero'>
            <h2 id='hero-header'>Games on sale</h2>
            <img id='carousel-image' src={saleItems[currentHero].image} alt={saleItems[currentHero].title} /> 
            <h3 id='sale-game-title'>{saleItems[currentHero].title}</h3>
            
        </div>
    )
}
