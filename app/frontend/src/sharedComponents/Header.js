import React from 'react'
import '../css/homepage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

export default function Header(props) {
    

    //logout function, deletes JWT cookie
    const logout = () => {
        document.cookie = `accessToken=; Path=/; expires=${new Date(0).toUTCString()}` 
        window.location.assign('http://localhost:3000/')
    }

    
    return (
        
        <div id='header-container'>
            <a id='home-link-header' href='http://localhost:3000/'>
                <h1 id='beam-title'>Beam</h1>
            </a>
            <ul id='nav-list'>
                <li className='nav-list-item'>
                    <a href={'http://localhost:3000/browse-games'}>
                    Browse
                    </a>
                </li>           
                <li className='nav-list-item'>
                    <a href={`http://localhost:3000/user/cart/${props.user_id}`}>
                    View Cart
                    </a>
                </li>
                
            </ul>
            {props.username ?
            <div id='logged-in-container-header'>
                <div id='header-username' >
                    {props.username.replace(/(^|\s)\S/g, letter => letter.toUpperCase())} 
                </div>
                <button id='logout-btn-header'
                    onClick={logout}><FontAwesomeIcon icon={faSignOutAlt} />
                </button>

            </div> :
            <div id='logged-out-container-header'>
                <a href='http://localhost:3000/login-signup' className='login-signup-header'>Login / Signup </a>

            </div>
            }
            
        </div>
    )
}
