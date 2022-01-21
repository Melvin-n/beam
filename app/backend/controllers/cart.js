//import db initialisation
const { db } = require("../db/db")

//imports
const stripe = require('stripe')(process.env.PRIVATE_STRIPE_KEY)
require('dotenv').config()


//add an item to cart
const addToCart = (req, res) => {
    const { game_id, username } = req.body
    console.log(game_id, username)
    let user_id;
    db.query('SELECT id FROM users WHERE name = ?', [username], (err, result) => {
        if (err) throw err
        user_id = result[0].id
        
        const insertQuery = 'INSERT INTO cart (user_id, game_id) VALUES (?, ?)'
        db.query(insertQuery, [user_id, game_id], (err, result) => {
            if (err) throw err
            res.send('Added to cart')
        })
    })
}

//get the cart products for the logged in user
const getUserCart = (req, res) => {
    const { user_id } = req.params
    console.log(req.params)
    db.query('SELECT games.title, games.price FROM games INNER JOIN cart ON games.id=cart.game_id WHERE cart.user_id = ?', 
    [user_id], (err, result) => {
        if (err) throw err
        res.send(result)
    })
}

//send url for purchasing cart items
const checkout = async (req, res) => {
    const { gamesInCartPrice } = req.body   
    console.log(gamesInCartPrice)
    try {
        console.log('try')
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: gamesInCartPrice.map(item => {
                return {
                    price_data: {
                        currency: 'nzd',
                        product_data: {
                            name: item[0]
                        },
                        unit_amount: (item[1] * 100).toFixed(0)
                    },
                    quantity : 1
                }
            }),
            success_url: 'http://localhost:3000/payment-success',
            cancel_url: 'http://localhost:3000/payment-cancel'
        })
        res.json(({url: session.url}))
    }
    catch(e) {
        res.json({error: e.message})
    }   
}

//delete an item from the cart
const deleteFromCart = (req, res) => {
    const {title, user_id} = req.body
    let game_id; 
    db.query('SELECT id FROM games WHERE title  = ?', [title], (err, result) => {
        if (err) throw err 
        game_id = result[0]['id'] 
        console.log(game_id)
        console.log(game_id, user_id)
        db.query('DELETE FROM cart WHERE game_id = ? AND user_id = ?', [game_id, user_id], (err, result) => {
            console.log(result)
            if (err) throw err 
            res.json({affectedRows: result.affectedRows})
        })
    })
    
}


module.exports = { 
    addToCart,
    getUserCart,
    checkout,
    deleteFromCart
}