import User from "../model/user.js";
import bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "please provide name , email and password..." });
        }
        let existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ success: false, message: "User already exist..." });
        }

        let hashPassword = await bcrypt.hash(password, 10);
        // console.log(hashPassword);

        let result = new User({ name, email, password: hashPassword });

        let data = await result.save();

        let token = Jwt.sign({ id: data._id }, process.env.JWT_KEY, { expiresIn: "7d" });

        // Cookie Setup
        res.cookie("token", token, {
            httpOnly: true,             // JS access blocked
            secure: process.env.NODE_ENV === "production", // HTTPS only in prod
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",         // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(200).json({ success: true, message: "signup successfully..." });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "something went wrong..." });
    }
}

// Option	Kya karta hai
// httpOnly	JS se cookie access block (XSS protection)
// secure	HTTPS pe hi cookie bhejta hai
// sameSite	CSRF attack se protection
// maxAge	Cookie expiry (ms me)

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "please provide email and password..." });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Email Id..." });
        }

        let isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid Password..." });
        }

        let token = Jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: "7d" });

        // Cookie Setup
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(200).json({ success: true, message: "login successfully..." });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "something went wrong..." });
    }
}


export const isAuthenticated = async (req, res) => {
    try {

        const id = req.user;
        // console.log("id: ",id);
        let user = await User.findOne({ _id: id }).select("name");
        // console.log("user: ",user);
        return res.status(200).json({ success: true, message: "user logged in...", user });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "something went wrong..." });
    }
}


export const logout = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
        });

        return res.status(200).json({ success: true, message: "user logout successfully" });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "something went wrong..." });
    }
}