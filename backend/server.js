const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const dbConfig = require('./dbConfig');
const productsRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 5000;

// Engedélyezd a CORS-t az összes klienstől érkező kérésre
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Ez lehetővé teszi az összes eredetről érkező kérést (*)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Engedélyezett műveletek
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

//app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(dbConfig.mongoURI).then(() => {
    console.log('Sikeresen csatlakozva az adatbázishoz.');
}).catch((err) => {
    console.error('Hiba történt az adatbázishoz való csatlakozás közben:', err);
});

app.use('/auth', authRoutes);
app.use('/products', productsRoutes);

app.listen(PORT, () => {
    console.log(`A szerver fut a ${PORT}-es porton.`);
});

