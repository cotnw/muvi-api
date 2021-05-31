const express = require('express');
const router = express.Router();
const axios = require('axios')
require('dotenv').config()

router.get('/', async(req, res) => {
    moviesList = []
    movieObject = {
        title: '',
        poster_url: '',
        link: '',
        subtitleLink: '',
        torrents: [],
        source: 'YTS Torrents'
    }
    let response = await axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${req.query.q}`)
    console.log(response.data.data.movies)
    if(response.data.data.movies == undefined) {
        res.sendStatus(404)
    } else {
        response.data.data.movies.forEach((movie, index) => {
            movie.torrents.forEach(torrent => {
                movieObject.torrents.push({
                    url: torrent.url,
                    seeds: torrent.seeds,
                    peers: torrent.peers,
                    quality: `${torrent.quality} ${torrent.type}`,
                    size: torrent.size,
                    magnet: `magnet:?xt=urn:btih:${torrent.hash}&dn=${encodeURIComponent(movie.title)}`
                })
            })
            const imdbId = movie.imdb_code

            const config = {
                method: "get",
                url: `https://api.opensubtitles.com/api/v1/subtitles?imdb_id=${imdbId}&languages=en`,
                headers: {
                    "Api-Key": `${process.env.OS_API_KEY}`
                    }
                }
    
                axios(config)
                .then(resp=>{
                    const url = resp.data.data[0].attributes.url
                    movieObject.subtitleLink = url
                    movieObject.title = movie.title
                    movieObject.link = movie.url
                    movieObject.poster_url = movie.medium_cover_image
                    moviesList.push(movieObject)
                    movieObject = {
                        title: '',
                        poster_url: '',
                        link: '',
                        subtitleLink: '',
                        torrents: [],
                        source: 'YTS Torrents'
                    }
                })
                .catch(err=>console.log(err))
        })
        setTimeout(() => {
            res.json(moviesList)
        }, 3000*response.data.data.movies.length);
    }
});

module.exports = router