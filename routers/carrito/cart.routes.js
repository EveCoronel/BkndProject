const express = require('express');
const router = express.Router();
const Cart = require('../../model/containers/file.container.carts')

const cart = new Cart()

router.get('/', (req, res) => {
    res.json({ msg: 'All good' });
})

router.get('/:id/products', (req, res) => {
    const { id } = req.params;
    res.json(cart.getProductsInCart(id));
})

router.post('/', (req, res) => {
    res.json(cart.createCart());
})

router.post('/:id/products/:id_prod', (req, res) => {
    const { id: idCart, id_prod: idProd } = req.params;
    res.json(cart.addProduct(idCart, idProd));
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json(cart.deleteById(id));
})

router.delete('/:id/products/:id_prod', (req, res) => {
    const { id: idCart, id_prod: idProd } = req.params;
    res.json(cart.deleteProductById(idCart, idProd));
})



module.exports = router;