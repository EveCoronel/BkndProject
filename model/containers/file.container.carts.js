const fs = require('fs');
const Products = require('./file.container.products')

const carts = JSON.parse(fs.readFileSync('./data/carts.json', 'utf-8'))

/* console.log(carts) */
/* const carts = [] */
const products = new Products()

class Cart {

    constructor() {
        this.carts = carts
    }

    createCart() {

        let id = 1
        if (this.carts.length != 0) {
            id = this.carts[this.carts.length - 1].id + 1
        }
        
        let productos = []

        let newCart = {
            id, timestamp: Date.now(), productos
        }

        this.carts.push(newCart)
        fs.writeFileSync('./data/carts.json', JSON.stringify(this.carts, null, 2));
        return { id: newCart.id }
    }

    deleteById(id) {

        if (this.carts.find(e => (e.id == id)) != undefined) {
            let newCarts = this.carts.filter(e => (e.id != id))
            this.carts = newCarts
            fs.writeFileSync('./data/carts.json', JSON.stringify(this.carts, null, 2));
            return { message: 'Cart was deleted sucessfully' }
        } else {
            return { message: 'Cart was not found' }
        }
    }

    getProductsInCart(id) {

        let cartSelected = this.carts.find(e => (e.id == id))
        if (cartSelected != undefined) {
            return cartSelected.productos
        } else {
            return { message: 'Cart was not found' }
        }

    }

    addProduct(id, Idproducto) {
        // Trae los productos y encuentra el producto a agregar
        let productos = products.getAll()
        let productToAdd = productos.find(e => (e.id == Idproducto))
        //Trae el carrito al cual debe agregar los productos
        let cartSelected = this.carts.find(e => (e.id == id))
        //Valida que el carrito solicitado exista
        if (cartSelected != undefined) {
            //Valida que el producto solicitado exista
            if (productToAdd != undefined) {
                // Si el producto solicitado existe, trae a una variable los productos del carrito solicitado
                let cartProducts = cartSelected.productos
                // Agrega el producto
                cartProducts.push(productToAdd)
                // Busca el carrito y lo actualiza, agregando el producto requerido
                let cartsUpdate = this.carts.map((cart) => cart.id == id ? cart = {
                    id: cartSelected.id,
                    timestamp: cartSelected.timestamp,
                    productos: cartProducts
                } : cart);
                // Guarda el carrito actualizado
                fs.writeFileSync('./data/carts.json', JSON.stringify(cartsUpdate, null, 2));
                return cartSelected.productos
            } else {
                return { message: 'Product was not found' }
            }
        } else {
            return { message: 'Cart was not found' }
        }
    }

    deleteProductById(idCart, idProd) {
        //Trae el carrito del cual debe eliminar el producto
        let cartSelected = this.carts.find(e => (e.id == idCart))
        // Trae los productos y encuentra el producto a eliminar
        let productos = products.getAll()
        let productToDelete = productos.find(e => (e.id == idProd))
        //Valida que el carrito solicitado exista
        if (cartSelected != undefined) {
            //Valida que el producto solicitado exista
            if (productToDelete != undefined) {
                //Si el producto existe, valida que el producto a eliminar se encuentre dentro del carrito
                if (cartSelected.productos.find(elem => elem.id == productToDelete.id) != undefined) {
                    // Si el producto a eliminar se encuentra dentro el carrito, lo busca y crea un nuevo array sin el producto
                    let updateCart = cartSelected.productos.filter(e => (e.id != productToDelete.id))
                    // Busca el carrito y lo actualiza al nuevo array sin el producto a eliminar
                    let cartsUpdate = this.carts.map((cart) => cart.id == idCart ? cart = {
                        id: cartSelected.id,
                        timestamp: cartSelected.timestamp,
                        productos: updateCart
                    } : cart);
                    // Guarda el carrito actualizado
                    fs.writeFileSync('./data/carts.json', JSON.stringify(cartsUpdate, null, 2));
                    return { message: 'Product was deleted sucessfully' }
                } else {
                    return { message: 'Product was not found in the cart' }
                }
            } else {
                return { message: 'Product was not found' }
            }
        } else {
            return { message: 'Cart was not found' }
        }
    }

}

module.exports = Cart