const express = require('express');
const cartsController = require('../../controllers/carts.controller');
const router = express.Router();


router.get('/', cartsController.getCarts)

router.get('/:id/products', cartsController.getProductsInCart)

router.post('/', cartsController.saveCart)

router.post('/:id/products/:id_prod',)

router.delete('/:id', cartsController.deleteCart)

router.delete('/:id/products/:id_prod',)



module.exports = router;