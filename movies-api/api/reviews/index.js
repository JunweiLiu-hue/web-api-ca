import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovieReviews } from '../tmdb-api';

const router = express.Router();

router.get('/tmdb/movies/:id/reviews', asyncHandler(async (req, res) => {
    const movieId = req.params.id;

    try {
        const reviews = await getMovieReviews(movieId);
        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: `No reviews found for movie ID: ${movieId}` });
        }
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));

export default router;
