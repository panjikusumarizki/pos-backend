const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}.png`)
    }
})

const upload = multer({
    storage,
    limits: {fileSize: 1048576},
    fileFilter (req, file, cb) {
        if (file.originalname.match(/\.(jpg|jpeg)\b/)) {
            cb(null, true)
        } else {
            cb('Image type must be jpg or jpeg', null)
        }
    }
})

module.exports = upload