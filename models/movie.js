const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  movieId: { type: String, required: true },
  userId: { type: String, required: true }
});

module.exports = mongoose.model('Movie', movieSchema);
