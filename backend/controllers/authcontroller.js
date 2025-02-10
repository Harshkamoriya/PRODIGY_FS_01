import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";




const registerUser = async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    
    try {
        console.log("Inside the try block");

        // 🔹 Log the existing user check
        const existingUser = await User.findOne({ email });
        console.log("Existing User:", existingUser);

        if (existingUser) {
            return res.status(400).json({ error: "Email already registered. Please log in." });
        }

        // 🔹 Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });

        await user.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.log("Registration unsuccessful");
        console.error(error.message, "Internal server error");
        res.status(500).json({ error: "Registration failed" });
    }
};


const loginUser = async (req , res)=>{
        const {email ,password} = req.body;
    
        try {
            const user = await User.findOne({email});
            if(!user) return res.status(404).json({error : 'User not found'});
    
            const isMatch = await bcrypt.compare(password , user.password);
            if(!isMatch) return res.status(401).json({error :' invalid credentials'});
    
             const token = jwt.sign({id:user._id , role: user.role},process.env.JWT_SECRET, {expiresIn :'1h'});
             res.status(200).json({token});
        } catch (error) {
            res.status(500).json({ error: 'Login failed' });
    
        }
    };

export {registerUser, loginUser};
