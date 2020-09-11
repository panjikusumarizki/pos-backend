const db = require('../configs/db')
const fs = require('fs')
const { error } = require('console')

const product = {
    getAll: (nama, sortBy, sortType, limit, offset) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT product.id, category.category_name, product.name, product.price, product.date_added, product.picture, (SELECT COUNT(*) FROM product) as count FROM product INNER JOIN category ON product.id_category = category.id WHERE product.name LIKE '%${nama}%' ORDER BY ${sortBy} ${sortType} LIMIT ${offset}, ${limit}`, (err, result) => {
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
            db.query(`SELECT product.id, category.category_name, product.name, product.price, product.date_added, product.picture FROM product INNER JOIN category ON product.id_category = category.id WHERE product.id = '${id}'`, (err, result) => {
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
            db.query(`INSERT INTO product (id_category, name, price, picture) VALUES ('${data.id_category}','${data.name}','${data.price}','${data.picture}')`, (err, result) => {
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
            if (!data.picture) {
                db.query(`SELECT * FROM product WHERE id = '${id}'`, (err, resultGet) => {
                    if (err) {
                        reject(new Error(err))
                    } else {
                        resolve(new Promise((resolve, reject) => {
                            data.picture = resultGet[0].picture
                            db.query(`UPDATE product SET ? WHERE id = ?`, [data, id], (err, res) => {
                                if (err) {
                                    reject(new Error(err))
                                } else {
                                    resolve(res)
                                }
                            })
                        }))
                    }
                })
            } else {
                db.query(`SELECT * FROM product WHERE id = '${id}'`, (err, resultGet) => {
                    if (err) {
                        reject(new Error(err))
                    } else {
                        resolve(new Promise((resolve, reject) => {
                            fs.unlink(`src/uploads/${resultGet[0].picture}`, (err) => {
                                if (err) {
                                    throw err
                                } else {
                                    console.log('update image success')
                                }
                            })
                            db.query(`UPDATE product SET ? WHERE id = ?`, [data, id],(err, resultUpd) => {
                                if (err) {
                                    reject(new Error(err))
                                } else {
                                    resolve(resultUpd)
                                }
                            })
                        }))
                    }
                })
            }
        })
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM product WHERE id = '${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(new Promise((resolve, reject) => {
                        db.query(`DELETE FROM product WHERE id = '${id}'`, (err, resultDel) => {
                            const imagename = result[0].picture
                            fs.unlink(`src/uploads/${imagename}`, (err) => {
                                if (err) {
                                    throw err
                                } else {
                                    console.log('delete image success')
                                }
                            })
                            if (err) {
                                reject(new Error(err))
                            } else {
                                resolve(resultDel)
                            }
                        })
                    }))
                }
            })
        })
    }
}

module.exports = product