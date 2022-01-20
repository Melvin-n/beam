//import db initialisation
const { db } = require("../db/db")

//bcrypt import and setup
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { default: Stripe } = require("stripe")
const saltRounds = 8
const stripe = require('stripe')(process.env.PRIVATE_STRIPE_KEY)
require('dotenv').config()



//get a list of all the games with sale set to true
const saleItems = (req, res) => {
    const selectQuery = "SELECT title, image, description, price FROM games WHERE sale = ?"
    db.query(selectQuery, [true], (err, result) => {
        if (err) {
            console.log(err)
            res.status(400)
        } else {
            res.send(result)
        }
    })
}

//add a game into the database
const addGame = (req, res) => {
    console.log(req.body)
    const insertQuery = "INSERT INTO games (title, description, image, price, sale) VALUES (?,?,?,?,?)"
    db.query(insertQuery, [req.body.title, req.body.description, req.body.image, req.body.price, req.body.sale], 
        (err, result) => {
            if (err) {
                res.sendStatus(400)
            } else {
                res.redirect('http://localhost:4000/api/games')
            }
        }
    )
}

//get a list of all the games in the database
const getGameList = (req, res) => {
    const selectQuery = "SELECT * FROM games"
    db.query(selectQuery, (err, result) => {
        if (err) {
            res.sendStatus(404)
        } else {
            res.send(result)
        }
    })
}

//get data for a single game based on the id passed in
const getGame = (req, res) => {
    const game_id = req.params.game_id

    const selectQuery = 'SELECT * FROM games WHERE id = ?'
    db.query(selectQuery, [game_id], (err, result) => {
        if (err) {
            res.sendStatus(404)
        } else {
            console.log(result)
            res.send(result)
        }
    })
}

// send user details to db, password salted and hashed
const userSignup = (req, res) => {
    const username = req.body.username
    const plainTextPassword = req.body.password
    const insertQuery = "INSERT INTO users (name, password) VALUES (?, ?)"
    console.log(req.body)
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(plainTextPassword, salt, function(err, hash) {
            //store hash in db
            console.log(hash)
            db.query(insertQuery, [username, hash], (err, result) => {
                if (err) {
                    console.log(err)
                    res.sendStatus(400)
                } else {
                    console.log(result)
                    res.redirect('http://localhost:3000/login-signup')
                }
            })
        })
    })
}

//login user using JWT authorisation and bcrypt hashing
const userLogin = (req, res) => {
    console.log(req.headers)
    console.log(req.body)
    const username = req.body.username
    const plainTextPassword = req.body.password
    let hashedPassword = ''

    //retrieve hashed password from database and compare with user input
    db.query('SELECT password, id FROM users WHERE name = ?', [username], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            const user_id = result[0].id 
            hashedPassword = result[0].password
            bcrypt.compare(plainTextPassword, hashedPassword, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    if (result) {
                        console.log('logged in')
                        //JWT authentication
                        const accessToken = jwt.sign({
                            username: username,
                            user_id: user_id
                        }, process.env.ACCESS_TOKEN_SECRET)

                        res.cookie('accessToken', accessToken)
                        return res.send({"accessToken": accessToken})
                    } else {
                        console.log('failed login')
                        return res.json({"Login status": "Failed"})
                    }
                }
            })
        }
    })

}

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

const getUserCart = (req, res) => {
    const { user_id } = req.params
    console.log(req.params)
    db.query('SELECT games.title, games.price FROM games INNER JOIN cart ON games.id=cart.game_id WHERE cart.user_id = ?', 
    [user_id], (err, result) => {
        if (err) throw err
        res.send(result)
    })
}

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
            success_url: 'http://localhost:3000/cancel',
            cancel_url: 'http://localhost:3000/paymentmade'
        })
        res.json(({url: session.url}))
    }
    catch(e) {
        res.json({error: e.message})
    }
    
}

module.exports = { 
    saleItems,
    addGame, 
    getGameList,
    getGame,
    userSignup,
    userLogin,
    addToCart,
    getUserCart,
    checkout
}