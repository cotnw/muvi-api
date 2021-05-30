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
    axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${query}`).then(response => {
        try {
            response.data.movies.forEach(movie => {
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
            })
            return movieHits
        } catch {
            return false
        }
    })
}

module.exports = ytsSearch