const express = require('express');
const router = express.Router();
const ytsSearch = require('../sources/yts')

router.get('/', async(req, res) => {
    moviesList = []
    let yts = await ytsSearch(req.query.q)
    moviesList.push.apply(moviesList, yts)
    res.json(moviesList)
});

module.exports = router