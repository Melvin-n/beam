//import dependencies
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import base64 from 'react-native-base64'

//import components.js
import Homepage from './homepage/Homepage.js';
import Addgame from './products/Addgame.js';
import GamePage from './products/GamePage.js';
import UserAuth from './userAuth/UserAuth.js';
import Header from './sharedComponents/Header.js';
import Cart from './cart/Cart';
import SuccessPayment from './cart/SuccessPayment.js';
import CancelledPayment from './cart/CancelledPayment.js';
import Footer from './sharedComponents/Footer.js';
import BrowseGames from './products/BrowseGames.js';

//import css
import './css/App.css';
import './css/homepage.css';


export default function App() {
    const [decodedUsername, setDecodedUsername] = useState()
    const [decodedUserID, setDecodedUserID] = useState()

    //decodes JWT, saves id and username to variables
    useEffect(() => {
        if (decodedUsername === undefined || decodedUserID === undefined) {
            const cookie = document.cookie
            if (cookie.includes('accessToken')) {
                const parts = cookie.split(';')
                console.log(parts)
                const token = parts.filter(part => part.includes('accessToken'))
                const encodedtokenUsername = token[0].split('.')[1]
                console.log( token[0].split('.'))
                setDecodedUsername(base64.decode(encodedtokenUsername).split('"')[3])
                setDecodedUserID(base64.decode(encodedtokenUsername).split('"')[6].split('')[1])
            } else {
                setDecodedUsername('')
                setDecodedUserID('')
            }
        }
       
        
    }, []) 

    return (
        <div className='App'>
            <Header username={decodedUsername} user_id={decodedUserID}/>

            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Homepage username={decodedUsername} user_id={decodedUserID} />} />
                    <Route path='/api/addgame' element={<Addgame username={decodedUsername} />} />
                    <Route path='/game/:id' element={<GamePage username={decodedUsername} user_id={decodedUserID} />} />
                    <Route path='/login-signup' element={<UserAuth username={decodedUsername} user_id={decodedUserID} />} />
                    <Route path='/user/cart/:user_id' element={<Cart username={decodedUsername} user_id={decodedUserID} />} />
                    <Route path='/browse-games' element={<BrowseGames />} />
                    <Route path='/payment-success' element={<SuccessPayment />} />
                    <Route path='/payment-cancel' element={<CancelledPayment />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    )
}
