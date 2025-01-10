import mongoose from 'mongoose';

const completedProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    completedAt: { type: Date, default: Date.now },
});

const CompletedProfile =
    mongoose.models.CompletedProfile ||
    mongoose.model('CompletedProfile', completedProfileSchema);

export default CompletedProfile;
