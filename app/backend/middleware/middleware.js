const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.cookie.split(';')[3]
    console.log(authHeader)
    next()
}

module.exports = {
    authenticateToken
}