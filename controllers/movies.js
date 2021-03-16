const Movie = require('../models/movie');

exports.createFavouriteMovie = (req, res) => {
  const movie = new Movie({
    movieId: req.body.movieId,
    userId: req.body.userId
  });
  movie.save().then(() => {
    res.status(201).json({
      message: 'Movie Added To Favourites Successfully!'
    });
  }).catch((error) => {
    res.status(400).json({
      error: error
    });
  });
}

exports.getFavouriteMovies = (req, res) => {
  Movie.find({userId: req.body.userId}).then((movie) => {
    res.status(200).json(movie)
  }).catch((error) => {
    res.status(400).json({error: error});
  });
}

exports.getFavouriteMovie = (req, res) => {
  Movie.findOne({userId: req.body.userId, movieId: req.body.movieId}).then((movie) => {
    res.status(200).json(movie)
  }).catch((error) => {
    res.status(400).json({error: error});
  });
}

exports.deleteFavouriteMovie = (req, res) => {
  Movie.deleteOne({movieId: req.body.movieId, userId: req.body.userId}).then((movie) => {
    res.status(200).json(movie);
  }).catch((error) => {
    res.status(400).json({
      error: error
    });
  });
}