import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const WatchlistSchema = new Schema({
  username: { type: String, required: true },
  movieId: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('Watchlist', WatchlistSchema);
