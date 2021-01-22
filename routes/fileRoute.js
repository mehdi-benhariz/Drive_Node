const router = require('express').Router();
const multer = require('../middleware/multer-config')
const fileRoute =require('../controllers/fileController')


router.post('/',multer,fileRoute.createFile)

module.exports= router