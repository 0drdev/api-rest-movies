const { ValidationMovie, ConnectionError } = require('./errors')

export const validateMovie = ({
  title,
  year,
  director,
  duration,
  poster,
  genre,
  rate
} = {}) => {
  if (!title) throw new ValidationMovie('title is required')
  if (!year) throw new ValidationMovie('year is required')
  if (!director) throw new ValidationMovie('director is required')
  if (!duration) throw new ValidationMovie('duration is required')
  if (!poster) throw new ValidationMovie('poster is required')
  if (!genre) throw new ValidationMovie('genre is required')
  if (!rate) throw new ValidationMovie('rate is required')

  // Calling the database to save the user
  try {
    // Replace with actual database connection code
    // mongodb.connect();
  } catch (e) {
    throw new ConnectionError('database is not available')
  }
}
