const envConfig = require('../../config')

let ProductsDao;
let CartsDao;

switch (envConfig.DATASOURCE) {
    case 'mongo':
        ProductsDao = require('./products/products.mongo.dao')
        CartsDao = require('./carts/carts.mongo.dao')
        break;
    case 'firebase':
        ProductsDao = require('./products/products.firebase.dao')
        CartsDao = require('./carts/carts.firebase.dao')
        break;
    default:
        throw new Error("Invalid Datasource")
}

module.exports = {
    CartsDao,
    ProductsDao
}