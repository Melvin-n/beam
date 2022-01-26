import React from 'react'
import '../css/homepage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

export default function Header(props) {
    

    
    
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
            {/* {props.username ?
            <div id='logged-in-container-header'>
                <div id='header-username' >
                    User 
                </div>
                <button id='logout-btn-header'
                    onClick={logout}><FontAwesomeIcon icon={faSignOutAlt} />
                </button>

            </div> : */}
            <div id='logged-out-container-header'>
                <a href='http://localhost:3000/login-signup' className='login-signup-header'>Login / Signup </a>

            </div>
            
            
        </div>
    )
}
