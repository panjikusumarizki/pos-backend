const response = {
    success: (res, data, message) => {
        const result = {
            message,
            success: true,
            code: 200,
            data
        }
        res.json(result)
    },
    failed: (res, data, message) => {
        const result = {
            message,
            success: false,
            code: 500,
            data
        }
        res.json(result)
    },
    successWithMeta: (res, data, meta, message) => {
        const result = {
            message,
            success: true,
            code: 201,
            meta,
            data
        }
        res.json(result)
    },
    tokenResult: (res, data, message) => {
        const result = {
            message: message,
            success: true,
            code: 200,
            data: data
        }
        res.json(result)
    },
    tokenErrorResult: (res, data, message) => {
        const result = {
            message,
            success: false,
            code: 500,
            data: data
        }
        res.json(result)
    }
}

module.exports = response