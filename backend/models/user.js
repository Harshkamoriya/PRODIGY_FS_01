import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    profilePhoto: { type: String },
    resetToken: { type: String },  // Token for password reset
    resetTokenExpiry: { type: Date } // Expiry time for the token
});

const User = mongoose.model("User", userSchema);
export default User;
