const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config()

router.get('/', async(req, res) => {
   const movieName = req.query.q
   const year = req.query.y
   axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${movieName}&y=${year}`)
   .then(resp=>{
        const movieID = resp.data.imdbID

        const config = {
            method: "get",
            url: `https://api.opensubtitles.com/api/v1/subtitles?imdb_id=${movieID}&languages=en`,
            headers: {
                "Api-Key": `${process.env.OS_API_KEY}`
                }
            }

            axios(config)
            .then(resp=>{
            const url = resp.data.data[0].attributes.url
            res.json(url)
            })
            .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
});

module.exports = router