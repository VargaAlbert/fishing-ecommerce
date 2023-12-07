// routes/auth.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Regisztráció
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, password, email, phone } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ email });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, email, phone, password: hashedPassword });
        await user.save();
        res.status(201).send('Regisztráció sikeres!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Hiba történt a regisztráció közben.');
    }
});

// Bejelentkezés
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send('Felhasználó nem található!');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send('Hibás jelszó!');
        }

        const userWithName = {
            ...user.toObject(),
            firstName: user.firstName,// Itt az adatbázisban tárolt telefonszám mező
            lastName: user.lastName // Itt az adatbázisban tárolt telefonszám mező
        };


        const token = jwt.sign({ userId: user._id }, 'titkoskulcs');

        res.status(200).json({ token, user: userWithName });

    } catch (error) {
        console.error(error);
        res.status(500).send('Hiba történt a bejelentkezés közben.');
    }
});

module.exports = router;

