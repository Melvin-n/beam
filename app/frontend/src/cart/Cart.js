//import dependencies and css
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../css/cart.css'

export default function Cart(props) {

    const [gamesInCartPrice, setGamesInCartPrice] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [total, setTotal] = useState(0)
    
    //display the customers cart items and prices, also calculate and show total price
    useEffect(() => {
        
        axios.post(`http://localhost:4000/user/cart/${props.user_id}`)
        .then(res => res.data.map(game => (
            setGamesInCartPrice(gamesInCartPrice =>[...gamesInCartPrice, [game['title'], game['price']]]),
            setTotal(total => total + game['price'])
            )))  
        setLoaded(true)
    }, [props.user_id])

    //redirect customer to checkout
    const checkout = () => {
        axios.post('http://localhost:4000/checkout', {
            gamesInCartPrice,
            user_id: props.user_id
        })
        .then(res => window.location = res.data.url)
        .catch(e => console.log(e.error))
    }

    //delete an item from the users cart then reload the page
    const deleteItem = (gameTitle) => {
        axios.delete('http://localhost:4000/delete-cart-item', { data: {
            user_id: props.user_id,
            title: gameTitle
            }
        })
        .then(res => {
            if (res.data.affectedRows !== 0) {
                window.location.reload()
            }
        })
    }   

    if (!loaded) {
        return (<h1>Log in to view your cart.</h1>)
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
                    <td>${game[1].toFixed(2)}</td> 
                    <td><button id='remove-cart-btn' onClick={() => deleteItem(game[0])}>X</button></td>
                    </tr>
                ))}
                <tr id='total-row'>
                    <td><strong>Total</strong></td>
                    <td><strong>${total.toFixed(2)}</strong></td>
                </tr>
            </table>
            <div id='cart-page-buttons'>
                <button className='cart-button' id='cart-checkout' onClick={checkout}>Checkout</button>
                <button className='cart-button' id='cart-continue-shopping'
                 onClick={() => window.location = 'http://localhost:3000/browse-games'}>Keep shopping
                 </button>
            </div>
        </div>
    )
}
}
