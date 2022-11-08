const mongoContainer = require('../../containers/mongo.container')

class DaoCartsMongo extends mongoContainer {
    constructor() {
        super('carts')
    }

}

module.exports = DaoCartsMongo;