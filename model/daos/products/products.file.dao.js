const FileContainer = require("../../containers/file.container");

class ProductsFileDao extends FileContainer {
    constructor() {
        super("products.json");
    }
}

module.exports = ProductsFileDao;