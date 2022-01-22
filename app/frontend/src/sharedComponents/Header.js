import React from 'react'
import '../css/homepage.css'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

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
                <div id='header-username'>Logged in as {props.username.replace(/(^|\s)\S/g, letter => letter.toUpperCase())} </div>
                <a href={`http://localhost:3000/user/cart/${props.user_id}`}>
                <FontAwesomeIcon icon={faShoppingCart} />
                </a>
                <button onClick={logout}><FontAwesomeIcon icon={faSignOutAlt} /></button>
            </div> :
            <div id='login-div'>
                <a href='http://localhost:3000/login-signup' className='login-div-item'>Login | </a>
                <a href='http://localhost:3000/login-signup' className='login-div-item'>Sign up</a>
            </div>
            }
            
        </div>
    )
}
