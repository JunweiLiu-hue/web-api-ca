import express from 'express';
import asyncHandler from 'express-async-handler';
import Favorite from './favoriteModel';

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
    const { userId, movieId } = req.body;
  
    if (!userId || !movieId || isNaN(movieId)) {
      return res.status(400).json({ message: 'Invalid userId or movieId' });
    }
  
    const existingFavorite = await Favorite.findOne({ userId, movieId });
    if (existingFavorite) {
      return res.status(400).json({ message: 'This movie is already in favorites.' });
    }
  
    const favorite = new Favorite({ userId, movieId });
    await favorite.save();
    res.status(201).json(favorite);
  }));
  
  
  router.get('/', asyncHandler(async (req, res) => {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: 'userId is required.' });
    }
    const favorites = await Favorite.find({ userId });
    res.status(200).json(favorites);
  }));
  
  router.delete('/', asyncHandler(async (req, res) => {
    const { userId, movieId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: 'userId is required.' });
    }
    let result;
    if (movieId) {
      result = await Favorite.findOneAndDelete({ userId, movieId });
      if (!result) {
        return res.status(404).json({ message: 'Favorite not found.' });
      }
    } else {
      result = await Favorite.deleteMany({ userId });
    }
    res.status(204).send();
  }));
  

export default router;
