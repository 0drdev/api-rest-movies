const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const movies = require('./movies.json')

//Get the value this PORT in enviroment variables or usage PORT 3000
const PORT = process.env.PORT || 3000

// Disable header x-powered-by Express
app.disable('x-powered-by')

app.use(express.json()) // Para manejar JSON en el cuerpo de la solicitud

app.get('/movies', (req, res) => {
  // JSON.stringify is used to convert an object or array into a JSON string that can be sent in the HTTP response.
  // Get all the movies
  const data = JSON.stringify(movies)
  res.status(200).send(data)
})

//Obtener movie por id
app.get('/movies/:id', (req, res) => {
  const movie = movies.find((movie) => movie.id == req.params.id)
  if (!movie) return res.status(404).send('Movie not found')
  res.json(movie)
})

//Create a new movie
app.post('/movies', (req, res) => {
  const newMovie = {
    id: movies.length + 1,
    title: req.body.title,
    year: req.body.year,
    director: req.body.director,
    duration: req.body.duration,
    poster: req.body.poster,
    genre: req.body.genre,
    rate: req.body.rate ? req.body.rate === '' : 7.8
  }
  movies.push(newMovie)
  res.status(200).send(newMovie)
})

//Method Update a movie
app.put('/movies/:id', (req, res) => {
  const { id } = req.params
  const updatedMovie = req.body

  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'the movie cannot be updated ' })
  }
  // Update movie
  movies[movieIndex] = {
    ...movies[movieIndex],
    ...updatedMovie
  }

  return res.status(201).json(movies[movieIndex])
})

//Delete movie
app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  // Find id the mive
  const movieIndex = movies.findIndex((movie) => movie.id === id)

  // If not a movie
  if (movieIndex === -1) {
    return res.status(404).json({ message: '404 Movie not found' })
  }
  // Delete first movie
  movies.splice(movieIndex, 1)

  return res.status(200).json({ message: 'Movie deleted' })
})

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`)
})
