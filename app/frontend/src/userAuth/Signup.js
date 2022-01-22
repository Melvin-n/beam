import React, { useState } from 'react'

export default function Signup() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')    

    return (
        <div id='signup-card'>
            <h1 className='login-signup-title'>Signup</h1>
            <form className='auth-form' method='POST'  action='http://localhost:4000/signup'>
                <label htmlFor='username'>Username</label>
                <input type='text'
                    name='username'
                    placeholder='Username' 
                    required 
                    onChange={((e) => setUsername(e.target.value))}
                    value={username}
                    />
                <label htmlFor='password'>Password</label>
                <input type='password' 
                    name='password' 
                    placeholder='Password' 
                    required 
                    onChange={((e) => setPassword(e.target.value))}
                    value={password}
                    />
                <input type='submit' value='Signup' />
            </form>
        </div>
    )
}