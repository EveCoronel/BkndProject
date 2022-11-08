const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/products.controller')
let administrator = true;
router.get('/', productsController.getProducts)

router.get('/:id', productsController.getProductById)

router.post('/', productsController.saveProduct)

router.put('/:id', (req, res) => {
    if (administrator) {
        let { id } = req.params;
        id = Number(id)
        let productsUpdate = products.updateById(id, req.body)
        if (productsUpdate.error) {
            res.status(400).json(productsUpdate)
        } else {
            res.status(200).json(productsUpdate)
        }
    } else {
        res.json({ error: -1, description: `route: ${req.originalUrl} method: ${req.route.stack[0].method}, not authorized` });
    }
})

router.delete('/:id', (req, res) => {
    if (administrator) {
        const { id } = req.params;
        const product = products.getById(id)
        if (product.error) {
            res.status(404).json(product)
        } else {
            res.status(200).json(products.deleteById(id))
        }
    } else {
        res.json({ error: -1, description: `route: ${req.originalUrl} method: ${req.route.stack[0].method}, not authorized` });
    }

})


module.exports = router;