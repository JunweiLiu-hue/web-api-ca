import express from 'express';
import asyncHandler from 'express-async-handler';
import { getActorCredits, getActorDetails } from '../tmdb-api';

const router = express.Router();

router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const actorDetails = await getActorDetails(id);
        res.status(200).json(actorDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));

router.get('/:id/credits', asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const actorCredits = await getActorCredits(id);
        res.status(200).json(actorCredits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));

export default router;
