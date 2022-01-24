//import dependencies
import React, { useState } from 'react'

//import components
import Login from './Login'
import Signup from './Signup'
import Footer from '../sharedComponents/Footer'

//import css
import '../css/user-auth.css'


export default function UserAuth() {

    const [form, setForm] = useState('Login')

    return (
        <div id='auth-background'>
            <div className='login-signup-selection'>
                <h1 className='login-signup-title' onClick={() => setForm('Login')}
                 style={{'color': form === 'Login' ? 'black' : 'grey',  
                        'borderBottom': form === 'Login' ? '2px solid firebrick' : 'none'}}>
                Login</h1>
                <h1 className='login-signup-title' onClick={() => setForm('Signup')}
                style={{'color': form === 'Signup' ? 'black' : 'grey',  
                        'borderBottom': form === 'Signup' ? '2px solid firebrick' : 'none'}}>
                Signup</h1>
            </div>
            {form === 'Login' && <Login />}
            {form === 'Signup' && <Signup />}

        </div>
    )
}
