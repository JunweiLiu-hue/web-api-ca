import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  userId: { type: String, required: true },
  movieId: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('Favorite', FavoriteSchema);
