import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'
import './user-auth.css'
import Header from './Header'
import Footer from './Footer'

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
