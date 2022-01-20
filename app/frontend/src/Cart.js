import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './cart.css'

export default function Cart(props) {

    const [gamesInCartPrice, setGamesInCartPrice] = useState([])
    const [gamesCheckout, setgamesCheckout] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [total, setTotal] = useState(0)
    
    console.log(props.user_id)
    useEffect(() => {
        if (props.user_id) {

        }
        axios.post(`http://localhost:4000/user/cart/${props.user_id}`)
        .then(res => res.data.map(game => (
            setGamesInCartPrice(gamesInCartPrice =>[...gamesInCartPrice, [game['title'], game['price']]]),
            setgamesCheckout(gamesCheckout => [...gamesCheckout, game['title']]),
            setTotal(total => total + game['price'])
            )))  
        setLoaded(true)
    }, [props.user_id])

    
    const checkout = () => {
        console.log(gamesInCartPrice)
        axios.post('http://localhost:4000/checkout', {
            gamesInCartPrice
        })
        .then(res => window.location = res.data.url)
        .catch(e => console.log(e.error))
    }
    

    if (!loaded) {
        return ('')
    }
    else {
        return (
        <div id='cart-container'>
            <h1>Cart</h1>
            <table id='cart-table'>
                <tr>
                <th>Item</th>
                <th>Price</th>
                </tr>         
                {gamesInCartPrice.map(game => (
                    <tr>
                    <td>{game[0]}</td>  
                    <td>${game[1]}</td>
                    </tr>
                ))}
                <tr id='total-row'>
                    <td><strong>Total</strong></td>
                    <td><strong>${total.toFixed(2)}</strong></td>
                </tr>
            </table>
            <div id='cart-page-buttons'>
                <button className='cart-button' id='cart-checkout' onClick={checkout}>Checkout</button>
                <button className='cart-button' id='cart-continue-shopping'>Continue shopping</button>
            </div>
        </div>
    )
}
}
