const NotFound = (req, res) => {
    res.status(404).send(`Route ${req.url} does not exist`)
}

module.exports = NotFound