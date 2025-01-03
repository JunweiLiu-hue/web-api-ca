import express from 'express';
import asyncHandler from 'express-async-handler';
import Favorite from './favoriteModel';

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
    const { userId, movieId, title, poster_path, overview, release_date, vote_average, vote_count } = req.body;
    const existingFavorite = await Favorite.findOne({ userId, movieId });
    if (existingFavorite) {
        return res.status(400).json({ message: 'This movie is already in favorites.' });
    }
    const favorite = new Favorite({ userId, movieId, title, poster_path, overview, release_date, vote_average, vote_count });
    await favorite.save();
    res.status(201).json(favorite);
}));

router.get('/', asyncHandler(async (req, res) => {
    const { userId } = req.query;
    const favorites = await Favorite.find({ userId });
    res.status(200).json(favorites);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedFavorite = await Favorite.findByIdAndDelete(id);
    if (!deletedFavorite) {
        return res.status(404).json({ message: 'Favorite not found.' });
    }
    res.status(204).send();
}));

export default router;
