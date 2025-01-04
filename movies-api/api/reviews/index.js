import express from 'express';
import asyncHandler from 'express-async-handler';
import Review from './reviewModel';
import { getMovieReviews } from '../tmdb-api';

const router = express.Router();

router.get('/:movieId', asyncHandler(async (req, res) => {
    const { movieId } = req.params;
    console.log("Fetching reviews for movieId:", movieId);
    try {
        const reviews = await Review.find({ movieId });

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: `No reviews found for movie ID: ${movieId}` });
        }
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error.message);
        res.status(500).json({ message: error.message });
    }
}));

router.post('/', asyncHandler(async (req, res) => {
    const { movieId, author, content } = req.body;

    if (!movieId || !author || !content) {
        return res.status(400).json({ message: 'movieId, author, and content are required.' });
    }

    const review = new Review({ movieId, author, content });
    await review.save();
    res.status(201).json(review);
}));

router.get('/', asyncHandler(async (req, res) => {
    const { movieId } = req.query;

    if (!movieId) {
        return res.status(400).json({ message: 'movieId is required.' });
    }

    const reviews = await Review.find({ movieId });
    if (!reviews || reviews.length === 0) {
        return res.status(404).json({ message: `No reviews found for movie ID: ${movieId}` });
    }

    res.status(200).json(reviews);
}));

router.put('/:reviewId', asyncHandler(async (req, res) => {
    const { reviewId } = req.params;
    const { newContent } = req.body;

    if (!newContent) {
        return res.status(400).json({ message: 'newContent is required.' });
    }

    const updatedReview = await Review.findByIdAndUpdate(
        reviewId,
        { content: newContent },
        { new: true } 
    );

    if (!updatedReview) {
        return res.status(404).json({ message: 'Review not found for the specified ID.' });
    }

    res.status(200).json(updatedReview);
}));

router.delete('/', asyncHandler(async (req, res) => {
    const { movieId, author } = req.query;

    if (!movieId) {
        return res.status(400).json({ message: 'movieId is required.' });
    }

    let deletedReview;
    if (author) {
        deletedReview = await Review.findOneAndDelete({ movieId, author });
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found for the specified author and movie.' });
        }
    } else {
        deletedReview = await Review.deleteMany({ movieId });
        if (deletedReview.deletedCount === 0) {
            return res.status(404).json({ message: 'No reviews found for this movie.' });
        }
    }

    res.status(204).send();
}));

export default router;
