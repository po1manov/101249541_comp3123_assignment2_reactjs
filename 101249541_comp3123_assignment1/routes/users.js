const routes = require('express').Router();
const userModel = require('../models/user');

// Error handler
const handleError = (res, error, message = "Internal Server Error") => {
    console.error(message, error);
    res.status(500).json({ status: false, message, error: error?.message });
};

// User Signup
routes.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await userModel.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ status: false, message: 'Username or email already registered' });
        }
        await new userModel({ username, email, password }).save();
        res.status(201).json({ status: true, message: 'User registered successfully' });
    } catch (error) {
        handleError(res, error, "Signup error:");
    }
});

// User Login
routes.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ status: false, message: 'Invalid username or password' });
        }

        res.status(200).json({ status: true, message: 'User logged in successfully' });
    } catch (error) {
        handleError(res, error);
    }
});

module.exports = routes;