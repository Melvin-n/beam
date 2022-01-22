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
            {form === 'Login' && <Login />}
            {form === 'Signup' && <Signup />}
            
            <div id='login-or-signup'>
                <button id='Login' onClick={() => setForm('Login')}>Login</button>
                <button id='Signup' onClick={() => setForm('Signup')}>Signup</button>
            </div>
            <Footer />
        </div>
    )
}
