import React, { useState } from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true;

export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //send login data alerts response
    const handleSubmit = async(e) => {

        e.preventDefault()
        axios.post('http://localhost:4000/login', {
                'username': username,
                'password': password
            })
            .then((res) => {
                if (res.data.accessToken) {
                    alert('Login successful')
                    window.location = 'http://localhost:3000'
                } else {
                    alert('Wrong username or password')
                }
            })
            .catch((res) => console.log(res))

            

    }


    return (
        <div className='login-signup-form' id='login-card'>
            <form className='auth-form' onSubmit={handleSubmit}>
                <label for='username'>Username</label>
                <input className='input-text-form'
                    type='text'
                    name='username'
                    placeholder='Username' 
                    required 
                    value={username}
                    onChange={((e) => setUsername(e.target.value))}/>
                <label for='password'>Password</label>
                <input className='input-text-form'
                    type='password' 
                    name='password' 
                    placeholder='Password' 
                    required
                    value={password}
                    onChange={((e) => setPassword(e.target.value))}/>
                <input className='submit-user-auth' type='submit' value='Login' />
            </form>

        </div>

    )
}