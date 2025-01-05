import express from 'express';
import bcrypt from 'bcrypt';
import User from './userModel';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const router = express.Router();

const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
};

router.post('/register', asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, msg: 'Username and password are required.' });
    }

    if (!validatePassword(password)) {
        return res.status(400).json({
            success: false,
            msg: 'Password must be at least 8 characters long, include one letter, one number, and one special character.',
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ success: true, msg: 'User successfully registered.' });
}));

router.post('/login', asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, msg: 'Username and password are required.' });
    }

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ success: false, msg: 'Wrong password.' });
    }

    const token = jwt.sign({ username: user.username }, process.env.SECRET, { expiresIn: '1h' });

    res.status(200).json({ success: true, username: user.username, token });
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const { password } = req.body;

    if (!password || !validatePassword(password)) {
        return res.status(400).json({
            success: false,
            msg: 'Password must be at least 8 characters long, include one letter, one number, and one special character.',
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.updateOne({ _id: req.params.id }, { password: hashedPassword });

    if (result.matchedCount === 0) {
        return res.status(404).json({ success: false, msg: 'User not found.' });
    }

    res.status(200).json({ success: true, msg: 'Password updated successfully.' });
}));

export default router;
