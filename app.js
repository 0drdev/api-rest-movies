const express = require('express')
const dotenv = require('dotenv').config()
const { ConnectionError, ValidationMovie } = require('./js/errorHandler/errors')
const app = express()
const movies = require('./movies.json')

// Get the value this PORT in environment variables or usage PORT 3000
const PORT = process.env.PORT || 1234

// Disable header x-powered-by Express
app.disable('x-powered-by')

app.use(express.json()) // To handle JSON in the request body

// Main route
app.get('/', (req, res) => {
  res.send('<h1>API Movies</h1>')
})

// Rutas de tu API
app.get('/movies', (req, res, next) => {
  try {
    // Obtener todas las películas
    const data = JSON.stringify(movies)
    res.status(200).send(data)
  } catch (error) {
    next(new ConnectionError('No data available')) // Use custom error
  }
})

app.get('/movies/:id', (req, res, next) => {
  const movie = movies.find((movie) => movie.id == req.params.id)
  if (!movie) return next(new ValidationMovie('Movie not found')) // Use custom error
  res.json(movie)
})

app.post('/movies', (req, res, next) => {
  try {
    const newMovie = {
      id: movies.length + 1,
      title: req.body.title,
      year: req.body.year,
      director: req.body.director,
      duration: req.body.duration,
      poster: req.body.poster,
      genre: req.body.genre,
      rate: req.body.rate ? req.body.rate : 7.8
    }
    movies.push(newMovie)
    res.status(201).send(newMovie) // status 201 create resource
  } catch (error) {
    next(new ConnectionError('Failed to create movie')) // Use custom error
  }
})

app.put('/movies/:id', (req, res, next) => {
  try {
    const { id } = req.params
    const updatedMovie = req.body

    const movieIndex = movies.findIndex((movie) => movie.id == id)

    if (movieIndex === -1) {
      return next(new ValidationMovie('The movie cannot be updated')) // Use custom error
    }
    // Actualizar película
    movies[movieIndex] = {
      ...movies[movieIndex],
      ...updatedMovie
    }

    return res.status(200).json(movies[movieIndex]) // status 200 if the resource is updated
  } catch (error) {
    next(new ConnectionError('Failed to update movie')) // Use custom error
  }
})

app.delete('/movies/:id', (req, res, next) => {
  try {
    const { id } = req.params
    const movieIndex = movies.findIndex((movie) => movie.id == id)

    if (movieIndex === -1) {
      return next(new ValidationMovie('Movie not found')) // Use custom error
    }
    // Eliminar película
    movies.splice(movieIndex, 1)

    return res.status(200).json({ message: 'Movie deleted' })
  } catch (error) {
    next(new ConnectionError('Failed to delete movie')) // Use custom error
  }
})

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack)
  if (err instanceof ValidationMovie) {
    res.status(404).json({ message: err.message })
  } else if (err instanceof ConnectionError) {
    res.status(500).json({ message: err.message })
  } else {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`)
})
