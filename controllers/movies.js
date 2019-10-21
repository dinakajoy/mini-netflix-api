const Movie = require('../models/movie');

exports.createFavouriteMovie = (req, res, next) => {
    const movie = new Movie({
        movieId: req.body.movieId,
        userId: req.body.userId
    });
    movie.save().then(
    () => {
        res.status(201).json({
            message: 'Movie Added To Favourites Successfully!'
        });
    }).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    });
}

exports.getFavouriteMovies = (req, res, next) => {
  Movie.find({userId: req.params.userId}).then(
  (movie) => {
    res.status(200).json(movie)
  }).catch(
  (error) => {
      res.status(400).json({error: error});
  });
}

exports.deleteFavouriteMovie = (req, res, next) => {
    Movie.deleteOne({movieId: req.params.movieId, userId: req.params.userId}).then(
      (movie) => {
        res.status(200).json(movie);
      }).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
    });
}