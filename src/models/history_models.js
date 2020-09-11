const db = require('../configs/db')

const history = {
    getAll: (invoices, sortBy, sortType, limit, offset) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM history WHERE invoices LIKE '%${invoices}%' ORDER BY ${sortBy} ${sortType} LIMIT ${offset}, ${limit}`, (err, result) => {
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
            db.query(`SELECT * FROM history WHERE id = '${id}'`, (err, result) => {
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
            db.query(`INSERT INTO history (invoices, cashier, orders, amount) VALUES ('${data.invoices}','${data.cashier}','${data.orders}','${data.amount}')`, (err, result) => {
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
            db.query(`UPDATE history SET ? WHERE id = ?`, [data, id], (err, result) => {
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
            db.query(`DELETE FROM history WHERE id = '${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = history