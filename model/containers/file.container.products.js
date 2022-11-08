const fs = require('fs');
const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'))

class Products {

  constructor() {
    this.products = products
  }

  getAll() {
    return this.products
  }

  getById(id) {
    const product = this.products.find((product) => product.id === +(id));

    if (product) {
      return product
    } else {
      return { error: 'Product not found' }
    }

  }

  save(newProductParam) {
    // Desctructuras los datos enviados por el usuario
    const { title, price, thumbnail, stock } = newProductParam;
    //Verifica que todos los datos esten completos 
    if (title != null && price != null && thumbnail != null && stock != null) {
      // Genera el id y codigo para el nuevo producto
      let id = 1
      let code = 1
      if (this.products.length != 0) {
        id = this.products[this.products.length - 1].id + 1
        code = this.products[this.products.length - 1].code + 1
      }
      // Genera el nuevo producto
      const newProduct = {
        id: id,
        timestamp: Date.now(),
        title,
        code,
        price,
        thumbnail,
        stock
      };
      // Agrega el nuevo producto al listado de productos
      this.products.push(newProduct);
      fs.writeFileSync('./data/products.json', JSON.stringify(this.products, null, 2));
      return {
        message: "Created",
        product: newProduct,
      }
    } else {
      return {
        message: "Bad Request",
        error: "Incorrect format"
      }
    }

  }

  updateById(id, product) {

    const { title, price, thumbnail, stock } = product;
    let productsUpdate = {}

    if (title == null && price == null && thumbnail == null && stock == null) {
      return {
        message: "Bad Request",
        error: "Incorrect format"
      }
    }
    if (title != null) {
      productsUpdate = this.products.map((p) => p.id === id ? p = {
        ...p,
        title,
      } : p);
    }
    if (price != null) {
      productsUpdate = this.products.map((p) => p.id === id ? p = {
        ...p,
        price,
      } : p);
    }
    if (thumbnail != null) {
      productsUpdate = this.products.map((p) => p.id === id ? p = {
        ...p,
        thumbnail,
      } : p);
    }
    if (stock != null) {
      productsUpdate = this.products.map((p) => p.id === id ? p = {
        ...p,
        stock,
      } : p);
    }
    this.products = productsUpdate
    fs.writeFileSync('./data/products.json', JSON.stringify(this.products, null, 2));
    return { message: 'Updated successfully' }
  }

  deleteById(id) {
    let newProducts = this.products.filter(item => item.id != +(id))
    this.products = newProducts
    fs.writeFileSync('./data/products.json', JSON.stringify(this.products, null, 2));
    return { message: 'Deleted successfully' }
  }
}

module.exports = Products