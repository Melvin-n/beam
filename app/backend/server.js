const express = require('express')
const app = express()
const port = 4000
const mysql = require('mysql')
require('dotenv').config()
const cors = require('cors')
const stripe = require('stripe')(process.env.PRIVATE_STRIPE_KEY)

//import controllers
const {
    saleItems,
    addGame,
    getGameList,
    getGame,
    
} = require('./controllers/products.js')

const {
    userSignup,
    userLogin
} = require('./controllers/userAuth.js')
    
const {
    addToCart,
    getUserCart,
    checkout,
    deleteFromCart
}= require('./controllers/cart.js')

//allow cors for localhost3000, set credentials (such as cookies) to be allowed
const corsOptions = {
  credentials: true, 
  origin: 'http://localhost:3000'
}

app.use(cors(corsOptions));

//parse data
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//import db
const {db} = require('./db/db.js')


//connect to db
db.getConnection(err => {
        if (err) throw err;
        console.log('Successfully connected to database')
    })

//get sale items for frontend homepage
app.get('/api/sale', saleItems)

//add game to db
app.post('/api/addgame', addGame)

//get all games
app.get('/games', getGameList)

//get a game based on id
app.get('/game/:game_id', getGame)

//signup
app.post('/signup', userSignup)

//login user
app.post('/login', userLogin)

//add item to cart
app.post('/add-to-cart', addToCart)

//return items in users cart
app.post('/user/cart/:user_id', getUserCart)

//purchase items in cart
app.post('/checkout', checkout)

//delete items from cart
app.delete('/delete-cart-item', deleteFromCart)



app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})