import express from 'express';
import asyncHandler from 'express-async-handler';
import Favourite from './favoriteModel';

const router = express.Router();

// Add a favourite movie for a user
router.post('/:username/favorites', asyncHandler(async (req, res) => {
    const { username } = req.params;
    const { movieId } = req.body;

    if (!username || !movieId) {
        return res.status(400).json({ success: false, msg: 'Username and MovieId are required.' });
    }

    const existingFavourite = await Favourite.findOne({ username, movieId });
    if (existingFavourite) {
        return res.status(401).json({ success: false, msg: 'It has already been in favourite list.' });
    }

    await Favourite.create({ username, movieId });
    res.status(201).json({ success: true, msg: 'Favourite successfully added.' });
}));

// Get all favourites for a user
router.get('/:username/favorites', asyncHandler(async (req, res) => {
    const { username } = req.params;

    if (!username) {
        return res.status(400).json({ success: false, msg: 'Username is required.' });
    }

    const favourites = await Favourite.find({ username });
    if (favourites.length === 0) {
        return res.status(404).json({ success: false, msg: 'No favourites found for this user.' });
    }

    res.status(200).json(favourites);
}));

// Delete a specific favourite movie
router.delete('/:username/favorites', asyncHandler(async (req, res) => {
    const { username } = req.params;
    const { movieId } = req.body;

    if (!username || !movieId) {
        return res.status(400).json({ success: false, msg: 'Username and MovieId are required.' });
    }

    const existingFavourite = await Favourite.findOne({ username, movieId });
    if (!existingFavourite) {
        return res.status(404).json({ success: false, msg: 'Favourite not found.' });
    }

    await Favourite.findOneAndDelete({ username, movieId });
    res.status(200).json({ success: true, msg: 'Favourite successfully deleted.' });
}));

export default router;
