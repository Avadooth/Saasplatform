const express = require('express');
const { getShopifyOrders } = require('../controllers/shopifyController');
const router = express.Router();

router.get('/orders', getShopifyOrders);

module.exports = router;
