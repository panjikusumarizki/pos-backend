const db = require('../configs/db')

const categories = {
    getAll: (nama, sortBy, sortType, limit, offset) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT category.id, category.category_name, product.name, product.price, product.picture FROM category INNER JOIN product ON product.id_category = category.id WHERE category.category_name LIKE '%${nama}%' ORDER BY ${sortBy} ${sortType} LIMIT ${offset}, ${limit}`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    getDetail: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT category.id, category.category_name, product.name, product.price, product.picture FROM category INNER JOIN product ON product.id_category = category.id WHERE category.id = '${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    insert: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO category (category_name) VALUES ('${data.category_name}')`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    update: (data, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE category SET category_name = '${data.category_name}' WHERE id = '${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM category WHERE id = '${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = categories