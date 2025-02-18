import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    liker: { type: String, required: true },
    likerEmail: { type: String, required: true },
    likedEmail: { type: String, required: true },
}, {
    timestamps: true
});

export const Like = mongoose.models.Like || mongoose.model('Like', likeSchema);