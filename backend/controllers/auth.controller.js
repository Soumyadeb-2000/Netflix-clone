import { User } from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";
import Bcrypt from "bcryptjs";


export async function signup(req, res) {
    const { username, email, password } = req.body; 

    if(!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email"
        })
    }

    if(password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 digits"
        })
    }

    const existingEmail = await User.findOne({email});

    if(existingEmail) {
        return res.status(400).json({
            success: false,
            message: "Email already exists"
        })
    }

    const existingUsername = await User.findOne({email});

    if(existingUsername) {
        return res.status(400).json({
            success: false,
            message: "Username already exists"
        })
    }

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const salt = await Bcrypt.genSalt(10);
    const hash = await Bcrypt.hash(password, salt);

    const newUser = new User({
        username,
        email,
        password: hash,
        image
    })

    const savedUser =  await newUser.save();
    res.status(201).json({
        success: true,
        user: {
            ...savedUser._doc,
            password: ""
        }
    })

}
export function login(req, res) {
    res.status("login");
}
export function logout(req, res) {
    res.status("logout");
}