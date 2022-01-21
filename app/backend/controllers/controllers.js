

//bcrypt import and setup

const stripe = require('stripe')(process.env.PRIVATE_STRIPE_KEY)
require('dotenv').config()





module.exports = { 
    saleItems,
    addGame, 
    getGameList,
    getGame,
    userSignup,
    userLogin,
    addToCart,
    getUserCart,
    checkout,
    deleteFromCart
}