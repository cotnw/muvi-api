const axios = require('axios')

const ytsSearch = async(query) => {
    movieHits = []
    movieObject = {
        title: '',
        poster_url: '',
        link: '',
        torrents: [],
        source: 'YTS Torrents'
    }
    let response = await axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${query}`)
    console.log(response.data.movies)
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
        movieObject.title = movie.title
        movieObject.link = movie.url
        movieObject.poster_url = movie.medium_cover_image
        movieHits.push(movie)
        movieObject = {
            title: '',
            poster_url: '',
            link: '',
            torrents: [],
            source: 'YTS Torrents'
        }
        console.log(movieHits)
        if (index == (response.data.data.movie_count - 1)) {
            return movieHits
        }
    })
}

module.exports = ytsSearch