const express = require('express');
const router = express.Router();
const ytsSearch = require('../sources/yts')

router.get('/', async(req, res) => {
    moviesList = []
    moviesList.push(await ytsSearch(req.query.q))
    res.json(moviesList)
});

module.exports = router