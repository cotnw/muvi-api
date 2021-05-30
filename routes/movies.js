const express = require('express');
const router = express.Router();
const yts = require('../sources/yts')

router.get('/', async(req, res) => {
    moviesList = []
    let yts = await yts(req.query.q)
    moviesList.push.apply(moviesList, yts)
    res.json(moviesList)
});

module.exports = router