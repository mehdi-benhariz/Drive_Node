const multer = require('multer');
const {uploadFile} =require('../index')

exports.createFile=(req,res,next)=>{
    try {
        res.send(req.file);
      }catch(err) {
        res.send(400);
      }
    // console.log('sd')
    // console.log(JSON.parse(req.body))
    // next()
    
    // req.body.thing = JSON.parse(req.body.thing);
    // const url = req.protocol + '://' + req.get('host');

    // const imageUrl= url + '/images/' + req.file.filename;
    // const{ title,type} = req.body;
    // uploadFile(imageUrl,title,type)
    // .then(()=>console.log('success'))
    // .catch(
    //   (error) => {
    //     res.status(400).json({
    //       error: error
    //     });
    //   }
    // );
}