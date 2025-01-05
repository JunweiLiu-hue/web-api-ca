import express from 'express';
import asyncHandler from 'express-async-handler';
import Watchlist from './watchlistModel'; 

const router = express.Router();

router.post('/:username/watchlist', asyncHandler(async (req, res) => {
    const { username } = req.params;
    const { movieId } = req.body;
  
    if (!username || !movieId) {
      return res.status(400).json({ success: false, msg: 'Username and MovieId are required.' });
    }
  
    const existingWatchlist = await Watchlist.findOne({ username, movieId });
    if (existingWatchlist) {
      return res.status(401).json({ success: false, msg: 'Already in watchlist.' });
    }
  
    await Watchlist.create({ username, movieId });
    res.status(201).json({ success: true, msg: 'Added to watchlist.' });
  }));  

router.get('/:username/watchlist', asyncHandler(async (req, res) => {
    const { username } = req.params;

    if (!username) {
        return res.status(400).json({ success: false, msg: 'Username is required.' });
    }

    const watchlist = await Watchlist.find({ username });
    if (watchlist.length === 0) {
        return res.status(404).json({ success: false, msg: 'No movies found in the watchlist for this user.' });
    }

    res.status(200).json(watchlist);
}));

router.delete('/:username/watchlist', asyncHandler(async (req, res) => {
    const { username } = req.params;
    const { movieId } = req.body;

    if (!username || !movieId) {
        return res.status(400).json({ success: false, msg: 'Username and MovieId are required.' });
    }

    const existingWatchlist = await Watchlist.findOne({ username, movieId });
    if (!existingWatchlist) {
        return res.status(404).json({ success: false, msg: 'Movie not found in the watchlist.' });
    }

    await Watchlist.findOneAndDelete({ username, movieId });
    res.status(200).json({ success: true, msg: 'Movie successfully removed from the watchlist.' });
}));

export default router;
