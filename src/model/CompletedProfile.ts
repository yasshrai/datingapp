import mongoose from 'mongoose';

const completedProfileSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    }
},
    { timestamps: true });

const CompletedProfile =
    mongoose.models.CompletedProfile ||
    mongoose.model('CompletedProfile', completedProfileSchema);

export default CompletedProfile;
