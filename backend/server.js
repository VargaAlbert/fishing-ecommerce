// app.js vagy server.js

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Engedélyezd a CORS-t az összes klienstől érkező kérésre
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Ez lehetővé teszi az összes eredetről érkező kérést (*)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Engedélyezett műveletek
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(express.json());

mongoose.connect('mongodb+srv://albi:Ais6A45SJpDP3n5r@fishing-ecommerce.n8amumh.mongodb.net/?retryWrites=true&w=majority', {
}).then(() => {
    console.log('Sikeresen csatlakozva az adatbázishoz.');
}).catch((err) => {
    console.error('Hiba történt az adatbázishoz való csatlakozás közben:', err);
});

app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`A szerver fut a ${PORT}-es porton.`);
});
