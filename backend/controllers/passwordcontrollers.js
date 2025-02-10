import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

// Configure Nodemailer (Use your email service credentials)
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password
    },
});

// 🟢 1️⃣ Forgot Password - Generate and Send Reset Token
const forgotPassword = async (req, res) => {
    console.log(req.body);
    const { email } = req.body;

    try {
        console.log("In the try function of forgot password");
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Generate Reset Token
         const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000; // 1-hour expiry

        await user.save();

        // Create Reset URL
        const resetURL = `http://localhost:5000/auth/reset-password?token=${resetToken}`;
        const frontendURL = 'http://localhost:5173/resetpage'

        // Send Email z xcvb nm,.
        const mailOptions = {
            from: 'harshkamoriya@gmail.com',
            to: user.email,
            subject: "Password Reset Request",
            html:` <p>You requested a password reset</p>
                   <p>Click <a href="${frontendURL} target="_self"">here</a> to reset your password.</p>`,
        };
        console.log(user.email , "user.email");
         console.log(mailOptions, "mailoptions");
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Password reset email sent!",resetURL });

    } catch (error) {
        console.log("Error occurred in forgot password");
        console.error("Forgot Password Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// 🟢 2️⃣ Reset Password - Verify Token and Update Password
const resetPassword = async (req, res) => {
    try {
        console.log("in the reset function")
        console.log(req.query);
        console.log(req.body);
        // Extract token from query params
        const { token } = req.query; 
        const { newPassword } = req.body;

        if (!token) {
            return res.status(400).json({ error: "Token is required" });
        }

        if (!newPassword) {
            return res.status(400).json({ error: "New password is required" });
        }

        // Find user with matching token and check expiry
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }, // Ensure token is not expired
        });

        if (!user) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        // Clear reset token fields
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();
        console.log("user password reset succefully")

        res.status(200).json({ message: "Password has been reset successfully" });

    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

  


export { forgotPassword, resetPassword };