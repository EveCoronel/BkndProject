const { HTTP_STATUS } = require('../../../constants/api.constants');
const { HttpError } = require('../../../utils/api.utils');
const FirebaseContainer = require('../../containers/firebase.container')

class DaoCartsFirebase extends FirebaseContainer {

    constructor() {
        super('carts')
    }

    async getProductsInCart(id) {
        const docRef = this.query.doc(id);
        const document = await docRef.get();
        let cart = document.data();
        if (!cart) {
            const message = `Resource with id ${id} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        return cart.products
    }

    async addProduct(id, Idproducto) {
        const docRef = this.query.doc(id);
        if (!docRef) {
            const message = `Resource with id ${id} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        const document = await docRef.get();
        const cart = document.data();
        cart.products.push(Idproducto)
        return await docRef.set({ cart: cart });
    }

    async deleteProductById(idCart, idProd) {
        const docRef = this.query.doc(idCart);
        if (!docRef) {
            const message = `Resource with id ${id} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        const document = await docRef.get();
        const cart = document.data();
        const index = cart.products.findIndex((item) => item == idProd)
        if (!index) {
            const message = `Product with id ${idProd} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        cart.products.splice(index, 1)
        return await docRef.set({ cart: cart });
    }
}

module.exports = DaoCartsFirebase;