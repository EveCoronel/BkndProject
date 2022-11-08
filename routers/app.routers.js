const express = require('express');
const router = express.Router();
const porductsRoutes = require('./productos/products.routes')
const cartRoutes = require('./carrito/cart.routes')

router.use('/products', porductsRoutes)
router.use('/cart', cartRoutes)


module.exports = router;