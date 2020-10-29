const response = {
    success: (res, data, message) => {
        const result = {
            message,
            success: true,
            status: 200,
            data
        }
        res.json(result)
    },
    failed: (res, data, message) => {
        const result = {
            message,
            success: false,
            status: 500,
            data
        }
        res.json(result)
    },
    successWithMeta: (res, data, meta, message) => {
        const result = {
            message,
            success: true,
            status: 201,
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
            status: 501,
            data: data
        }
        res.status(500).json(result)
    },
    tokenExpiredResult: (res, data, message) => {
        const result = {
            message: message,
            success: false,
            status: 405,
            data: data
        }
        res.status(405).json(result)
    }
}

module.exports = response