const FileContainer = require("../../containers/file.container");
const { HTTP_STATUS } = require('../../../constants/api.constants');
const { HttpError } = require('../../../utils/api.utils');
const fs = require('fs');

class CartsFileDao extends FileContainer {
    constructor() {
        super("carts.json");
    }

    createCart() {
        let documents = this.getAll();
        let newCart = {
            timestrap: Date.now(),
            products: []
        }
        documents.push(newCart)
        fs.writeFileSync(`./data/${this.fileName}`, JSON.stringify(documents))
    }

    getProductsInCart(id) {
        let documents = this.getAll();
        let documentById = documents.find((documents) => documents.id == id);
        if (!documentById) {
            const message = `Resource with id ${id} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        return documentById.products
    }

    addProduct(id, idProducto) {
        let documents = this.getAll();
        let documentById = documents.find((documents) => documents.id == id);
        if (!documentById) {
            const message = `Resource with id ${id} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        let productsInCart = documentById.products
        productsInCart.push(idProducto)
        let updatedCarts = documents.map((doc) => doc.id == id ? doc = {
            ...doc,
            products: productsInCart
        } : doc);
        fs.writeFileSync(`./data/${this.fileName}`, JSON.stringify(updatedCarts))
        return productsInCart
    }

    deleteProductById(idCart, idProd) {
        let documents = this.getAll();
        let documentById = documents.find((documents) => documents.id == idCart);
        if (!documentById) {
            const message = `Resource with id ${idCart} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        if (!documentById.products.find((product) => product == idProd)) {
            const message = `Resource with id ${idProd} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        let productsInCart = documentById.products.filter((product) => product != idProd)
        let updatedCarts = documents.map((doc) => doc.id == idCart ? doc = {
            ...doc,
            products: productsInCart
        } : doc);
        fs.writeFileSync(`./data/${this.fileName}`, JSON.stringify(updatedCarts))
        return productsInCart
    }

}

module.exports = CartsFileDao;