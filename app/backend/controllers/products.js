//import db initialisation
const { db } = require("../db/db")


//get a list of all the games with sale set to true
const saleItems = (req, res) => {
    const selectQuery = "SELECT title, image, description, price, id FROM games WHERE sale = ?"
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
                res.send(Status(400))
            } else {
                res.redirect('http://localhost:3000/api/addgame')
            }
        }
    )
}

//get a list of some games (6) the database to display on home screen
const getGameList = (req, res) => {
    const selectQuery = "SELECT * FROM games ORDER BY title LIMIT 6"
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

//send games back which match search term
const searchQuery = (req, res) => {

    const searchTerm = `%${req.body.searchTerm}%`
    console.log(searchTerm)
    const selectQuery = `SELECT * FROM games WHERE title LIKE ?`

    db.query(selectQuery, [searchTerm], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })

}

module.exports = { 
    saleItems,
    addGame, 
    getGameList,
    getGame,
    searchQuery
}