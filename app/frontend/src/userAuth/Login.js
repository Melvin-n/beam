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
            <h1 className='login-signup-title'>Login</h1>
            <form className='auth-form' onSubmit={handleSubmit}>
                <label for='username'>Username</label>
                <input type='text'
                    name='username'
                    placeholder='Username' 
                    required 
                    value={username}
                    onChange={((e) => setUsername(e.target.value))}/>
                <label for='password'>Password</label>
                <input type='password' 
                    name='password' 
                    placeholder='Password' 
                    required
                    value={password}
                    onChange={((e) => setPassword(e.target.value))}/>
                <input type='submit' value='Login' />
            </form>

        </div>

    )
}