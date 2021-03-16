const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const movieController = require('../controllers/movies');

router.post('/', auth, movieController.createFavouriteMovie);

router.delete('/:movieId', auth, movieController.deleteFavouriteMovie);

router.post('/:movieId', auth, movieController.getFavouriteMovie);

router.post('/all/:userId', auth, movieController.getFavouriteMovies);

module.exports = router;