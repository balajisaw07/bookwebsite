import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import Book from "../model/book.model.js";
import mongoose from "mongoose";
export const signup = async(req, res) => {
    try {
        const { fullname, email, password ,role} = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword,
            role:role
        });
        await createdUser.save();
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
                role:createdUser.role
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        } else {
            res.status(200).json({
                message: "Login successful",
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    role:user.role,
                },
            });
        }
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const addWish = async (req, res) => {
    try {
        const userId = req.params.id;
        const bookId = req.body.bookId;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ message: 'Invalid bookId format' });
        }

        // Check if the book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Update the user's wish list
        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { wish: bookId } },
            { new: true, useFindAndModify: false }
        ).populate('wish');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
}

export const getWish = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId);
        const user = await User.findById(userId).populate('wish');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.wish);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

export const deleteWish = async (req, res) => {
    try {
        const userId = req.params.id;
        const bookId = req.body.bookId;
        // console.log(bookId);
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { wish: bookId } },
            { new: true, useFindAndModify: false }
        ).populate('wish');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.wish);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};