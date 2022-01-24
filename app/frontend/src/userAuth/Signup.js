import React, { useState } from 'react'

export default function Signup() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')    

    return (
        <div className='login-signup-form' id='signup-card'>
            <form className='auth-form' method='POST'  action='http://localhost:4000/signup'>
                <label htmlFor='username'>Username</label>
                <input className='input-text-form'
                    type='text'
                    name='username'
                    placeholder='Username' 
                    required 
                    onChange={((e) => setUsername(e.target.value))}
                    value={username}
                    />
                <label htmlFor='password'>Password</label>
                <input className='input-text-form'
                    type='password' 
                    name='password' 
                    placeholder='Password' 
                    required 
                    onChange={((e) => setPassword(e.target.value))}
                    value={password}
                    />
                <input className='submit-user-auth' type='submit' value='Signup' />
            </form>
        </div>
    )
}