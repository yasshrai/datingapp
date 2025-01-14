import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    liker: { type: String, required: true },
    likerEmail: { type: String, required: true },
    likedEmail: { type: String, required: true },
}, {
    timestamps: true
});

likeSchema.index({ liker: 1, liked: 1 }, { unique: true });
likeSchema.index({ likerEmail: 1, likedEmail: 1 }, { unique: true });
export const Like = mongoose.models.Like || mongoose.model('Like', likeSchema);