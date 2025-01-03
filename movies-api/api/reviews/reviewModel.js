import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    movieId: { type: Number, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
