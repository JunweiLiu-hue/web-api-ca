import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('Favorite', FavoriteSchema);
