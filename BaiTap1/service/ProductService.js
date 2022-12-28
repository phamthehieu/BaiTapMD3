const Connection = require('../model/connection')
Connection.connecting1()
class ProductService {
   static getProducts() {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM product`,(err, products) => {
                if (err) {
                   reject(err);
                } else {
                    resolve(products);
                }
            })
        })
    }
    static saveProduct(product) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO product(name, price, description) VALUE ('${product.name}', ${product.price}, '${product.description}')`,(err, products) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            })
        })
    }
    static findById(id) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM product WHERE id = ${id}`,(err, products) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            })
        })
    }
    static editProduct(product, id) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE product SET name = '${product.name}', price = ${product.price}, description = '${product.description}' where id = ${id}`,(err, products) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(`Edit Success!!`);
                    resolve(products);
                }
            })
        })
    }
    static deleteProduct(id) {
        let connection = Connection.getConnection();
        let sql = `DELETE FROM product WHERE id = ${id}`
        return new Promise((resolve, reject) => {
            connection.query(sql,(err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('Xóa Thành Công !!!')
                }
            })
        })
    }
    static searchProduct(search) {
        let connection = Connection.getConnection();
        let sql = `SELECT * FROM product  WHERE name LIKE '%${search}%'`
        return new Promise((resolve, reject) => {
            connection.query(sql,(err, products) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            })
        })
    }
}
module.exports = ProductService;