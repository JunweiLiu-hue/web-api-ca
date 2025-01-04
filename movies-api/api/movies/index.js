import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getUpcomingMovies,
    getGenresMovies,
    getPopularMovies,
    getNowPlayingMovies,
    getMovieDetails
  } from '../tmdb-api';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

router.get('/language/:lang', asyncHandler(async (req, res) => {
    const language = req.params.lang; 
    if (!language) {
        return res.status(400).json({ message: 'Language code is required' });
    }

    const movies = await movieModel.find({
        original_language: language
    });

    if (!movies.length) {
        return res.status(404).json({ message: `No movies found for language: ${language}` });
    }

    res.status(200).json(movies);
}));

router.get('/year/:year', asyncHandler(async (req, res) => {
    const year = parseInt(req.params.year); 
    if (!year || isNaN(year)) {
        return res.status(400).json({ message: 'Year is required and must be a valid number' });
    }

    const startOfYear = `${year}-01-01`;
    const endOfYear = `${year}-12-31`;

    const movies = await movieModel.find({
        release_date: { $gte: startOfYear, $lte: endOfYear }
    });

    if (!movies.length) {
        return res.status(404).json({ message: `No movies found for the year: ${year}` });
    }

    res.status(200).json(movies);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genresMovies = await getGenresMovies();
    res.status(200).json(genresMovies);
}));

router.get('/tmdb/popular', asyncHandler(async (req, res) => {
    const popularMovies = await getPopularMovies();
    res.status(200).json(popularMovies);
}));

router.get('/tmdb/nowplaying', asyncHandler(async (req, res) => {
    try {
        const nowPlayingMovies = await getNowPlayingMovies();
        res.status(200).json(nowPlayingMovies);
    } catch (error) {
        console.error('Error fetching now playing movies:', error.message);
        res.status(500).json({ message: error.message });
    }
}));

router.get('/details/:id', asyncHandler(async (req, res) => {
    const movieId = parseInt(req.params.id, 10); 
    if (isNaN(movieId)) {
      return res.status(400).json({ message: 'Invalid movie ID' });
    }
  
    try {
      const movieDetails = await getMovieDetails(movieId); 
      res.status(200).json(movieDetails);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }));
  

export default router;