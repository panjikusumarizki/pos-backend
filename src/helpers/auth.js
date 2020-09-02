const auth = (req, res, next) => {
    const token = req.headers.token
    if (token === '12345') {
        next()
    } else {
        res.json({
            msg: 'Error passing middleware'
        })
    }
}

module.exports = auth