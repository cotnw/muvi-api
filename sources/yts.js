const axios = require('axios')
const yts = require('yts')

const ytsSearch = async(query) => {
    let res = await yts.listMovies({ query_term: query })
    console.log(res)
    return res
}

module.exports = ytsSearch