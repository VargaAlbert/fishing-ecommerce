const router = require('express').Router();
const ShopCard = require('../models/ShopCard');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

/* router.post('/', async (req, res) => {
    try {
        const { token, cartItems } = req.body;
        console.log("token kettö: 2222222222:", token)

        // Felhasználó azonosítója
        const userId = await getUserIdFromToken(token); // Itt be kell helyettesítened a tokenből való azonosító kinyerését


        const shopCardItems = cartItems.map(item => ({
            userId: userId,
            productId: item.id, // Itt feltételezzük, hogy az item.id stringként érkezik
            quantity: item.quantity
        }));

        // Mentsük el a több rekordot egyszerre
        await ShopCard.insertMany(shopCardItems);

        res.status(200).send('A kosár frissítése sikeres volt.');
    } catch (error) {
        console.error('Hiba történt a kosár frissítése során:', error);
        res.status(500).send('Hiba történt a kosár frissítése során.');
    }
}); */

router.post('/', async (req, res) => {
    try {
        const { token, cartItems } = req.body;

        // Felhasználó azonosítója
        const userId = await getUserIdFromToken(token); // Tokenből azonosító kinyerése

        // Megkeressük a felhasználóhoz tartozó kosarat
        let shopCard = await ShopCard.findOne({ userId });
        console.log(shopCard)

        // Ha nincs kosár a felhasználóhoz, létrehozzuk
        if (!shopCard) {
            shopCard = new ShopCard({
                userId: userId,
                items: [],
            });
        }

        console.log(shopCard)
        // Hozzáadjuk az új elemeket a kosárhoz
        const newItems = cartItems.map(item => ({
            productId: item.id,
            quantity: item.quantity
        }));

        shopCard.items.push(...newItems);
        // Kosár mentése az adatbázisba
        await shopCard.save();

        res.status(200).send('A kosár frissítése sikeres volt.');
    } catch (error) {
        console.error('Hiba történt a kosár frissítése során:', error);
        res.status(500).send('Hiba történt a kosár frissítése során.');
    }
});


async function getUserIdFromToken(token) {
    try {
        const decoded = jwt.verify(token, 'titkoskulcs');
        console.log("ez a dekodolt", decoded);
        // A `decoded` objektumban az eredeti adatok lesznek elérhetőek
        const userId = decoded.userId

        // Itt például lekérdezheted az adatbázisból a felhasználót
        const user = await User.findOne({ _id: userId });

        if (!user) {
            throw new Error('A felhasználó nem található');
        }

        return user._id;
    } catch (error) {
        console.error('Hiba történt a token visszafejtésekor:', error);
        throw error;
    }
}


module.exports = router;
