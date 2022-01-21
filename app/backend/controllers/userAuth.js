//import db initialisation
const { db } = require("../db/db")

//imports
const jwt = require("jsonwebtoken")
require('dotenv').config()

const bcrypt = require('bcrypt')
//salts for bcrypt
const saltRounds = 8


// send user details to db, password salted and hashed
const userSignup = (req, res) => {

    const username = req.body.username
    const plainTextPassword = req.body.password
    const insertQuery = "INSERT INTO users (name, password) VALUES (?, ?)"
    
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(plainTextPassword, salt, function(err, hash) {
            //store hash in db
            db.query(insertQuery, [username, hash], (err, result) => {
                if (err) {
                    res.send({error: err})
                } else {
                    res.redirect('http://localhost:3000/login-signup')
                }
            })
        })
    })
}

//login user using JWT authorisation and bcrypt hashing
const userLogin = (req, res) => {

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


module.exports = { 
    userSignup,
    userLogin
}