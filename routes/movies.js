const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const movieController = require('../controllers/movies');

router.post('/', auth, movieController.createFavouriteMovie);

router.delete('/:movieId/:userId', auth, movieController.deleteFavouriteMovie);

router.get('/:userId', auth, movieController.getFavouriteMovies);

module.exports = router;