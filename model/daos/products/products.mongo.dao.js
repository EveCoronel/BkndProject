const mongoContainer = require('../../containers/mongo.container')

class DaoProductsMongo extends mongoContainer {
    constructor() {
        super('products')
    }
}

module.exports = DaoProductsMongo;