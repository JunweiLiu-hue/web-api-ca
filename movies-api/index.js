import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import moviesRouter from './api/movies'; 
import reviewsRouter from './api/reviews'; 
import favoritesRouter from './api/favorites'; 
import actorRouter from './api/actors';
import usersRouter from './api/users';
import authenticate from './authenticate';
import watchlistRouter from './api/watchlist';
import './db'; 
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use('/api/movies', moviesRouter);
app.use('/api/actors', actorRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/favorites', authenticate, favoritesRouter);
app.use('/api/watchlist', authenticate, watchlistRouter);
app.use('/api/users', usersRouter);
app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    status: err.status || 500,
  });
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
