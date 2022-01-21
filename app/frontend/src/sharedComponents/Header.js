import React, { useEffect, useState } from 'react'
import './homepage.css'

export default function Header(props) {
    

    //logout function, deletes JWT cookie
    const logout = () => {
        document.cookie = "accessToken=;expires=" + new Date(0).toUTCString()
        window.location = 'http://localhost:3000/'
        props.username = ''
    }
    
    return (
        
        <div id='header-container'>
            <a id='home-link-header' href='http://localhost:3000/'>
                <h1>Beam</h1>
            </a>
            <ul id='nav-list'>
                <li className='nav-list-item'>Store</li>
                <li className='nav-list-item'>Forums</li>
                <li className='nav-list-item'>About</li>
            </ul>
            {props.username ?
            <div id='login-div'>
            <div>Logged in as {props.username.replace(/(^|\s)\S/g, letter => letter.toUpperCase())} </div>
            <a href={`http://localhost:3000/user/cart/${props.user_id}`}>My Cart
            </a>
            <button onClick={logout}>Logout</button>
            </div> :
            <div id='login-div'>
                <a href='http://localhost:3000/login-signup' className='login-div-item'>Login | </a>
                <a href='http://localhost:3000/login-signup' className='login-div-item'>Sign up</a>
            </div>
            }
            
        </div>
    )
}
