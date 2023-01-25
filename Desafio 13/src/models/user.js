import mongoose from "mongoose";

const modelUser = mongoose.model('Users', {
    username: String,
    password: String,
    email: String,
});

export { modelUser };