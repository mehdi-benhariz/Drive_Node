const multer = require('multer')

const MIME_TYPES={
'image/jpg':'jpg',
'image/jpeg':'jpg',
'image/png':'png',
};

const storage = multer.diskStorage({
    destanation:(req,file,callback)=>{
         callback(null,'./images')
    },
   filename:(req,file,callback)=>{
    const name = file.originalname;
    const extension = MIME_TYPES[file.mimetype]
    callback(null, name)
   }
})

module.exports= multer({storage:storage}).single('image')