const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    res.redirect('https://github.com/cotnw/muvi-api')
});

module.exports = router