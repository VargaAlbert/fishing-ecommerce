import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.mjs';
import dbConfig from './dbConfig.mjs';
import productsRoutes from './routes/products.mjs';
import updateCartRouter from './routes/updateCart.mjs';

const app = express();
const PORT = process.env.PORT || 5000;

//Engedélyezd a CORS-t az összes klienstől érkező kérésre
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(dbConfig.mongoURIsharpSystem).then(() => {
    console.log('Sikeresen csatlakozva az adatbázishoz.');
}).catch((err) => {
    console.error('Hiba történt az adatbázishoz való csatlakozás közben:', err);
});

app.use('/auth', authRoutes);
app.use('/products', productsRoutes);
app.use('/update-cart', updateCartRouter);

app.listen(PORT, () => {
    console.log(`A szerver fut a ${PORT}-es porton.`);
});

