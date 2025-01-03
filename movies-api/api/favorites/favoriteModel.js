import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  poster_path: { type: String },
  overview: { type: String },
  release_date: { type: String },
  vote_average: { type: Number },
  vote_count: { type: Number },
}, { timestamps: true });

export default mongoose.model('Favorite', FavoriteSchema);
