const express = require('express')
const cors = require('cors')
const path = require('path')

const indexRouter = require('./routes/index')
const moviesRouter = require('./routes/movies')
const subsRouter = require('./routes/subtitles')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors());

app.use('/', indexRouter)
app.use('/movies', moviesRouter)
app.use('/subs', subsRouter)

app.listen(port, (err) => {
    console.log(`API listening on ${port}!`)
    if (err) throw err
})

module.exports = app