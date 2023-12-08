const express = require('express');
const router = express.Router();
const data = require("../../src/data/data");

router.get('/', (req, res) => {
    res.json(data);
});

module.exports = router;