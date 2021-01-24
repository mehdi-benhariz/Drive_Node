const multer = require('multer')

const MIME_TYPES={
'image/jpg':'jpg',
'image/jpeg':'jpg',
'image/png':'png',
};

const storage = multer.diskStorage({
     destination: function(req, file, cb) {
          cb(null, 'images/');
      },
   filename:(req,file,callback)=>{
    const name = file.originalname;
    const extension = MIME_TYPES[file.mimetype]
    callback(null, name)
   }
})

module.exports= multer({storage:storage}).single('image')